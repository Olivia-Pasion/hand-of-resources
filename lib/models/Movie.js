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

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT title, director, premiere
      FROM movies
      WHERE id = $1
      `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Movie(rows[0]);
  }

};



