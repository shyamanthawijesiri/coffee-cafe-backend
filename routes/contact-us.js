const express = require('express');
const router = express.Router();
const contactUsController = require('../controllers/contactFormController')


router.route('/').post(contactUsController);
    
module.exports = router;