const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/CursoController');

router.get('/cursos', cursoController.getAllCursos);
router.get('/cursos/:id', cursoController.getCursoById);
router.post('/cursos/create', cursoController.createCurso);
router.put('/cursos/:id', cursoController.updateCurso);
router.delete('/cursos/:id', cursoController.deleteCurso);

module.exports = router;
