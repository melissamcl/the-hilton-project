const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();
const eventController = require('./controllers/eventController');

if (process.env.NODE_ENV !== 'production') {
  console.log('uri', process.env.MONGO_URI);
}

app.use(express.json());
app.use(morgan('dev'));

app.use('assets', express.static(path.resolve(__dirname, '..client/assets')));

app.get('/key/google_api', (req, res) => {
  res.status(200).send(process.env.GOOGLE_API_KEY);
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

console.log('server.js line 21');

app.post(
  '/events',
  eventController.createEvent,
  eventController.storeLocations,
  eventController.storeLocations,
  eventController.getEventDistance,
  (req, res) => {
    res.status(200).send(res.locals.newEvent);
  }
);

app.delete(
  '/events',
  eventController.deleteEvents,
  eventController.deleteLocations,
  (req, res) => {
    res.status(200).send(res.locals.newEvent);
  }
);

app.use((err, req, res, next) => {
  console.log(err);

  return res.status(400).send();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
