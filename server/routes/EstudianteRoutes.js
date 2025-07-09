const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/EstudianteController');

router.post('/create', estudianteController.createEstudiante);
router.get('', estudianteController.getAllEstudiantes);
router.get('/:id', estudianteController.getEstudianteById);
router.put('/:id', estudianteController.updateEstudiante);
router.delete('/:id', estudianteController.deleteEstudiante);

module.exports = router;
