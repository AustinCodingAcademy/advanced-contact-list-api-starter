// Your server code here...
/* eslint no-console: 0 */
// Require the express and mongoose modules
import express from 'express';
import mongoose from 'mongoose';
import ContactModel from './Models/ContactModel';
import ActionModel from './Models/ActionModel';
import bodyParser from 'body-parser';

// create a new instance of express
const app = express();


// connect to our mongo database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/contact-list');

app.use(bodyParser.json());

// Take care of CORS issues
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/**
  *   Endpoints for Contacts
  */

// get all contacts
// eslint-disable-next-line
app.get('/contacts', (request, response, next) => {
  ContactModel.find({}).exec()
    .then(contacts => {
      return response.json(contacts);
    })
    .catch(err => {
      return console.log('Error getting contacts!' + err);
    });

});

// get one contact by id
// eslint-disable-next-line
app.get('/contacts/:_id', (request, response, next) => {
  ContactModel.findById(request.params._id).exec()
    .then(contact => {
      return response.json(contact);
    })
    .catch(err => {
      return console.log('Error getting single contact! ' + err);
    });
});

// delete a contact
// eslint-disable-next-line
app.delete('/contacts/:_id', (request, response, next) => {
  ContactModel.findByIdAndRemove(request.params._id).exec()
    .then(contact => {
      return response.json(contact);
    })
    .catch(err => {
      return console.log('Error deleting contact! ' + err);
    });
});

// add a contact
// eslint-disable-next-line
app.post('/contacts', (request, response, next) => {
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
      return console.log('Error adding contact! ' + err);
    });
});

// update a contact
// eslint-disable-next-line
app.put('/contacts/:_id', (request, response, next) => {
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
      return console.log('Error updating contact! ' + err);
    });
});

/**
  *   Endpoints for Actions
  */
// eslint-disable-next-line
app.get('/actions', (request, response, next) => {
  ActionModel.find({}).exec()
    .then(actions => {
      return response.json(actions);
    })
    .catch(err => {
      return console.log('Error getting actions!' + err);
    });
});
// eslint-disable-next-line
app.post('/actions', (request, response, next) => {
  const model = new ActionModel({
    actionMessage: request.body.actionMessage
  });

  // save the new contact
  model.save()
    // When the save completes, return newly created contact
    .then(action => {
      return response.json(action);
    })
    .catch(err => {
      return console.log('Error adding action! ' + err);
    });
});

// eslint-disable-next-line
app.delete('/actions/:_id', (request, response, next) => {
  ActionModel.findByIdAndRemove(request.params._id).exec()
    .then(action => {
      return response.json(action);
    })
    .catch(err => {
      return console.log('Error deleting action! ' + err);
    });
});



// eslint-disable-next-line
app.all('/*', (request, response, next) => {
  return response.send(request.params['0']);
});

const PORT = 3001;

app.listen(PORT, (error) => {
  if (error) {
    return console.log('Error!', error);
  }

  return console.log('Listening on: http://localhost:' + PORT);
});
