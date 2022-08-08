const { Router } = require('express');
const Movie = require('../models/Movie');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const movies = await Movie.getAll();
      const ids = movies.map((movie) => ({ id: movie.id, title: movie.title }));
      res.json(ids);
    } catch (e) {
      next (e);
    }
  });



