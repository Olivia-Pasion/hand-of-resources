const pool = require('../utils/pool');

module.exports = class Villager {
  id;
  name;
  species;
  catchphrase;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.species = row.species;
    this.catchphrase = row.catchphrase;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM ac_villagers;');
    return rows.map((row) => new Villager(row));
  }
};



