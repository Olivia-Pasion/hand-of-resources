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

  static async insert({ title, director, premiere }) {
    const { rows } = await pool.query(
      `INSERT INTO movies (title, director, premiere) 
      VALUES ($1, $2, $3) RETURNING *;`,
      [title, director, premiere]
    );
    return new Movie(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const movie = await Movie.getById(id);
    if (!movie) return null;

    const updateData = { ...movie, ...newAttrs };
    
    const { rows } = await pool.query(
      `
      UPDATE movies
      SET title = $2, director = $3, premiere = $4
      WHERE id = $1
      RETURNING *;
      `,
      [id, updateData.title, updateData.director, updateData.premiere]
    );
    return new Movie(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM movies
      WHERE id = $1
      RETURNING *;
      `,
      [id]
    );
    return new Movie(rows[0]);
  }
};



