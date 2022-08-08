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
};


