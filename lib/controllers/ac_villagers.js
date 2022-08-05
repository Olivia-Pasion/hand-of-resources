const { Router } = require('express');
const Villager = require('../models/Villager');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Villager.getById(req.params.id);
      if (!data) {
        next();
      }
      res.json(data);
    } catch(e) {
      next(e);
    } 
  })
  .get('/', async (req, res) => {
    const villagers = await Villager.getAll();
    const ids = villagers.map((villager) => ({ id: villager.id, name: villager.name }));
    res.json(ids); 
  })
  .post('/', async (req, res) => {
    const villager = await Villager.insert(req.body);
    res.json(villager);
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Villager.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Villager.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next (e);
    }
  });



