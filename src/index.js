// Require the express module 
import express from 'express';
import bodyParser from 'body-parser';

// Create a new instance of express
const app = express();

// Connect to our mongo database
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/contact-list');

app.use(bodyParser.json());

import contactRoutes from './routes/ContactRoutes';
app.use(contactRoutes);

/* eslint no-unused-vars: 0 */
app.use(function (err, request, response, next) {
  return response.status(500).send('Uh oh something went wrong! ' + err);
});

// Set our port to server the application on
const PORT = 3001;

// Tell our instance of express to listen to request made on our port
app.listen(PORT, function (err) {
  if (err) {
    return console.log('Error!', err);
  }

  return console.log('Listening on: http://localhost:' + PORT);
});
