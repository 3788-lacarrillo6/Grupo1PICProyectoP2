import React, { useState } from "react";
import type { Curso } from "../../interfaces/Curso";

interface Props{
    cursos: Curso[];
    onDelete: (id: number) => void;
    onEdit: (cursos: Curso) => void;
}

export const CursoList: React.FC<Props> = ({ cursos, onDelete, onEdit }) => {
    const [cursoSeleccionado, setcursoSeleccionado] = useState<Curso | null>(null);

    return (
        <div className="list-container">
            <h3 className="list-title">Lista de cursos</h3>
            
            {cursos.length === 0 ? (
                <div className="empty-state">
                    <p>No hay cursos registrados</p>
                </div>
            ) : (
                <div className="table-wrapper">
                    <table className="estudiante-table">
                        <thead>
                            <tr>
                                <th>Nombre del curso</th>
                                <th>Descripcion</th>                                
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cursos.map((curso) => (
                                <tr key={curso.id_curso}>
                                    <td>{curso.nombre_curso}</td>
                                    <td>{curso.descripcion}</td>
                                    <td>
                                        <div className="actions">
                                            <button 
                                                onClick={() => onEdit(curso)}
                                                className="btn-edit"
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                onClick={() => onDelete(curso.id_curso)}
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