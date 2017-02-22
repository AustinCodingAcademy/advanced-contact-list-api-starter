import express from 'express';
import ContactModel from '../models/ContactModel';

const router = express.Router();
router.get('/contacts', function (request, response, next) {
  ContactModel.find().exec()
    .then(contacts => {
      return response.json(contacts);
    })
    .catch(err => {
      return next(err);
    });
});

router.get('contacts/:_id', function (request, response, next) {
  ContactModel.findById(request.params._id).exec()
  .then(contact => {
    return response.json(contact);
  })
  .catch(err => {
    return next(err);
  });
});

router.delete('/contacts/:_id', function (request, response, next) {
  ContactModel.findByIdAndRemove(request.params._id).exec()
    .then(contact => {
      return response.json(contact);
    })
    .catch(err => {
      return next(err);
    });
});

router.post('/contacts', function (request, response) {
  const newContact = new ContactModel({
    name: request.body.name,
    occupation: request.body.occupation,
    avatar: request.body.avatar,
  });

  // Save the new contact
  newContact.save()
    // When the save completes, return the newly created contact
    .then(contact => {
      return response.json(contact);
    })
    .catch(err => {
      return console.log(`Error ${err}`);
    });
});

router.put('/contacts/:_id', function (request, response, next) {
  ContactModel.findById(request.params._id)
    .then(contact => {
      contact.name = request.body.name || contact.name;
      contact.occupation = request.body.occupation || contact.occupation;
      contact.avatar = request.body.avatar || contact.avatar;

      return contact.save();
    })
    .then(contact => {
      return response.json(contact);
    })
    .catch(err => {
      return next(err);
    });
});

module.exports = router;
