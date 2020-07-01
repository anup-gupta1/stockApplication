const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const passport = require('passport');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/', passport.authenticate('jwt', { session: false }), authController.getCurrentUser);

module.exports = router;
