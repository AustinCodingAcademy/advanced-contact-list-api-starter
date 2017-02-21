// Your server code here...
import express from 'express';
import ContactModel from './model/ContactModel';
import bodyParser from 'body-parser';

const app = express();

// Connect to our mongo database
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/contact-list');

app.use(bodyParser.json());

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/contacts', (request, response) => {
  ContactModel.find({}).exec()
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

app.delete('/contacts/:_id', (request, response) => {
  ContactModel.findByIdAndRemove(request.params._id).exec()
      .then(contact => {
        return response.json(contact);
      })
      .catch(err => {
        return console.log(`Error ${err}`);
      });
});

app.post('/contacts', (request, response) => {
  const contact = new ContactModel({
    name: request.body.name,
    occupation: request.body.occupation,
    avatar: request.body.avatar,
  });

  contact.save()
    .then(contactToSave => {
      return response.json(contactToSave);
    })
    .catch(err => {
      return console.log(`Error ${err}`);
    });
});

app.put('/contacts/:_id', (request, response) => {
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

const PORT = 3001;

app.listen(PORT, (err) => {
  if (err) {
    return console.log('Error!', err);
  }

  return console.log('Listening on: http://localhost:' + PORT);
});
