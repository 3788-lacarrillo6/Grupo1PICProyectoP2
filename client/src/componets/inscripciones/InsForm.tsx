import React, { useEffect, useState } from "react";
import type { Estudiante } from "../../interfaces/Estudiante";
import type { Curso } from "../../interfaces/Curso";
import type { Incripcion } from "../../interfaces/Inscripcion";

import { getEstudiantes } from "../../services/estudianteService";
import { getCursos } from "../../services/cursoService";
import { getInscripciones, createInscripcion } from "../../services/inscripcionService";
import "../../estilos/estudiantes.css"; // Asegúrate de tener un archivo CSS para estilos

interface Props {
  setInscripciones: (updater: (prev: Incripcion[]) => Incripcion[]) => void;
}

export const InscripcionForm: React.FC<Props> = ({ setInscripciones }) => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [idEstudiante, setIdEstudiante] = useState<number>(0);
  const [idCurso, setIdCurso] = useState<number>(0);
  const [inscripciones, setInscripcionesLocal] = useState<Incripcion[]>([]);

  //Obtener la informacion para los menun desplegables
  useEffect(() => {
    const fetchData = async () => {
      try {
        const estudiantesData = await getEstudiantes();
        const cursosData = await getCursos();
        const inscripcionesData = await getInscripciones();

        setEstudiantes(estudiantesData);
        setCursos(cursosData);
        setInscripcionesLocal(inscripcionesData);

        if (estudiantesData.length > 0) {
          setIdEstudiante(estudiantesData[0].id_estudiante);
        }
        if (cursosData.length > 0) {
          setIdCurso(cursosData[0].id_curso);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, []);

  // Verificar si ya está inscrito
  const yaInscrito = (): boolean => {
    return inscripciones.some(
      (i) =>
        Number(i.id_estudiante) === Number(idEstudiante) &&
        Number(i.id_curso) === Number(idCurso)
    );
  };



  //Funcion para enviar la informacion
  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();
    console.log(yaInscrito);
    if(yaInscrito()){
      alert("Este usuario ya se encuentra matriculado en ese curso");
      return;
    }
    

    const nuevaInscripcion: Incripcion = {
      id_estudiante: idEstudiante,
      id_curso: idCurso,
    };

    try {
      const resultado = await createInscripcion(nuevaInscripcion);
      setInscripciones((prev) => [...prev, resultado]);
      setInscripcionesLocal((prev) => [...prev, resultado]);
      alert("Inscripción realizada con éxito.");
    } catch (error) {
      console.error("Error al crear inscripción:", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="estudiante-form">
        <h2 className="form-title">Inscribir Estudiante en Curso</h2>

        <div className="form-group">
          <label className="form-label">Estudiante:</label>
          <select
            className="form-select"
            value={idEstudiante}
            onChange={(e) => setIdEstudiante(Number(e.target.value))}
          >
            {estudiantes.map((e) => (
              <option key={e.id_estudiante} value={e.id_estudiante}>
                {e.nombre} {e.apellido}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Curso:</label>
          <select
            className="form-select"
            value={idCurso}
            onChange={(e) => setIdCurso(Number(e.target.value))}
          >
            {cursos.map((c) => (
              <option key={c.id_curso} value={c.id_curso}>
                {c.nombre_curso}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="form-button">Inscribir</button>
      </form>

    </div>

  );
};
