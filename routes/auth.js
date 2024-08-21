var express = require('express');
var router = express.Router();
const authCtrl = require('../controllers/authCtrl');

router.post('/:user/signup', authCtrl.signUp);

router.post('/:user/login', authCtrl.login);

router.post('/changePassword', authCtrl.changeUserPassword);
// router.get('/me', jwtMiddleware, getMyProfile);

module.exports = router;