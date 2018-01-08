const express = require('express'),
    router = express.Router(),
    auth = require('../../auth'),
    account = require('../controllers/accountController');

// get account by id
// router.get('/:user_id', auth.authenticate(), account.find);
// update account
router.put('/:user_id', auth.authenticate(), account.update);
// delete account
router.delete('/:user_id', auth.authenticate(), account.delete);

module.exports = router;
