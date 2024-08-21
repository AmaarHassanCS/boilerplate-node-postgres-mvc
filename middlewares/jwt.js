const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_TOKEN_SECRET;
const SECRET_REFRESH_TOKEN = process.env.JWT_UPDATE_TOKEN_SECRET;

const jwtMiddleware = (req, res, next) => {
  const token = getToken(req);
  if (token) {
    try {
      const response = jwt.verify(token, SECRET);
      req.user = response.user;
    } catch (err) {
      res.status(403).json({ error: 'Invalid token' });
      return;
    }
  } else {
    res.status(403).json({ error: 'Invalid token' });
    return;
  }
  next();
};

const createTokens = user => {
  const { id, email, isAdmin } = user;
  const token = jwt.sign(
    {
      user: { id, email, isAdmin }
    },
    SECRET,
    {
      expiresIn: '72h'
    }
  );
  const refreshToken = jwt.sign(
    {
      user: user.id
    },
    SECRET_REFRESH_TOKEN,
    {
      expiresIn: '7d'
    }
  );
  return { token, refreshToken };
};

function getToken(req) {
  const header = req.get('Authorization');
  if (!header) {
    return null;
  }
  const parts = header.split(' ');
  if (parts.length !== 2) {
    return null;
  }
  const scheme = parts[0];
  const token = parts[1];
  if (/^Bearer$/i.test(scheme)) {
    return token;
  }
  return null;
}

module.exports = {
  jwtMiddleware,
  createTokens
};
