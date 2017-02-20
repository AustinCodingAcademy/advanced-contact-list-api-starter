import ContactModel from '../models/ContactModel';

const contactsController = {};

contactsController.list = (request, response, next) => {
  ContactModel.find().exec()
  .then(contacts => response.json(contacts))
  .catch(err => next(err));
};

contactsController.show = (request, response, next) => {
  ContactModel.findById(request.params._id).exec()
  .then(contact => response.json(contact))
  .catch(err => next(err));
};

contactsController.create = (request, response, next) => {
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
  .then(newContact => response.json(newContact))
  .catch(err => next(err));
};

contactsController.update = (request, response, next) => {
  ContactModel.findById(request.params._id).exec()
  .then(contact => {
    // Attributes will be from request.body OR contact
    contact.name = request.body.name || contact.name;
    contact.occupation = request.body.occupation || contact.occupation;
    contact.avatar = request.body.avatar || contact.avatar;

    return contact.save();
  })
  .then(contact => response.json(contact))
  .catch(err => next(err));
};

contactsController.remove = (request, response, next) => {
  ContactModel.findByIdAndRemove(request.params._id).exec()
  .then(contact => response.json(contact))
  .catch(err => next(err));
};

export default contactsController;
