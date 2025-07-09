const RutaNavbar = require('../models/RutaNavbar');

exports.getRutas = async (req, res) => {
  try {
    const rutas = await RutaNavbar.getAll();
    res.json(rutas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
