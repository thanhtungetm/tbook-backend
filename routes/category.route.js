var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/category.controller')


router.get('/', categoryController.get);
router.get('/:id', categoryController.getById);
// router.post('/', categoryController.create);
// router.put('/:id', categoryController.update);
// router.delete('/:id', categoryController.delete);


module.exports = router;
