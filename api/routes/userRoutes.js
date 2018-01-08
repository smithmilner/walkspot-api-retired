const express = require('express'),
    router = express.Router(),
    auth = require('../../auth'),
    user = require('../controllers/userController');

// current user
router.get('/', auth.authenticate(), user.current);
// register
router.post('/register', user.register);
// get auth token (login).
router.post('/token', user.token);

module.exports = router;