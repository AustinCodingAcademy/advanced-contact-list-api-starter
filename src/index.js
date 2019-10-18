import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/contact-list');

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const contactRoutes = require('./routesContactRoutes');
app.use(contactRoutes);

app.use(function(err, request, response, next) {
  return response.status(500).send('Something went wrong!' + err);
});

const PORT = 3001;

app.listen(PORT, (err) => {
  if (err) {
    return console.log('Error!', err);
  }

  return console.log('Listening on: http://localhost:' + PORT);
});
