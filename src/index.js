// Your server code here...
import express from 'express';
import mongoose from 'mongoose';
import ContactModel from './models/ContactModel';
import ActionHistoryModel from './models/ActionHistoryModel';
import bodyParser from 'body-parser';

const app = express();

// Connect to our mongo database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/contact-list');

const PORT = 3001;

app.use(bodyParser.json());

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  response.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
  next();
});

app.get('/contacts', (request, response) => {
  ContactModel.find({}).exec()
    .then(data => {
      return response.json(data);
    })
    .catch(error => {
      console.log(`Something went wrong with the contacts list!' ${error}`);
    });
});

app.get('/actionhistory', (request, response) => {
  ActionHistoryModel.find({}).exec()
    .then(data => {
      return response.json(data);
    })
    .catch(error => {
      console.log(`Something went wrong with the action history! ${error}`);
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

app.get('/actionhistory/:_id', (request, response) => {
  ActionHistoryModel.findById(request.params._id).exec()
    .then(actionHistoryItem => {
      return response.json(actionHistoryItem);
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
    .catch(error => {
      return console.log(`Error! ${error}`);
    });
});

app.delete('/actionhistory/:_id', (request, response) => {
  ActionHistoryModel.findByIdAndRemove(request.params._id).exec()
    .then(actionHistoryItem => {
      return response.json(actionHistoryItem);
    })
    .catch(error => {
      return console.log(`Error! ${error}`);
    });
});

app.post('/contacts', (request, response) => {
  console.log(request.body);

  // add validation code

  const model = ContactModel({
    name: request.body.name,
    occupation: request.body.occupation,
    avatar: request.body.avatar
  });

  model.save()
    .then(contact => {
      return response.json(contact);
    })
    .catch(error => {
      console.log(`Error! ${error}`);
    });
});

app.post('/actionhistory', (request, response) => {
  console.log(request.body);

  // add validation code

  const model = ActionHistoryModel({
    itemText: request.body.actionItemText
  });

  model.save()
    .then(actionHistoryItem => {
      return response.json(actionHistoryItem);
    })
    .catch(error => {
      console.log(`Error! ${error}`);
    });
});


app.all('/*', (request, response) => {
  return response.send(request.params['0']);
});

app.listen(PORT, err => {
  if (err) {
    return console.log('Error!', err);
  }

  return console.log('Listening on: http://localhost:' + PORT);
});
