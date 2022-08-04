const ac_villagers = require('../controllers/ac_villagers');
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

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT name, species, catchphrase FROM ac_villagers
      WHERE ac_villagers.id = $1`,
      [id]
    );
    return new Villager(rows[0]);
  }

  static async insert({ name, species, catchphrase }) {
    const { rows } = await pool.query(
      'INSERT INTO ac_villagers (name, species, catchphrase) VALUES ($1, $2, $3) RETURNING *;',
      [name, species, catchphrase]
    );
    return new Villager(rows[0]);
  }

};



