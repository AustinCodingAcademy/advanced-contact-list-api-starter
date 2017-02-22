// imports
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import ContactRoutes from './routes/ContactRoutes';
// initialize express
const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/contact-list');
app.use(bodyParser.json());
app.use(ContactRoutes);

app.use(function (err, request, response) {
  return response.status(500).send('something went wrong');
});

// set port
const PORT = 3001;

app.listen(PORT, (err) => {
  if (err) {
    return console.log('Error!', err);
  }

  return console.log('Listening on: http://localhost:' + PORT);

});
