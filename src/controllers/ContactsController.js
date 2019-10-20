import ContactModel from '../models/ContactModel';

const contactsController = {};

contactsController.list = (request, response, next) => {
  ContactModel.find({}).exec()
    .then(data => {
      return response.json(data);
    })
    .catch(error => {
      return next(`Something went wrong with the contacts list: ${error}`);
    });
};

contactsController.show = (request, response, next) => {
  ContactModel.findById(request.params._id).exec()
  .then(contact => {
    return response.json(contact);
  })
  .catch(error => {
    return next(`Something went wrong with the contacts list: ${error}`);
  });
};

contactsController.create = (request, response, next) => {

  // add validation code

  const model = ContactModel({
    name: request.body.name,
    occupation: request.body.occupation,
    avatar: request.body.avatar
  });

  model.save()
    .then(contact => {
      return response.json(contact);
    })
    .catch(error => {
      return next(`Something went wrong with the contacts list: ${error}`);
    });
};

contactsController.update = (request, response, next) => {
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
    .catch(error => {
      return next(`Something went wrong with the contacts list: ${error}`);
    });
};

contactsController.remove = (request, response, next) => {
  ContactModel.findByIdAndRemove(request.params._id).exec()
    .then(contact => {
      return response.json(contact);
    })
    .catch(error => {
      return next(`Something went wrong with the contacts list: ${error}`);
    });
};

export default contactsController;
