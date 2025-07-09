const { rows } = require('pg/lib/defaults.js');
const pool = require('../config/db');

class Inscripcion {
    constructor(id_estudiante, id_curso) {
        this.id_estudiante = id_estudiante;
        this.id_curso = id_curso;
    }

    static async getAll() {
        const result = await pool.query(`
            SELECT e.nombre || ' ' || e.apellido AS estudiante, c.nombre_curso
            FROM inscripciones i
            JOIN estudiantes e ON i.id_estudiante = e.id_estudiante
            JOIN cursos c ON i.id_curso = c.id_curso
        `);
        return result.rows;
    }

    static async getByEstudiante(id_estudiante) {
        const result = await pool.query(`
            SELECT c.*
            FROM inscripciones i
            JOIN cursos c ON i.id_curso = c.id_curso
            WHERE i.id_estudiante = $1
        `, [id_estudiante]);
        return result.rows;
    }

    static async create(id_estudiante, id_curso) {
        await pool.query(
            'INSERT INTO inscripciones (id_estudiante, id_curso) VALUES ($1, $2)',
            [id_estudiante, id_curso]
        );
        return new Inscripcion(id_estudiante, id_curso);
    }

    static async delete(id_estudiante, id_curso) {
        const result = await pool.query(
            'DELETE FROM inscripciones WHERE id_estudiante = $1 AND id_curso = $2 RETURNING *',
            [id_estudiante, id_curso]
        );
        if (result.rows.length > 0) {
            return new Inscripcion(id_estudiante, id_curso);
        } else {
            throw new Error('Inscripción no encontrada');
        }
    }
}

module.exports = Inscripcion;