import { useEffect, useState } from "react";
import { InscripcionForm } from "./InsForm";
import type { Incripcion } from "../../interfaces/Inscripcion";
import { getInscripciones } from "../../services/inscripcionService";

export const  InscripcionesPage: React.FC = () => {
  const [inscripciones, setInscripciones] = useState<Incripcion[]>([]);

  useEffect(() => {
    const fetchInscripciones = async () => {
      try {
        const data = await getInscripciones();
        setInscripciones(data);
      } catch (error) {
        console.error("Error al obtener inscripciones:", error);
      }
    };

    fetchInscripciones();
  }, []);

  return (
    <div>
      <h1>Gestión de Inscripciones</h1>

      <InscripcionForm setInscripciones={setInscripciones} />

      <h2>Lista de Inscripciones</h2>
      <ul>
        {inscripciones.map((i, index) => (
          <li key={index}>
            Estudiante #{i.id_estudiante} inscrito en Curso #{i.id_curso}
          </li>
        ))}
      </ul>
    </div>
  );
};
