const Estudiante = require('../models/Estudiante');

exports.getAllEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.getAll();
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEstudianteById = async (req, res) => {
  try {
    const estudiante = await Estudiante.getById(req.params.id);
    if (!estudiante) return res.status(404).json({ message: 'Estudiante no encontrado' });
    res.json(estudiante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.create(req.body);
    res.status(201).json(estudiante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.update(req.params.id, req.body);
    res.json(estudiante);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deleteEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.delete(req.params.id);
    res.json({ message: 'Estudiante eliminado', estudiante });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
