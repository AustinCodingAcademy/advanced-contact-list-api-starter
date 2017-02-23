// Your server code here...
/* eslint no-console: 0 */
// Require the express and mongoose modules
import express from 'express';
import mongoose from 'mongoose';
import ContactRouter from './routes/ContactRouter';
import ActionRouter from './routes/ActionRouter';
import bodyParser from 'body-parser';

// create a new instance of express
const app = express();


// connect to our mongo database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/contact-list');

app.use(bodyParser.json());

app.use(ContactRouter);

app.use(ActionRouter);

// Take care of CORS issues
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// eslint-disable-next-line
app.use((error, request, response, next) => {
  return response.status(500).send('Uh oh, something went wrong! ' + error);
});





// eslint-disable-next-line
app.all('/*', (request, response, next) => {
  return response.send(request.params['0']);
});

const PORT = 3001;

app.listen(PORT, (error) => {
  if (error) {
    return console.log('Error!', error);
  }

  return console.log('Listening on: http://localhost:' + PORT);
});
