import React, { useState } from "react";
import type { Estudiante } from "../../interfaces/Estudiante";

interface Props{
    estudiantes: Estudiante[];
    onDelete: (id: number) => void;
    onEdit: (estudiante: Estudiante) => void;
}

export const EstudianteList: React.FC<Props> = ({ estudiantes, onDelete, onEdit }) => {
    const [estudianteSeleccionado, setEstudianteSeleccionado] = useState<Estudiante | null>(null);

    return (
        <div className="list-container">
            <h3 className="list-title">Lista de estudiantes</h3>
            
            {estudiantes.length === 0 ? (
                <div className="empty-state">
                    <p>No hay estudiantes registrados</p>
                </div>
            ) : (
                <div className="table-wrapper">
                    <table className="estudiante-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Correo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {estudiantes.map((estudiante) => (
                                <tr key={estudiante.id_estudiante}>
                                    <td>{estudiante.nombre}</td>
                                    <td>{estudiante.apellido}</td>
                                    <td>{estudiante.correo}</td>
                                    <td>
                                        <div className="actions">
                                            <button 
                                                onClick={() => onEdit(estudiante)}
                                                className="btn-edit"
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                onClick={() => onDelete(estudiante.id_estudiante)}
                                                className="btn-delete"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};