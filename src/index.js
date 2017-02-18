// Import the express module
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// Create a new instance of express
const app = express();

// Connect to Mongo database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/contact-list');

app.use(bodyParser.json());

const contactRoutes = require('../routes/contactRoutes');
app.use(contactRoutes);

app.use(function (err, request, response) {
  return response.status(500).send('Request error! ' + err);
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
