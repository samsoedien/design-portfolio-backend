const express = require('express');

const contactController = require('../controllers/contact');

const router = express.Router();

router.post('/', contactController.postEmail);

module.exports = router;
