var express = require('express');
var router = express.Router();
var bookController = require('../controllers/book.controller')


router.get('/', bookController.get);
router.get('/:id', bookController.getById);
router.post('/', bookController.create);
router.put('/:id', bookController.update);
router.delete('/:id', bookController.delete);


module.exports = router;
