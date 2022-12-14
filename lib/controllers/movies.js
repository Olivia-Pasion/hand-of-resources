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
  })
  .post('/', async (req, res, next) => {
    try {
      const movie = await Movie.insert(req.body);
      res.json(movie);
    } catch (e) {
      next (e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Movie.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next (e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Movie.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next (e);
    }
  });



