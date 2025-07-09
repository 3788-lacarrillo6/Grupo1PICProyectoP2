const express = require('express');
const router = express.Router();
const rutaController = require('../controllers/RutaNavbarController');

router.get('', rutaController.getRutas);

module.exports = router;
