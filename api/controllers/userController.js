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
        return res.status(400).json({ success: false, message: 'Please pass username and password.' });
    } else {
        let newAccount = new Account({
            username: req.body.username,
            password: req.body.password
        });
        newAccount.save(function(err) {
            if (err) {
                return res.status(409).json({ success: false, message: 'This username is already taken.' });
            }

            return res.json({ success: true, message: 'Successfully created new account.' });
        });
    }
};

// request auth token.
exports.token = function(req, res) {
    if (req.body.username && req.body.password) {
        let username = req.body.username;
        let password = req.body.password;
        Account.findOne({ username: username }, function(err, user) {
            if (err) {
                return res.status(500).json({ success: false, message: err });
            }

            if (!user) {
                return res.status(400).json({ success: false, message: 'User not found.' });
            } else {
                // we found the user now check password.
                user.comparePassword(password, function(err, isMatch) {
                    if (isMatch && !err) {
                        let payload = { id: user.id };
                        let token = jwt.sign(payload, config.secret);

                        return res.json({
                            success: true,
                            user,
                            token: token
                        });
                    } else {
                        return res.status(400).json({ success: false, message: 'Authenication failed. Incorrect password.' });
                    }
                });
            }
        }).select('+password');
    }
};
