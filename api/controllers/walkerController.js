var Walker = require('../models/walker');

exports.list = function(req, res) {
    Walker.find(function(err, walkers) {
        if (err) {
            res.send(err);
        }

        res.json(walkers);
    });
};

exports.create = function(req, res) {
    var walker = new Walker();

    walker.name = req.body.name;

    walker.save((err) => {
        if (err) {
            res.send(err);
        }

        res.json({ message: 'Walker Created!' });
    });
};

exports.find = function(req, res) {
    Walker.findById(req.params.walker_id, function(err, walker) {
        if (err) {
            res.send(err);
        }

        res.json(walker);
    });
};

exports.update = function(req, res) {
    Walker.findById(req.params.walker_id, function(err, walker) {
        if (err) {
            res.send(err);
        }

        walker.name = req.body.name;

        walker.save(function(err) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Updated walker ' + req.params.walker_id });
        });
    });
};

exports.delete = function(req, res) {
    Walker.remove({
        id: req.params.walker_id
    }, function(err, walker) {
        if (err) {
            res.send(err);
        }

        res.json({ message: 'Deleted walker ' + req.params.walker_id });
    });
};
