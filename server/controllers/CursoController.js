const Curso = require('../models/Curso');

exports.getAllCursos = async (req, res) => {
  try {
    const cursos = await Curso.getAll();
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCursoById = async (req, res) => {
  try {
    const curso = await Curso.getById(req.params.id);
    if (!curso) return res.status(404).json({ message: 'Curso no encontrado' });
    res.json(curso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCurso = async (req, res) => {
  try {
    const curso = await Curso.create(req.body);
    res.status(201).json(curso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCurso = async (req, res) => {
  try {
    const curso = await Curso.update(req.params.id, req.body);
    res.json(curso);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deleteCurso = async (req, res) => {
  try {
    const curso = await Curso.delete(req.params.id);
    res.json({ message: 'Curso eliminado', curso });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
