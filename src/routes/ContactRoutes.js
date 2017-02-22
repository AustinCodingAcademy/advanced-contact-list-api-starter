const express = require('express');
const router = express.Router();
const ContactsController = require('../controllers/ContactsController');

router.get('/contacts', ContactsController.list);

router.get('/contacts/:_id', ContactsController.show);

router.post('/contacts', ContactsController.create);

router.put('/contacts/:_id', ContactsController.update);

router.delete('/contacts/:_id', ContactsController.remove);

module.exports = router;
