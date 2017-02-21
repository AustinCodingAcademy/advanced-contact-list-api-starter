// import the express module
import express from 'express';
import bodyParser from 'body-parser';

// create a new instance of express
const app = express();

// Connect to our mongo database
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/contact-list');

app.use(bodyParser.json());

import ContactModel from './models/ContactModel';

// declare our get /contacts route
app.get('/contacts', (request, response) => {
  ContactModel.find({})
  .exec()
  .then(contacts => {
    return response.json(contacts);
  })
  .catch(err => {
    return console.log(`Error ${err}`);
  });
});

app.get('/contacts/:_id', (request, response) => {
  ContactModel.findById(request.params._id)
  .exec()
  .then(contact => {
    return response.json(contact);
  })
  .catch(err => {
    return console.log(`Error ${err}`);
  });
});

// delete
app.delete('contacts/:_id', (request, response) => {
  ContactModel.findByIdAndRemove(request.params._id)
  .exec()
  .then(contact => {
    return response.json(contact);
  })
  .catch(err => {
    return console.log(`Error ${err}`);
  });
});

// create
app.post('/contacts', (request, response) => {
// Create a new instance of our `ContactModel`
// We are grabbing attributes from our request.body object, again this is set
// for us because we are using body-parser
  const contact = new ContactModel({
    name: request.body.name,
    occupation: request.body.occupation,
    avatar: request.body.avatar
  });

// Save the new contact
  contact
    .save()
// when the save completes, return the newly created contact
  .then(newContact => {
    return response.json(newContact);
  })
  .catch(err => {
    return console.log(`Error ${err}`);
  });
});

// update contact
app.put('/contacts/:_id', (request, response) => {
  ContactModel.findById(request.params._id)
  .exec()
  .then(contact => {
// Set the attributes on the model from the request.body OR
// if we receive nothing, what the contact is already set to
// this way if we send an update for just the `avatar` field, the name and occupation wont change
    contact.name = request.body.name || contact.name;
    contact.occupation = request.body.occupation || contact.occupation;
    contact.avatar = request.body.avatar || contact.avatar;

    return contact.save();
  })
  .then( contact => {
    return response.json(contact);
  })
  .catch(err => {
    return console.log(`Error ${err}`);
  });
});

// declare our route
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
