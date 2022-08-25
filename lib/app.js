const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/ac_villagers', require('./controllers/ac_villagers'));
app.use('/art_museums', require('./controllers/art_museums'));
app.use('/cats', require('./controllers/cats'));
app.use('/coffee_drinks', require('./controllers/coffee_drinks'));
app.use('/movies', require('./controllers/movies'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
