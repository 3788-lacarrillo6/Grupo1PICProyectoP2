const express = require('express');
const router = express.Router();
const inscripcionController = require('../controllers/InscripcionController');

router.get('/inscripciones', inscripcionController.getAllInscripciones);
router.get('/inscripciones/estudiante/:id_estudiante', inscripcionController.getCursosByEstudiante);
router.post('/inscripciones/create', inscripcionController.createInscripcion);
router.delete('/inscripciones/:id_estudiante/:id_curso', inscripcionController.deleteInscripcion);

module.exports = router;
