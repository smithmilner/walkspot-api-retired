exports.list = function(req, res) {
    res.json({ message: 'list of walkers' });
};

exports.create = function(req, res) {
    res.json({ message: 'created a new walker!' });
};

exports.find = function(req, res) {
    res.json({ message: 'found walker ' + req.params.walker_id + '!' });
};

exports.update = function(req, res) {
    res.json({ message: 'updated walker ' + req.params.walker_id + '!' });
};

exports.delete = function(req, res) {
    res.json({ message: 'deleted walker ' + req.params.walker_id + '!' });
};
