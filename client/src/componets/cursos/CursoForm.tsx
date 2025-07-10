import React, { useState, useEffect } from "react";
import type { Curso } from "../../interfaces/Curso";
import { createCurso, updateCurso } from "../../services/cursoService";
import "../../estilos/estudiantes.css"; // Asegúrate de tener un archivo CSS para estilos

interface Props {
  selectedCursos: Curso | null;
  setSelectedCursos: (cursos: Curso | null) => void;
  setCursos: (updater: (prev: Curso[]) => Curso[]) => void;
}

export const CursoForm: React.FC<Props> = ({
  selectedCursos,
  setSelectedCursos,
  setCursos,
}) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // Actualiza campos cuando cambia el estudiante seleccionado
  useEffect(() => {
    if (selectedCursos) {
      setNombre(selectedCursos.nombre_curso);
      setDescripcion(selectedCursos.descripcion);
    } else {
      setNombre("");
      setDescripcion("");
    }
  }, [selectedCursos]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !descripcion) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const curso: Curso = {
      id_curso: selectedCursos ? selectedCursos.id_curso : 0,
      nombre_curso: nombre,
      descripcion,
    };

    try {
      if (selectedCursos) {
        await updateCurso(curso.id_curso, curso);
        setCursos((prev) =>
          prev.map((est) =>
            est.id_curso === curso.id_curso ? curso : est
          )
        );
      } else {
        const nuevo = await createCurso(curso);
        setCursos((prev) => [...prev, nuevo]);
      }

      // Reinicia el formulario y la selección
      setSelectedCursos(null);
      setNombre("");
      setDescripcion("");
    } catch (error) {
      console.error("Error al guardar el curso:", error);
    }
  };

 return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="estudiante-form">
        <h2 className="form-title">
          {selectedCursos ? "Editar Curso" : "Agregar curso"}
        </h2>

        <div className="form-group">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="form-input"
            placeholder="Ingrese el nombre del curso"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Descripcion:</label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            className="form-input"
            placeholder="Ingrese la descripción del curso"
          />
        </div>

        <button type="submit" className="form-button">
          {selectedCursos ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
};