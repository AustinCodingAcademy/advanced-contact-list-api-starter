import ContactModel from '../models/ContactModel';

const ContactController = {};

ContactController.list = (request, response, next) => {
  ContactModel.find({}).exec()
    .then(contacts => {
      return response.json(contacts);
    })
    .catch(err => {
      next('Error getting contact list: ' + err);
    });

};

ContactController.show = (request, response, next) => {
  ContactModel.findById(request.params._id).exec()
    .then(contact => {
      return response.json(contact);
    })
    .catch(err => {
      next('Error getting contact: ' + err);
    });
};

ContactController.create = (request, response, next) => {
  // Create a new instance of our 'ContactModel'
  // We are grabbing attributes from our request.body object, again
  // this is set for us because we are using bodyParser
  const newContact = new ContactModel({
    name: request.body.name,
    occupation: request.body.occupation,
    avatar: request.body.avatar
  });

  // save the new contact
  newContact.save()
    // When the save completes, return newly created contact
    .then(contact => {
      return response.json(contact);
    })
    .catch(err => {
      next('Error saving contact: ' + err);
    });
};

ContactController.update = (request, response, next) => {
  ContactModel.findById(request.params._id).exec()
    .then(contact => {
      // set the attributes on the model from the request.body OR
      // if we receive nothing, what the contact is already set to
      // this way if we send an update for just the 'avatar' field,
      // the name and occupation won't change
      contact.name = request.body.name || contact.name;
      contact.occupation = request.body.occupation || contact.occupation;
      contact.avatar = request.body.avatar || contact.avatar;

      return contact.save();
    })
    .then(contact => {
      return response.json(contact);
    })
    .catch(err => {
      next('Error updating contact: ' + err);
    });
};

ContactController.remove = (request, response, next) => {
  ContactModel.findByIdAndRemove(request.params._id).exec()
    .then(contact => {
      return response.json(contact);
    })
    .catch(err => {
      next('Error deleting contact: ' + err);
    });
};

export default ContactController;
