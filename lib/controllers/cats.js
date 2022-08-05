const { Router } = require('express');
const Cat = require('../models/Cat');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await Cat.getAll();
      res.json(data);
    } catch (e) {
      next (e);
    }
  });
