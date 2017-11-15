const express = require('express'),
    router = express.Router(),
    walkers = require('../controllers/walkerController');

router.get('/', walkers.list);
router.post('/', walkers.create);
router.get('/:walker_id', walkers.find);
router.put('/:walker_id', walkers.update);
router.delete('/:walker_id', walkers.delete);

module.exports = router;