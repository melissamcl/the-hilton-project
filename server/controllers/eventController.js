const db = require('../models/EventModel')
const geodist = require('geodist');

const eventController = {};

eventController.createEvent = (req, res, next) => {
  console.log('eventController.createEvent')
  const { timeStr, trigger, latA, longA, latB, longB, intensity, reactionStart, reactionEnd, recoveryEnd } = req.body;
  const reactionDuration = (Date.parse(reactionEnd) - Date.parse(reactionStart)) / 1000;
  const recoveryDuration = (Date.parse(recoveryEnd) - Date.parse(reactionEnd)) / 1000;
  const timestamp = new Date(Date.parse(timeStr))

  db.Event.create({
    timestamp,
    trigger,
    intensity,
    reaction: {
      duration: reactionDuration,
      start: Date(Date.parse(reactionStart)),
      end: Date(Date.parse(reactionEnd))
    },
    recovery: {
      duration: recoveryDuration,
      start: Date(Date.parse(reactionEnd)),
      end: Date(Date.parse(recoveryEnd))
    }
  })
    .then(result => {
      res.locals.newEvent = result;
      res.locals.locations = [];
      res.locals.coordinates = [];
      if (latA && longA) {
        res.locals.locations.push({ A: { lat: latA, long: longA } });
        res.locals.coordinates.push([latA, longA]);
      }
      if (latB && longB) {
        res.locals.locations.push({ B: { lat: latB, long: longB } });
        res.locals.coordinates.push([latB, longB]);
      }
      return next();
    })
    .catch(err => {
      return next(err);
    });
}

eventController.storeLocations = (req, res, next) => {
  if (res.locals.locations.length > 0) {
    // get lat/long from nested object, regardless of outer object key
    const { lat, long } = Object.values(res.locals.locations[0])[0];
    const locId = Object.keys(res.locals.locations[0])[0];

    db.Location.create(
      { lat, long }
    )
      .then(result => {
        eval(`res.locals.loc${locId} = result._id`);
        res.locals.locations.shift()
        return next();
      })
      .catch(err => {
        return next(err);
      });
  } else return next();
  // additional error handling?? 
}

eventController.getEventDistance = (req, res, next) => {
  let distance;
  if (res.locals.locA && res.locals.locB) {
    distance = geodist(res.locals.coordinates[0], res.locals.coordinates[1], { exact: true, unit: 'feet' });
  }

  const { locA, locB } = res.locals;

  res.locals.newEvent.distance = {
    distance,
    locA,
    locB
  }

  return next();

}

eventController.deleteEvents = (req, res, next) => {
  db.Event.deleteMany()
    .then(result => {
      return next()
    })
    .catch(err => {
      return next(err)
    })
}

module.exports = eventController;