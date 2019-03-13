const express = require('express');

const contactController = require('../controllers/contact');

const router = express.Router();

router.get('/test', (req, res, next) => res.json({ message: 'Contact Works' }));

router.post('/', contactController.postEmail);

module.exports = router;
