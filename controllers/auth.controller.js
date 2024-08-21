const { models } = require('../models');
const { createTokens } = require('../middlewares/jwt');
const constants = require('../schema/schema');

const signUp = async (req, res, next) => {
  try {
    const User = models[req.params.user];
    const payload = req.body;
    const { error } = constants.SignUpRequestSchema.validate(payload, {
      abortEarly: false
    });
    if (error) {
      next(error);
      return;
    }
    const existingUser = await User.findAll({
      where: {
        email: payload.email
      }
    });

    if (existingUser && existingUser.length) {
      res.status(422).json({
        success: false,
        message: { email: 'User with this email already exists' }
      });
      return;
    }
    const userCreated = await User.create(payload);
    const tokens = createTokens({ id: userCreated.id, email: userCreated.email });

    res.status(200).json({
      tokens,
      user: {
        ...userCreated.serialize()
      }
    });
  } catch (error) {
    console.log(error);
    res.status(error.status || 400).send({
      success: false,
      message: error.message || 'Could not create the user',
    });
  }
}

const login = async (req, res, next) => {
  try {
    const User = models[req.params.user];
    const payload = req.body;
    const { error } = constants.LoginUpRequestSchema.validate(payload, {
      abortEarly: false
    });
    if (error) {
      next(error);
      return;
    }
    const { email, password } = payload;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res
        .status(422)
        .json({ success: false, message: 'Incorrect email or password' });
      return;
    }
    const isPasswordCorrect = await user.checkPassword(password);
    if (isPasswordCorrect) {
      const tokens = createTokens({ id: user.id, email: user.email, isAdmin: user.isAdmin });
      res.send({
        tokens,
        user: {
          ...user.serialize()
        }
      });
    } else {
      res
        .status(422)
        .json({ success: false, message: 'Incorrect email or password' });
    }
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).send({
      success: false,
      message: error.message || 'Could not login',
    });
  }

}

const changeUserPassword = async (req, res) => {
  const { code, password } = req.body;
  if (!code || !password || password.trim().length < 6) {
    res.status(422).json({ success: false, message: 'Incorrect params' });
    return;
  }
  const user = await User.findOne({
    where: {
      restorePasswordCode: code
    }
  });
  if (!user) {
    res
      .status(422)
      .json({ success: false, message: 'Incorrect restore password code' });
    return;
  }
  await user.setNewPassword(password);
  await user.update({
    restorePasswordCode: '',
    emailConfirmationCode: ''
  });
  const userHub = await models.Hub.findOne({
    where: {
      owner_id: user.id
    }
  });
  let currentPlan = null;
  if (userHub) {
    currentPlan = await userHub.getCurrentPlan();
  }
  const tokens = createTokens({ id: user.id, email: user.email });
  res.status(201).json({
    success: true,
    message: 'Password has been successfully changed',
    tokens,
    user: {
      ...user.serialize(),
      userHub: userHub ? userHub.dataValues : null,
      currentPlan
    }
  });
}

// async function getMyProfile(req, res) {
//   const { user } = req;
//   const currentUser = await User.find({
//     attributes: ['id', 'name', 'company', 'email', 'isAdmin'],
//     where: { id: user.id }
//   });
//   if (!currentUser) {
//     res.status(403).send();
//     return;
//   }
//   const userHub = await models.Hub.findOne({
//     where: {
//       owner_id: currentUser.id
//     }
//   });
//   res.json({
//     ...currentUser.dataValues,
//     userHub: userHub
//   });
// }

module.exports = {
  signUp,
  login,
  changeUserPassword
}