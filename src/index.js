// Require the express module (package.json)
const express = require('express');
const bodyParser = require('body-parser');

// Create a new instance of express
const app = express();

// Connect to our mongo database
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/contact-list');

app.use(bodyParser.json());

const contactRoutes = require('./routes/ContactRoutes');
app.use(contactRoutes);

app.use(function (err, request, response) {
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
