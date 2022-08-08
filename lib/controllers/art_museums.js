const { Router } = require('express');
const Museum = require('../models/Museum');

module.exports = Router()
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
  });


