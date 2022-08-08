const { Router } = require('express');
const Museum = require('../models/Museum');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Museum.getById(req.params.id);
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
      const museums = await Museum.getAll();
      const ids = museums.map((museum) => ({
        id: museum.id, name: museum.name, location: museum.location
      }));
      res.json(ids);
    } catch (e) {
      next (e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const museum = await Museum.insert(req.body);
      res.json(museum);
    } catch (e) {
      next (e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Museum.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next (e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Museum.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next (e);
    }
  });


