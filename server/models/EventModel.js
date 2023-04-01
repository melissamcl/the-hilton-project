const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'reactive-dog-app',
  })
  .then(() => console.log('Connected to db'))
  .catch((err) => console.log(err));

const eventSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  trigger: { type: String, required: true },
  distance: {
    distance: Number,
    locA: mongoose.Schema.Types.ObjectId,
    locB: mongoose.Schema.Types.ObjectId,
  },
  intensity: Number,
  reaction: {
    duration: Number,
    start: Date,
    end: Date,
  },
  recovery: {
    duration: Number,
    start: Date,
    end: Date,
  },
});

const Event = mongoose.model('Event', eventSchema);

const locationSchema = new mongoose.Schema({
  name: String,
  lat: Number,
  long: Number,
});

const Location = mongoose.model('Location', locationSchema);

module.exports = { Event, Location };
