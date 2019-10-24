import express from 'express';
import ContactsController from '../controllers/ContactsController';

const router = express.Router();

// Declare route for GET /contacts
router.get('/contacts', ContactsController.list);

// Declare route for GET /contacts by _id
router.get('/contacts/:_id', ContactsController.show);

// Declare route for DELETE /contacts by _id
router.delete('/contacts/:_id', ContactsController.remove);

// Declare router for POST, includes a save function to mongodb
router.post('/contacts', ContactsController.create);

// Declare router for PUT request to /contacts by _id
router.put('/contacts/:_id', ContactsController.update);

module.exports = router;
