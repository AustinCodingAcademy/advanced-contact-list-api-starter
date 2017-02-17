// Import the express module
import express from 'express';
import bodyParser from 'body-parser';

// Create a new instance of express
const app = express();

// Connect to Mongo database
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/contact-list');

app.use(bodyParser.json());

import ContactModel from './models/ContactModel';

// Declare our GET / contacts route
app.get('/contacts', function (request, response) {
  ContactModel.find({}).exec()
  .then(contacts => {
    return response.json(contacts);
  })
  .catch(err => {
    return console.log(`Express GET error ${err}`);
  });
});

app.get('/contacts/:_id', function (request, response) {
  ContactModel.findById(request.params._id).exec()
  .then(contact => {
    return response.json(contact);
  })
  .catch(err => {
    return console.log(`Express GET by id error: ${err}`);
  });
});

app.delete('/contacts/:_id', function (request, response) {
  ContactModel.findByIdAndRemove(request.params._id).exec()
  .this(contact => {
    return response.json(contact);
  })
  .catch(err => {
    return console.log(`Express DELETE by id error: ${err}`);
  });
});

app.post('/contacts', function (request, response) {
  const CONTACT = new ContactModel({
    name: request.body.name,
    occupation: request.body.occupation,
    avatar: request.body.avatar
  });
  CONTACT.save()
  .then(newContact => {
    return response.json(newContact);
  })
  .catch(err => {
    return console.log(`Express POST error: ${err}`);
  });
});

app.put('/contacts/:_id', function (request, response) {
  ContactModel.findById(request.params._id).exec()
  .then(contact => {
    contact.name = request.body.name || contact.name;
    contact.occupation = request.body.occupation || contact.occupation;
    contact.avatar = request.body.occupation || contact.avatar;

    return contact.save();
  })
  .then(contact => {
    return response.json(contact);
  })
  .catch(err => {
    return console.log(`Express PUT by id error: ${err}`);
  });
});

// Declare our route
app.all('/*', (request, response) => {
  return response.send(request.params['0']);
});

// Set our port to server the application on
const PORT = 3001;

// Tell our instance of express to listen to request made on our port
app.listen(PORT, (err) => {
  if (err) {
    return console.log('Listen error! ', err);
  }

  return console.log('Listening on: http://localhost:' + PORT);
});
