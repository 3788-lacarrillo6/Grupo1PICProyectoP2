const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/EstudianteController');

router.get('/estudiantes', estudianteController.getAllEstudiantes);
router.get('/estudiantes/:id', estudianteController.getEstudianteById);
router.post('/estudiantes/create', estudianteController.createEstudiante);
router.put('/estudiantes/:id', estudianteController.updateEstudiante);
router.delete('/estudiantes/:id', estudianteController.deleteEstudiante);

module.exports = router;
