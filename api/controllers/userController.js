var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../../config/database');
var Account = require('../../models/account');

// get current user.
exports.current = function(req, res) {
    res.json({ user: req.user });
};

// register new user.
exports.register = function(req, res) {
    if (!req.body.username || !req.body.password) {
        return res.json({ success: false, message: 'Please pass username and password.' });
    } else {
        var newAccount = new Account({
            username: req.body.username,
            password: req.body.password
        });
        newAccount.save(function(err) {
            if (err) {
                return res.json({ success: false, message: 'This username is already taken.' });
            }

            return res.json({ success: true, message: 'Successfully created new account.' });
        });
    }
};

// request auth token.
exports.token = function(req, res) {
    if (req.body.username && req.body.password) {
        var username = req.body.username;
        var password = req.body.password;
        Account.findOne({ username: username }, function(err, user) {
            if (err) {
                return res.json({ success: false, message: err });
            }

            if (!user) {
                return res.json({ success: false, message: 'User not found.' });
            } else {
                // we found the user now check password.
                user.comparePassword(password, function(err, isMatch) {
                    if (isMatch && !err) {
                        var payload = { id: user.id };
                        var token = jwt.sign(payload, config.secret);
                        return res.json({ success: true, token: token });
                    } else {
                        return res.json({ success: false, message: 'Authenication failed. Incorrect password.' });
                    }
                });
            }
        }).select('+password');
    }
};

exports.ping = function(req, res) {
    res.json({ message: 'Pong!' });
}
