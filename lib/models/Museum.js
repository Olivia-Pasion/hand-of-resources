const pool = require('../utils/pool');

module.exports = class Museum {
  id;
  name;
  location;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.location = row.location;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `SELECT id, name 
      FROM art_museums;`);
    return rows.map((row) => new Museum(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT name, location
      FROM art_museums
      WHERE id = $1`,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Museum(rows[0]);
  }

  static async insert({ name, location }) {
    const { rows } = await pool.query(
      `INSERT INTO art_museums (name, location)
      VALUES ($1, $2)
      RETURNING *;`,
      [name, location]
    );
    return new Museum(rows[0]);
  }
};


