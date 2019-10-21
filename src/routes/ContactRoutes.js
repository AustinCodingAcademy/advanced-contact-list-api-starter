import express from 'express';
const router = express.Router();
import ContactsController from '../controllers/ContactsController';


// Declare GET /contacts route
router.get('/contacts', ContactsController.list);

router.get('/contacts/:_id', ContactsController.show);


// Declare a POST /contacts route.  Creates a new contact
router.post('/contacts', ContactsController.create);


// Declare a PUT /contacts route.  Updates (or changes) a contact
router.put('/contacts/:_id', ContactsController.update);


// Declare a DELETE /contacts route
router.delete('/contacts/:_id', ContactsController.remove);


module.exports = router;
