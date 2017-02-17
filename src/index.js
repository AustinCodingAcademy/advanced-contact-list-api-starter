// Your server code here...
import express from 'express';
import mongoose from 'mongoose';
import ContactModel from './models/ContactModel';
import bodyParser from 'body-parser';

const app = express();

// Connect to our mongo database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/contact-list');

const PORT = 3001;

// const contacts = [
//   {
//     _id: 1,
//     name: 'Dale Cooper',
//     occupation: 'FBI Agent',
//     avatar: 'https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg'
//   },
//   {
//     _id: 2,
//     name: 'Spike Spiegel',
//     occupation: 'Bounty Hunter',
//     avatar: 'http://vignette4.wikia.nocookie.net/deadliestfiction/images/d/de/Spike_Spiegel_by_aleztron.jpg/revision/latest?cb=20130920231337'
//   },
//   {
//     _id: 3,
//     name: 'Wirt',
//     occupation: 'adventurer',
//     avatar: 'http://66.media.tumblr.com/5ea59634756e3d7c162da2ef80655a39/tumblr_nvasf1WvQ61ufbniio1_400.jpg'
//   },
//   {
//     _id: 4,
//     name: 'Michael Myers',
//     occupation: 'Loving little brother',
//     avatar: 'http://vignette2.wikia.nocookie.net/villains/images/e/e3/MMH.jpg/revision/latest?cb=20150810215746'
//   },
//   {
//     _id: 5,
//     name: 'Dana Scully',
//     occupation: 'FBI Agent',
//     avatar: 'https://pbs.twimg.com/profile_images/718881904834056192/WnMTb__R.jpg'
//   }
// ];

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
      console.log('Something went wrong with contacts!' + error);
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

app.all('/*', (request, response) => {
  return response.send(request.params['0']);
});

app.listen(PORT, err => {
  if (err) {
    return console.log('Error!', err);
  }

  return console.log('Listening on: http://localhost:' + PORT);
});
