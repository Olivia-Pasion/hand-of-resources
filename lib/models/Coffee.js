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
};



