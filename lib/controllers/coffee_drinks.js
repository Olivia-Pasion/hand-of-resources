const { Router } = require('express');
const Coffee = require('../models/Coffee');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Coffee.getById(req.params.id);
      if (!data) {
        next();
      }
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const coffees = await Coffee.getAll();
      const ids = coffees.map((coffee) => ({ id: coffee.id, name: coffee.name }));
      res.json(ids);
    } catch (e) {
      next (e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const coffee = await Coffee.insert(req.body);
      res.json(coffee);
    } catch (e) {
      next (e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Coffee.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next (e);
    }
  });



