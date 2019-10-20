import AddedContactModel from '../models/AddedContactModel';
const AddedContactController = {};


AddedContactController.list = function (request, response, next) {
  AddedContactModel.find().exec()
    .then(contacts => {
      return response.json(contacts);
    })
    .catch(err => {
      return next(err);
    });
};

AddedContactController.show = function (request, response, next) {
  AddedContactModel.findById(request.params._id).exec()
    .then(contact => {
      return response.json(contact);
    })
    .catch(err => {
      return next(err);
    });
};

AddedContactController.create = function (request, response, next) {

  const contact = new AddedContactModel({
    name: request.body.name,
    occupation: request.body.occupation,
    avatar: request.body.avatar,
  });

  contact.save()
    .then(newContact => {
      return response.json(newContact);
    })
    .catch(err => {
      return next(err);
    });

};

AddedContactController.update = function (request, response, next) {
  AddedContactModel.findById(request.params._id)
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
};

AddedContactController.remove = function (request, response, next) {
  AddedContactModel.findByIdAndRemove(request.params._id).exec()
    .then(contact => {
      return response.json(contact);
    })
    .catch(err => {
      return next(err);
    });
};

export default AddedContactController;
