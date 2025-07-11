import { useEffect, useState } from "react";
import { InscripcionForm } from "./InsForm";
import type { Incripcion } from "../../interfaces/Inscripcion";
import { getInscripciones } from "../../services/inscripcionService";
import { getEstudiantes } from "../../services/estudianteService";
import { getCursos } from "../../services/cursoService";
import type { Estudiante } from "../../interfaces/Estudiante";
import type { Curso } from "../../interfaces/Curso";
import { InsList } from "./InsList";


export const InscripcionesPage: React.FC = () => {
  const [inscripciones, setInscripciones] = useState<Incripcion[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [insData, estData, curData] = await Promise.all([
          getInscripciones(),
          getEstudiantes(),
          getCursos(),
        ]);

        setInscripciones(insData);
        setEstudiantes(estData);
        setCursos(curData);
        console.log("Inscripciones: ",setInscripciones)
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Gestión de Inscripciones</h1>

      <InscripcionForm setInscripciones={setInscripciones} />

      <h2>Lista de Inscripciones</h2>

      <InsList
        inscripciones={inscripciones}
        cursos={cursos}
        estudiantes={estudiantes}
        onEdit={(inscripcion) => {
          // Implementar lógica de edición si es necesaria
          console.log("Editar inscripción:", inscripcion);
        }}
        onDelete={(id_estudiante) => {
          // Implementar lógica de eliminación si es necesaria
          setInscripciones((prev) =>
            prev.filter((ins) => ins.id_estudiante !== id_estudiante)
          );
        }}
      />
    </div>
  );
};
