const express = require('express');
const router = express.Router();
const ContactsController = require('../models/ContactsController');

// declare the get contacts route --
router.get('/contacts', ContactsController.list);

router.get('/contacts:_id', ContactsController.show);

router.delete('/contacts:_id', ContactsController.remove);

router.post('./contact', ContactsController.create);

router.put('./contacts:_id', ContactsController.update);

module.exports = router;
