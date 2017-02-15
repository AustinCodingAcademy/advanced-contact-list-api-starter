// Import the express module
import express from 'express';

// Create a new instance of express
const app = express();

// Declare a GET /contacts route
app.get('/contacts', (request, response) => {
  const contacts = [
    {
      _id: 1,
      name: 'Dale Cooper',
      occupation: 'FBI Agent',
      avatar: 'https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg'
    },
    {
      _id: 2,
      name: 'Spike Spiegel',
      occupation: 'Bounty Hunter',
      avatar: 'http://vignette4.wikia.nocookie.net/deadliestfiction/images/d/de/Spike_Spiegel_by_aleztron.jpg/revision/latest?cb=20130920231337'
    },
    {
      _id: 3,
      name: 'Wirt',
      occupation: 'adventurer',
      avatar: 'http://66.media.tumblr.com/5ea59634756e3d7c162da2ef80655a39/tumblr_nvasf1WvQ61ufbniio1_400.jpg'
    },
    {
      _id: 4,
      name: 'Michael Myers',
      occupation: 'Loving little brother',
      avatar: 'http://vignette2.wikia.nocookie.net/villains/images/e/e3/MMH.jpg/revision/latest?cb=20150810215746'
    },
    {
      _id: 5,
      name: 'Dana Scully',
      occupation: 'FBI Agent',
      avatar: 'https://pbs.twimg.com/profile_images/718881904834056192/WnMTb__R.jpg'
    }
  ];

  return response.json(contacts);
});

// Declare our route
app.all('/*', (request, response) => {
  return response.send(request.params['0']);
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
