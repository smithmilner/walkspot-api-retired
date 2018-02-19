const express = require('express'),
    router = express.Router(),
    parks = require('../controllers/parkController');

router.get('/near-me', parks.near_me);
router.get('/:park_id', parks.find);

module.exports = router;