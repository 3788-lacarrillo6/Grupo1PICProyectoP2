const { rows } = require('pg/lib/defaults.js');
const pool = require('../config/db');

class Autor{
    constructor(id_autor, nombre, apellido, genero, fecha_nacimiento, nacionalidad, biografia){
        this.id_autor = id_autor;
        this.nombre = nombre;
        this.apellido = apellido;
        this.genero = genero;
        this.fecha_nacimiento = fecha_nacimiento;
        this.nacionalidad = nacionalidad;
        this.biografia = biografia;
    }

    static async getAll() {
        const result = await pool.query('SELECT * FROM public.autor ORDER BY apellido');
        console.log(result);
        return result.rows.map(row => new Autor(
                                                 row.id_autor,
        row.nombre,
        row.apellido,
        row.genero,
        row.fecha_nacimiento,
        row.nacionalidad,
        row.biografia
                                                ));
    }

     

    static async getById(id_autor) {
        const result = await pool.query('SELECT * FROM autor WHERE id_autor = $1', [id_autor]);
        if (result.rows.length > 0) {
            return new Autor(result.rows[0].id_autor,
                            result.rows[0].nombre, 
                            result.rows[0].apellido,  
                            result.rows[0].fecha_nacimiento,
                            result.rows[0].nacionalidad,
                            result.rows[0].biografia,
                            result.rows[0].genero
                        );
        } else {
            throw new Error('Autor not found');
        }
    }

    static async create(autor) {
        const result = await pool.query(
            'INSERT INTO autor (nombre, apellido, genero, fecha_nacimiento, nacionalidad, biografia) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [autor.nombre, autor.apellido, autor.genero, autor.fecha_nacimiento, autor.nacionalidad, autor.biografia]
        );
        return new Autor(result.rows[0]);
    }

    static async update(id_autor, autor) {
        const result = await pool.query(
            'UPDATE autors SET nombre = $1, apellido = $2, genero = $3, fecha_nacimiento = $4, nacionalidad = $5, biografia = $6 WHERE id_autor = $7 RETURNING *',
            [autor.nombre, autor.apellido, autor.genero, autor.fechaNacimiento, autor.nacionalidad, autor.biografia, id_autor]
        );
        if (result.rows.length > 0) {
            return new Autor(result.rows[0]);
        } else {
            throw new Error('Autor not found');
        }
    }

    static async delete(id_autor) {
        const result = await pool.query('DELETE FROM autor WHERE id_autor = $1 RETURNING *', [id_autor]);
        if (result.rows.length > 0) {
            return new Autor(result.rows[0]);
        } else {
            throw new Error('Autor not found');
        }
    }
}

module.exports = Autor;