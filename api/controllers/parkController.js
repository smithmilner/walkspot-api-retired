var Park = require('../../models/park');

exports.near_me = function(req, res) {
    let limit = parseInt(req.query.limit) || 30;
    let maxDistance = parseInt(req.query.maxDistance) || 8;

    // get coordinates [ <longitude> , <latitude> ]
    var coords = [];
    coords[0] = req.query.lon || -79.41552;
    coords[1] = req.query.lat || 43.641604;

    Park.find({
        geometry: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: coords,
                },
                $maxDistance: maxDistance * 1000
            }
        }
    })
    .limit(limit)
    .exec((err, parks) => {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }

        return res.json({ success: true, parks: parks })
    });
};

exports.list = function(req, res) {
    let bounds = JSON.parse(req.query.bounds);

    Park.find({
      geometry: {
        $geoWithin: {
          $geometry: bounds
        }
      }
    })
    .limit(500)
    .exec((err, parks) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      return res.json({ success: true, parks: parks });
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
