const pool = require('../utils/pool');

module.exports = class Cat {
  id;
  breed;
  longHair;

  constructor(row) {
    this.id = row.id;
    this.breed = row.breed;
    this.longHair = row.longhair;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT cats.id, breed FROM cats;');
    return rows.map((row) => new Cat(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT breed, longHair FROM cats
      WHERE cats.id = $1
      `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    } 
    return new Cat(rows[0]);
  }

  static async insert({ breed, longHair }) {
    const { rows } = await pool.query(
      `
      INSERT INTO cats (breed, longHair) VALUES ($1, $2)
      RETURNING *;
      `,
      [breed, longHair]
    );
    return new Cat(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const cat = await Cat.getById(id);
    if (!cat) return null;

    const updateData = { ...cat, ...newAttrs };
    const { rows } = await pool.query(
      `
      UPDATE cats
      SET breed = $2, longHair = $3
      WHERE id = $1
      RETURNING *;
      `,
      [id, updateData.breed, updateData.longHair]
    );
    return new Cat(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM  cats
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );
    return new Cat(rows[0]);
  }
};
