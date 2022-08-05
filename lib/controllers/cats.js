const { Router } = require('express');
const Cat = require('../models/Cat');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Cat.getById(req.params.id);
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
      const data = await Cat.getAll();
      res.json(data);
    } catch (e) {
      next (e);
    } 
  })
  .post('/', async (req, res, next) => {
    try {
      const cat = await Cat.insert(req.body);
      res.json(cat);
    } catch (e) {
      next (e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Cat.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next (e);
    }
  });
