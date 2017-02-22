import ContactModel from '../models/ContactModel';
const contactsController = {};


// Declare a (GET = list) route
contactsController.list = ( (request, response, next) => {
  ContactModel.find().exec()
    .then(contacts => {
      return response.json(contacts);
    })
    .catch(err => {
      return next(err);
    });
});

// Declare a (GET/:id = show) route.  Gets contact by id
contactsController.show = ( (request, response, next) => {
  ContactModel.findById(request.params._id).exec()
  .then(contact => {
    return response.json(contact);
  })
  .catch(err => {
    return next(err);
  });
});


// Declare a (POST = create) route.  Creates a new contact
contactsController.create = ( (request, response, next) => {
  // Creates a new instance of the 'ContactModel'
  // We are grabbing attributes from the request.body object.
  // This is set because we are using body-parser.
  // Constructor function creates a new ContactModel
  const contact = new ContactModel({
    name: request.body.name,
    occupation: request.body.occupation,
    avatar: request.body.avatar,
  });

  // Saves the new contact
  contact.save()
    // When the save completes, return the newly created contact
    .then(newContact => {
      return response.json(newContact);
    })
    .catch(err => {
      return next(err);
    });
});


// Declare a (PUT = update) route.  Updates (or changes) a contact
contactsController.update = ( (request, response, next) => {
  ContactModel.findById(request.params._id)
    .then(contact => {
      // Set the attributes on the model from the request.body OR
      // if we receive nothing, use what the contact is already set to.
      // This way if we send an update for just the 'avatar' field,
      // the name and the occupation will not change.
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


// Declare a (DELETE = remove) route
// This query finds the contact by ._id and deletes the contact
contactsController.remove = ( (request, response, next) => {
  ContactModel.findByIdAndRemove(request.params._id).exec()
    .then(contact => {
      return response.json(contact);
    })
    .catch(err => {
      return next(err);
    });
});


module.exports = contactsController;
