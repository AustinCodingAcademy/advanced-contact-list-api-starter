// Require the express module (package.json)
import express from 'express';
// Can also use const mongoose = require('mongoose');
import mongoose from 'mongoose';
import bodyParser from 'body-parser';


// Create a new instance of express
const app = express();


// Connect to the mongo database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/contact-list');


// Middleware that parses incoming request bodies, and makes the payload
// available to use through request.body
app.use(bodyParser.json());

const ContactModel = require('./models/ContactModel');

// Declare a GET /contacts route
app.get('/contacts', (request, response) => {
  ContactModel.find().exec()
    .then(contacts => {
      return response.json(contacts);
    })
    .catch(err => {
      return console.log(`Error ${err}`);
    });
});

app.get('/contacts/:_id', (request, response) => {
  ContactModel.findById(request.params._id).exec()
    .then(contact => {
      return response.json(contact);
    })
    .catch(err => {
      return console.log(`Error ${err}`);
    });
});


// Declare a DELETE /contacts route
// This query fins the contact by ._id and deletes the contact
app.delete('/contacts/:_id', (request, response) => {
  ContactModel.findByIdAndRemove(request.params._id).exec()
    .then(contact => {
      return response.json(contact);
    })
    .catch(err => {
      return console.log(`Error ${err}`);
    });
});


// Declare a POST /contacts route.  Creates a new contact
app.post('/contacts', (request, response) => {
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
    .then(contact => {
      return response.json(contact);
    })
    .catch(err => {
      return console.log(`Error ${err}`);
    });
});


// Declare the route
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
