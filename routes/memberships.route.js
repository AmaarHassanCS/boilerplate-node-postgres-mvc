var express = require('express');
var router = express.Router();
const membershipsController = require('../controllers/memberships.controller')

/* GET users listing. */
router.get('/', membershipsController.getAll);
router.get('/:id', membershipsController.get);
router.post('/', membershipsController.insert);
router.put('/:id', membershipsController.update);

module.exports = router;