const Inscripcion = require('../models/Inscripcion');

exports.getAllInscripciones = async (req, res) => {
  try {
    const inscripciones = await Inscripcion.getAll();
    res.json(inscripciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCursosByEstudiante = async (req, res) => {
  try {
    const cursos = await Inscripcion.getByEstudiante(req.params.id_estudiante);
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createInscripcion = async (req, res) => {
  try {
    const { id_estudiante, id_curso } = req.body;
    const inscripcion = await Inscripcion.create(id_estudiante, id_curso);
    res.status(201).json({ message: 'Inscripción creada correctamente', inscripcion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteInscripcion = async (req, res) => {
  try {
    const { id_estudiante, id_curso } = req.params;
    const inscripcion = await Inscripcion.delete(id_estudiante, id_curso);
    res.json({ message: 'Inscripción eliminada', inscripcion });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
