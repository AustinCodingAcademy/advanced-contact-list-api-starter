import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import contactRoutes from './routes/ContactRoutes';
// Can also use const express = require('express');


// Create a new instance of express
const app = express();


// Connect to the mongo database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/contact-list');


// Middleware that parses incoming request bodies, and makes the payload
// available to use through request.body
app.use(bodyParser.json());


// Add ContactRoutes to application
app.use(contactRoutes);

app.use(function (err, request, response) {
  return response.status(500).send('Uh oh something went wrong! ' + err);
});


// Set our port to server the application on
const PORT = 3001;


// Tell our instance of express to listen to request made on our port
app.listen(PORT, (err) => {
  if (err) {
    return console.log('Error!', err);
  }

  return console.log('Listening on: http://localhost:' + PORT);
});
