const express = require('express'),
    router = express.Router(),
    account = require('../controllers/accountController');

// get account by id
router.get('/:user_id', account.find);
// update account
router.put('/:user_id', account.update);
// delete account
router.delete('/:user_id', account.delete);

module.exports = router;