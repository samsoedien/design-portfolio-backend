const express = require('express');
const passport = require('passport');

const router = express.Router();

const userController = require('../controllers/users');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res, next) => res.json({ message: 'Users Works' }));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', userController.registerUser);

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', usersController.loginUser);

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), usersController.getCurrentUser);



module.exports = router;
