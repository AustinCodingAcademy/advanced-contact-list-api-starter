import ContactModel from '../src/models/ContactModel';

const contactsController = {};

contactsController.list = function(request, response, next) {
  ContactModel.find().exec()
  .then(contacts => {
    return response.json(contacts);
  })
  .catch(err => {
    return next(err);
  });
};

contactsController.show = function(request, response, next) {
  ContactModel.findById(request.params._id).exec()
  .then(contact => {
    return response.json(contact);
  })
  .catch(err => {
    return next(err);
  });
};

contactsController.create = function(request, response, next) {
  // New instance of ContactModel, creating a new record for contacts collection
  // Grabbing attributes and establishing the payload
  const CONTACT = new ContactModel({
    name: request.body.name,
    occupation: request.body.occupation,
    avatar: request.body.avatar
  });

  // save the new contact
  CONTACT.save()
  // When save completes, return new contact
  .then(newContact => {
    return response.json(newContact);
  })
  .catch(err => {
    return next(err);
  });
};

contactsController.update = function(request, response, next) {
  ContactModel.findById(request.params._id)
  .then(contact => {
    // Attributes will be from request.body OR contact
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
};

contactsController.remove = function(request, response, next) {
  ContactModel.findByIdAndRemove(request.params._id).exec()
  .then(contact => {
    return response.json(contact);
  })
  .catch(err => {
    return next(err);
  });
};

export default contactsController;
