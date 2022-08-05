const pool = require('../utils/pool');

module.exports = class Cat {
  id;
  breed;
  longHair;

  constructor(row) {
    this.id = row.id;
    this.breed = row.breed;
    this.longHair = row.longHair;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM cats;');
    return rows.map((row) => new Cat(row));
  }
};



