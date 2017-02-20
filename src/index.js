// imports
import express from 'express';
import ContactModel from './models/ContactModel';
import mongoose from 'mongoose';

// initialize express
const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/contact-list');


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
