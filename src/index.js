// Your server code here...
import express from 'express';

const app = express();

app.get('/contacts', (request, response, next) => {
  const contacts = [
    {
      _id: 1,
      name: 'Dale Cooper',
      occupation: 'FBI Agent',
      avatar: 'https://upload.wikimedia.org/wikipedia/en/5/50/Adentgalecooper.jpg'
    },
    {
      _id: 2,
      name: 'Spike Spiegel',
      occupation: 'Bounty Hunter',
      avatar: 'http://vignette4.wikia.nocookie.net/deadliestfiction/images/d/de/Spike_Spiegel_by_aleztron.jpg/revision/latest?cb=20130920231337'
    }
  ];

  return response.json(contacts);
});

app.all('/*', (request, response, next) => {
  return response.send(request.params['0']);
});

const PORT = 3001;

app.listen(PORT, (err) => {
  if (err) {
    return console.log('Error!', err);
  }

  return oonsole.log('Listening on: http://localhost:' + PORT);
});
