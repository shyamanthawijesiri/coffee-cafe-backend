const express = require('express');
const router = express.Router();

const menuController = require('../controllers/menuContorller');

router.route('/')
    .get(menuController.getAllItem)
    .post(menuController.addItem);

router.route('/:id')
    .get(menuController.getItem)
    .put(menuController.updateItem)
    .delete(menuController.deleteItem);


module.exports = router;