// Your server code here...
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import contactRoutes from './routes/ContactRoutes';
import actionHistoryRoutes from './routes/ActionHistoryRoutes';

const app = express();

/* eslint-disable max-len */
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/contact-list');

app.use(bodyParser.json());

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  response.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
  next();
});

app.use(contactRoutes);

app.use(actionHistoryRoutes);

// eslint-disable-next-line
app.use((error, request, response, next) => {
  return response.status(500).send('Uh oh, something went wrong! ' + error);
});

const PORT = 3001;

app.listen(PORT, (err) => {
  if (err) {
    return console.log('Error!', err);
  }

  return console.log('Listening on: http://localhost:' + PORT);
});
