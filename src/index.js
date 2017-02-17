// Your server code here...
import express from 'express';
// import mongoose from 'mongoose';
import ContactModel from './models/ContactModel';

const bodyParser = require('body-parser');

const app = express();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/contact-list');

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.get('/contacts', (request, response) => {
  ContactModel.find({}).exec()
    .then(data => {
      return response.json(data);
    })
    .catch(error => {
      console.log('Something went wrong with contacts' + error);
    });
});

app.get('/contacts/:_id', function (request, response) {
  ContactModel.findById(request.params._id).exec()
    .then(data => {
      return response.json(data);
    })
    .catch(err => {
      return console.log(`Error ${err}`);
    });
});

app.delete('/contacts/:_id', function (request, response) {
  ContactModel.findByIdAndRemove(request.params._id).exec()
  .then(data => {
    return response.json(data);
  })
  .catch(err => {
    return console.log(`Error ${err}`);
  });
});

app.post('/contacts', function (request, response) {
  const contact = new ContactModel({
    name: request.body.name,
    occupation: request.body.occupation,
    avatar: request.body.avatar,
  });

  // Save the new contact
  contact.save()
    // When the save completes, return the newly created contact
    .then(data => {
      return response.json(data);
    })
    .catch(err => {
      return console.log(`Error ${err}`);
    });
});

app.put('/contacts/:_id', function (request, response) {
  ContactModel.findById(request.params._id).exec()
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
      return console.log(`Error ${err}`);
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
    return console.log('Error!', err);
  }

  return console.log('Listening on: http://localhost:' + PORT);
});
