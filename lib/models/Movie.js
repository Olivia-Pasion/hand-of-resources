const pool = require('../utils/pool');

module.exports = class Movie {
  id;
  title;
  director;
  premiere;

  constructor (row) {
    this.id = row.id;
    this.title = row.title;
    this.director = row.director;
    this.premiere = row.premiere;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM movies');
    return rows.map((row) => new Movie(row));
  }

};



