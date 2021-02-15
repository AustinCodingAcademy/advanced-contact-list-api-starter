import express from 'express';
import ContactsController from '../controllers/ContactsController';

const router = express.Router();


router.get('/contacts', ContactsController.list);

router.get('/contacts/:_id', ContactsController.show);

router.post('/contacts', ContactsController.create);

router.put('/contacts/:_id', ContactsController.update);

router.delete('/contacts/:_id', ContactsController.remove);

export default router;
