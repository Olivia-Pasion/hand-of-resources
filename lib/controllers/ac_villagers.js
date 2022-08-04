const { Router } = require('express');
const Villager = require('../models/Villager');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const data = await Villager.getById(req.params.id);
    res.json(data);
  })
  .get('/', async (req, res) => {
    const villagers = await Villager.getAll();
    const ids = villagers.map((villager) => ({ id: villager.id, name: villager.name }));
    res.json(ids); 
  })
  .post('/', async (req, res) => {
    const villager = await Villager.insert(req.body);
    res.json(villager);
  });



