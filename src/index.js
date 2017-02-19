// Import the express module
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// Create a new instance of express
const app = express();

const contactRoutes = require('../routes/contactRoutes');

// Connect to Mongo database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/contact-list');

// Middleware
app.use(bodyParser.json());
app.use(contactRoutes);
app.use((err, request, response) => response.status(500).send('Request error! ' + err));

// Set our port to server the application on
const PORT = 3001;

// Tell our instance of express to listen to request made on our port
app.listen(PORT, (err) => {
  if (err) {
    return console.log('Listen error! ', err);
  }

  return console.log('Listening on: http://localhost:' + PORT);
});
