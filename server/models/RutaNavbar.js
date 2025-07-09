const pool = require('../config/db');

class RutaNavbar {
  static async getAll() {
    const result = await pool.query('SELECT * FROM rutas_navbar WHERE visible = true ORDER BY id');
    return result.rows;
  }
}

module.exports = RutaNavbar;
