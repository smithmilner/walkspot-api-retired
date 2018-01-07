var passport = require('passport');
var Account = require('../models/account');

// get current user.
exports.current = function(req, res) {
    res.json({ user: req.user });
};

// register new user.
exports.register = function(req, res) {
    Account.register(new Account({ username: req.body.username}), req.body.password, function(err, account) {
        if (err) {
            res.send(err);
        }

        passport.authenticate('local')(req, res, function() {
            res.redirect('/user');
        });
    });
};

// login.
exports.login = function(req, res) {
    res.redirect('/user');
};

// logout.
exports.logout = function(req, res) {
    req.logout();
    res.redirect('/user');
};

exports.ping = function(req, res) {
    res.json({ message: 'Pong!' });
}
