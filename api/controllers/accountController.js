var Account = require('../../models/account');

// get current user.
// @todo this route is disabled until we have a need for it.
exports.find = function(req, res) {
    Account.findById(req.params.user_id, function(err, account) {
        if (err) {
            return res.status(500).json({ success: false, message: err });
        }

        res.json({ user: account });
    });
};

// register new user.
exports.update = function(req, res) {
    if (req.user.id === req.params.user_id) {
        Account.findById(req.params.user_id, function(err, account) {
            if (err) {
                return res.status(500).json({ success: false, message: err });
            }

            account.username = req.body.username;
            account.password = req.body.password;

            account.save(function(err) {
                if (err) {
                    res.send(err);
                }

                res.json({ success: true, message: 'Account updated' });
            })
        });
    } else {
        res.status(401).json({ success: false, message: 'You cannot edit another account.' });
    }
};

// get user by id.
exports.delete = function(req, res) {
    if (req.user.id === req.params.user_id) {
        Account.remove({
            id: req.params.user_id
        }, function(err, account) {
            if (err) {
                res.send(err);
            }

            res.json({ success: true, message: 'Account ' + req.params.user_id + ' deleted' });
        });
    } else {
        res.status(401).json({ success: false, message: 'You cannot delete another account.' });
    }
};
