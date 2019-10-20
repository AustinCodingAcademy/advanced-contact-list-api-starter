import express from 'express';
import ContactsController from '../controllers/ContactsController';

const router = express.Router();
router.get('/contacts', function (request, response, next) {
  ContactsController.list(request, response, next);
});

router.get('/contacts/:_id', function (request, response, next) {
  ContactsController.show(request, response, next);
});

router.delete('/contacts/:_id', function (request, response, next) {
  ContactsController.remove(request, response, next);
});

router.post('/contacts', function (request, response, next) {
  ContactsController.create(request, response, next);
});

router.put('/contacts/:_id', function (request, response, next) {
  ContactsController.update(request, response, next);
});

export default router;
