import {Router} from 'express';
import contactsController from '../controllers/ContactsController';

const router = Router();

router.get('/contacts', (request, response, next) => {
  contactsController.listContacts(request, response, next);
});

router.get('/contacts/:_id', (request, response, next) => {
  contactsController.showContactId(request, response, next);
});

router.delete('/contacts/:_id', (request, response, next) => {
  contactsController.removeContact(request, response, next);
});

router.post('/contacts', (request, response, next) => {
  contactsController.createContact(request, response, next);
});

router.put('/contacts/:_id', (request, response, next) => {
  contactsController.updateContact(request, response, next);
});

export default router;
