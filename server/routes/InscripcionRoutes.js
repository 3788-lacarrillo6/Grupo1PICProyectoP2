const express = require('express');
const router = express.Router();
const inscripcionController = require('../controllers/InscripcionController');

router.get('', inscripcionController.getAllInscripciones);
router.get('/estudiante/:id_estudiante', inscripcionController.getCursosByEstudiante);
router.post('/create', inscripcionController.createInscripcion);
router.delete('/:id_estudiante/:id_curso', inscripcionController.deleteInscripcion);

module.exports = router;
