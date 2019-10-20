import express from 'express';
import AddedContactsController from '../controllers/AddedContactsController';

const router = express.Router();
router.get('/addedContacts', function (request, response, next) {
  AddedContactsController.list(request, response, next);
});

router.get('/addedContacts/:_id', function (request, response, next) {
  AddedContactsController.show(request, response, next);
});

router.delete('/addedContacts/:_id', function (request, response, next) {
  AddedContactsController.remove(request, response, next);
});

router.post('/addedContacts', function (request, response, next) {
  AddedContactsController.create(request, response, next);
});

router.put('/addedContacts/:_id', function (request, response, next) {
  AddedContactsController.update(request, response, next);
});

export default router;
