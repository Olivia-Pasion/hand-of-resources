const pool = require('../utils/pool');

module.exports = class Coffee {
  id;
  name;
  milk;
  oz;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.milk = row.milk;
    this.oz = row.oz;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT coffee_drinks.id, coffee_drinks.name FROM coffee_drinks;');
    return rows.map((row) => new Coffee(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT name, milk, oz FROM coffee_drinks
      WHERE coffee_drinks.id =$1`,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Coffee(rows[0]);
  }

  static async insert({ name, milk, oz }) {
    const { rows } = await pool.query(
      'INSERT INTO coffee_drinks (name, milk, oz) VALUES ($1, $2, $3) RETURNING *;',
      [name, milk, oz]
    );
    return new Coffee(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const coffee = await Coffee.getById(id);
    if (!coffee) return null;

    const updateData = { ...coffee, ...newAttrs };

    const { rows } = await pool.query(
      `UPDATE coffee_drinks
      SET name = $2, milk = $3, oz = $4
      WHERE id = $1
      RETURNING *;`,
      [id, updateData.name, updateData.milk, updateData.oz]
    );
    return new Coffee (rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM coffee_drinks
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );
    return new Coffee(rows[0]);
  }
};



