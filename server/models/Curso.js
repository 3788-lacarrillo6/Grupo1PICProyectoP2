const { rows } = require('pg/lib/defaults.js');
const pool = require('../config/db');


class Curso {
    constructor(id_curso, nombre_curso, descripcion) {
        this.id_curso = id_curso;
        this.nombre_curso = nombre_curso;
        this.descripcion = descripcion;
    }

    static async getAll() {
        const result = await pool.query('SELECT * FROM cursos ORDER BY nombre_curso');
        return result.rows.map(row => new Curso(
            row.id_curso,
            row.nombre_curso,
            row.descripcion
        ));
    }

    static async getById(id_curso) {
        const result = await pool.query('SELECT * FROM cursos WHERE id_curso = $1', [id_curso]);
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new Curso(row.id_curso, row.nombre_curso, row.descripcion);
        } else {
            throw new Error('Curso no encontrado');
        }
    }

    static async create(curso) {
        const result = await pool.query(
            'INSERT INTO cursos (nombre_curso, descripcion) VALUES ($1, $2) RETURNING *',
            [curso.nombre_curso, curso.descripcion]
        );
        const row = result.rows[0];
        return new Curso(row.id_curso, row.nombre_curso, row.descripcion);
    }

    static async update(id_curso, curso) {
        const result = await pool.query(
            'UPDATE cursos SET nombre_curso = $1, descripcion = $2 WHERE id_curso = $3 RETURNING *',
            [curso.nombre_curso, curso.descripcion, id_curso]
        );
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new Curso(row.id_curso, row.nombre_curso, row.descripcion);
        } else {
            throw new Error('Curso no encontrado');
        }
    }

    static async delete(id_curso) {
        const result = await pool.query('DELETE FROM cursos WHERE id_curso = $1 RETURNING *', [id_curso]);
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new Curso(row.id_curso, row.nombre_curso, row.descripcion);
        } else {
            throw new Error('Curso no encontrado');
        }
    }
}

module.exports = Curso;
