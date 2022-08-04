const { Router } = require('express');
const Villager = require('../models/Villager');

module.exports = Router()
  .get('/', async (req, res) => {
    const villagers = await Villager.getAll();
    const ids = villagers.map((villager) => ({ id: villager.id, name: villager.name }));
    res.json(ids); 
  });



