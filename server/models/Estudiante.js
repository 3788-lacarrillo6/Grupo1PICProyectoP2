const { rows } = require('pg/lib/defaults.js');
const pool = require('../config/db');


class Estudiante {
    constructor(id_estudiante, nombre, apellido, correo) {
        this.id_estudiante = id_estudiante;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
    }

    static async getAll() {
        const result = await pool.query('SELECT * FROM estudiantes ORDER BY apellido');
        return result.rows.map(row => new Estudiante(
            row.id_estudiante,
            row.nombre,
            row.apellido,
            row.correo
        ));
    }

    static async getById(id_estudiante) {
        const result = await pool.query('SELECT * FROM estudiantes WHERE id_estudiante = $1', [id_estudiante]);
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new Estudiante(row.id_estudiante, row.nombre, row.apellido, row.correo);
        } else {
            throw new Error('Estudiante no encontrado');
        }
    }

    static async create(estudiante) {
        const result = await pool.query(
            'INSERT INTO estudiantes (nombre, apellido, correo) VALUES ($1, $2, $3) RETURNING *',
            [estudiante.nombre, estudiante.apellido, estudiante.correo]
        );
        const row = result.rows[0];
        return new Estudiante(row.id_estudiante, row.nombre, row.apellido, row.correo);
    }

    static async update(id_estudiante, estudiante) {
        const result = await pool.query(
            'UPDATE estudiantes SET nombre = $1, apellido = $2, correo = $3 WHERE id_estudiante = $4 RETURNING *',
            [estudiante.nombre, estudiante.apellido, estudiante.correo, id_estudiante]
        );
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new Estudiante(row.id_estudiante, row.nombre, row.apellido, row.correo);
        } else {
            throw new Error('Estudiante no encontrado');
        }
    }

    static async delete(id_estudiante) {
        const result = await pool.query('DELETE FROM estudiantes WHERE id_estudiante = $1 RETURNING *', [id_estudiante]);
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new Estudiante(row.id_estudiante, row.nombre, row.apellido, row.correo);
        } else {
            throw new Error('Estudiante no encontrado');
        }
    }
}

module.exports = Estudiante;