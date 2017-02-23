import { Router } from 'express';
import ContactController from '../controllers/ContactController';

const router = Router();

// get all contacts
router.get('/contacts', ContactController.list);

// get one contact by id
router.get('/contacts/:_id', ContactController.show);

// delete a contact
router.delete('/contacts/:_id', ContactController.remove);

// add a contact
router.post('/contacts', ContactController.create);

// update a contact
router.put('/contacts/:_id', ContactController.update);

export default router;
