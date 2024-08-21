module.exports = (req, res, next) => {
    if (req.originalUrl.includes('admin')) {
        if (!req.user.isAdmin) {
            res.status(403).json({ message: 'Forbidden' });
            return;
        }
    }
    next();
}