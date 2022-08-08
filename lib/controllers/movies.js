const { Router } = require('express');
const Movie = require('../models/Movie');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    const data = await Movie.getById(req.params.id);
    try {
      if (!data) {
        next();
      }
      res.json(data);
    } catch (e) {
      next (e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const movies = await Movie.getAll();
      const ids = movies.map((movie) => ({ id: movie.id, title: movie.title }));
      res.json(ids);
    } catch (e) {
      next (e);
    }
  });



