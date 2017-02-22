// imports
import express from 'express';
import ContactModel from './models/ContactModel';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// initialize express
const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/contact-list');
app.use(bodyParser.json());

// reassign our route
app.get('/contacts', function (request, response) {
  ContactModel.find({}).exec()
    .then(contacts => {
      return response.json(contacts);
    })
    .catch(err => {
      return console.log(`Error ${err}`);
    });
});

app.get('contacts/:_id', function (request, response) {
  ContactModel.findById(request.params._id).exec()
  .then(contact => {
    return response.json(contact);
  })
  .catch(err => {
    return console.loge(`Error ${err}`);
  });
});

app.delete('/contacts/:_id', function (request, response) {
  ContactModel.findByIdAndRemove(request.params._id).exec()
    .then(contact => {
      return response.json(contact);
    })
    .catch(err => {
      return console.log(`Error ${err}`);
    });
});

app.post('/contacts', function (request, response) {
  const newContact = new ContactModel({
    name: request.body.name,
    occupation: request.body.occupation,
    avatar: request.body.avatar,
  });

  // Save the new contact
  newContact.save()
    // When the save completes, return the newly created contact
    .then(contact => {
      return response.json(contact);
    })
    .catch(err => {
      return console.log(`Error ${err}`);
    });
});

// reassign our route
app.get('/addedContacts', function (request, response) {
  ContactModel.find({}).exec()
    .then(contacts => {
      return response.json(contacts);
    })
    .catch(err => {
      return console.log(`Error ${err}`);
    });
});

app.get('/addedContacts/:_id', function (request, response) {
  ContactModel.findById(request.params._id).exec()
  .then(contact => {
    return response.json(contact);
  })
  .catch(err => {
    return console.log(`Error ${err}`);
  });
});

app.post('/addedContacts', function (request, response) {
  const newContact = new ContactModel({
    name: request.body.name,
    occupation: request.body.occupation,
    avatar: request.body.avatar
  });

  newContact.save()
    .then(contact => {
      return response.json(contact);
    })
    .catch(err => {
      return console.log(`Error ${err}`);
    });
});

app.delete('/addedContacts/:_id', function (request, response) {
  ContactModel.findByIdAndRemove(request.params._id).exec()
    .then(contact => {
      return response.json(contact);
    })
    .catch(err => {
      return console.log(`Error ${err}`);
    });
});


// set route
app.all('/*', (request, response) => {
  return response.send(request.params['0']);
});

// set port
const PORT = 3001;

app.listen(PORT, (err) => {
  if (err) {
    return console.log('Error!', err);
  }

  return console.log('Listening on: http://localhost:' + PORT);

});
