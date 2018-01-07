const express = require('express'),
    passport = require('passport'),
    router = express.Router(),
    user = require('../controllers/userController');

// current user
router.get('/', user.current);
// register
router.post('/register', user.register);
// login
router.post('/login', passport.authenticate('local'), user.login);
// logout
router.post('/logout', user.logout);

router.get('/ping', user.ping);

module.exports = router;