var Account = require('../models/account');

// get current user.
exports.find = function(req, res) {
    Account.findById(req.params.user_id, function(err, account) {
        if (err) {
            res.send(err);
        }

        res.json(account);
    });
};

// register new user.
exports.update = function(req, res) {
    Account.findById(req.params.user_id, function(err, account) {
        if (err) {
            res.send(err);
        }

        account.username = req.body.name;

        account.save(function(err) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Account updated' });
        })
    });
};

// get user by id.
exports.delete = function(req, res) {
    Account.remove({
        id: req.params.user_id
    }, function(err, account) {
        if (err) {
            res.send(err);
        }

        res.json({ message: 'Account ' + req.params.user_id + ' deleted' });
    });
};
