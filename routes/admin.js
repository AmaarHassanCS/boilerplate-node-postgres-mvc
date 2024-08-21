var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminCtrl')

/* GET users listing. */
router.get('/', adminController.getAll);
router.get('/me', adminController.me);
router.get('/:id', adminController.get);
router.post('/', adminController.insert);
router.put('/:id', adminController.update);

module.exports = router;