
import type { Incripcion } from "../../interfaces/Inscripcion";
import type { Estudiante } from "../../interfaces/Estudiante";
import type { Curso } from "../../interfaces/Curso";
import type { InscripcionVista } from "../../interfaces/InscripcionVista";


interface Props {
    inscripciones: InscripcionVista[];
    cursos: Curso[];
    estudiantes: Estudiante[];
    onDelete: (id: number) => void;
    onEdit: (inscripcion: Incripcion) => void;
}

export const InsList: React.FC<Props> = ({ inscripciones, cursos, estudiantes, onDelete, onEdit }) => {

    console.log("Inscripciones recibidas:", inscripciones);

    return (
        <div className="list-container">
            <h3 className="list-title">Lista de estudiantes inscritos en cursos</h3>

            {inscripciones.length === 0 ? (
                <div className="empty-state">
                    <p>No hay inscripciones registradas</p>
                </div>
            ) : (
                <div className="table-wrapper">
                    <table className="estudiante-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Curso</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>

                            {inscripciones.map((ins, index) => (
                                <tr key={`ins-${index}`}>
                                    <td>{ins.estudiante}</td>
                                    <td>{ins.nombre_curso}</td>
                                    <td>
                                        <div className="actions">
                                            <button
                                                onClick={() => onEdit(ins)}
                                                className="btn-edit"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => onDelete(index)} // Ajusta si tienes un identificador real
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