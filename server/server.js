const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

const eventController = require('./controllers/eventController')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
  console.log('uri', process.env.MONGO_URI)
}

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'))
})

app.post('/',
  eventController.createEvent,
  (req, res) => {
    res.status(200).send(res.locals.newEvent);
  })

app.use((err, req, res, next) => {
  console.log(err);
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
});