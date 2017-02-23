import {Router} from 'express';
// import ContactModel from '../models/ContactModel';
import ContactsController from '../controllers/ContactsController';

const router = Router();

router.get('/contacts', ContactsController.list);
  // ContactModel.find({}).exec()
  //   .then(data => {
  //     return response.json(data);
  //   })
  //   .catch(error => {
  //     return next(`Something went wrong with the contacts list: ${error}`);
  //   });

router.get('/contacts/:_id', ContactsController.show);
  // ContactModel.findById(request.params._id).exec()
  //   .then(contact => {
  //     return response.json(contact);
  //   })
  //   .catch(error => {
  //     return next(`Something went wrong with the contacts list: ${error}`);
  //   });

router.post('/contacts', ContactsController.create);

  // add validation code

  // const model = ContactModel({
  //   name: request.body.name,
  //   occupation: request.body.occupation,
  //   avatar: request.body.avatar
  // });
  //
  // model.save()
  //   .then(contact => {
  //     return response.json(contact);
  //   })
  //   .catch(error => {
  //     return next(`Something went wrong with the contacts list: ${error}`);
  //   });

router.put('/contacts/:_id', ContactsController.update);
  // ContactModel.findById(request.params._id)
  //   .then(contact => {
  //     contact.name = request.body.name || contact.name;
  //     contact.occupation = request.body.occupation || contact.occupation;
  //     contact.avatar = request.body.avatar || contact.avatar;
  //
  //     return contact.save();
  //   })
  //   .then(contact => {
  //     return response.json(contact);
  //   })
  //   .catch(error => {
  //     return next(`Something went wrong with the contacts list: ${error}`);
  //   });

router.delete('/contacts/:_id', ContactsController.remove);
  // ContactModel.findByIdAndRemove(request.params._id).exec()
  //   .then(contact => {
  //     return response.json(contact);
  //   })
  //   .catch(error => {
  //     return next(`Something went wrong with the contacts list: ${error}`);
  //   });
  
export default router;
