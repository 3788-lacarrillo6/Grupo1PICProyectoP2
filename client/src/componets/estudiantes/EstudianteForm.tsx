import React, { useState, useEffect } from "react";
import type { Estudiante } from "../../interfaces/Estudiante";
import { createEstudiante, updateEstudiante } from "../../services/estudianteService";
import "../../estilos/estudiantes.css"; // Asegúrate de tener un archivo CSS para estilos

interface Props {
  selectedEstudiante: Estudiante | null;
  setSelectedEstudiante: (estudiante: Estudiante | null) => void;
  setEstudiantes: (updater: (prev: Estudiante[]) => Estudiante[]) => void;
}

export const EstudianteForm: React.FC<Props> = ({
  selectedEstudiante,
  setSelectedEstudiante,
  setEstudiantes,
}) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");

  // Actualiza campos cuando cambia el estudiante seleccionado
  useEffect(() => {
    if (selectedEstudiante) {
      setNombre(selectedEstudiante.nombre);
      setApellido(selectedEstudiante.apellido);
      setCorreo(selectedEstudiante.correo);
    } else {
      setNombre("");
      setApellido("");
      setCorreo("");
    }
  }, [selectedEstudiante]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !apellido || !correo) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const estudiante: Estudiante = {
      id_estudiante: selectedEstudiante ? selectedEstudiante.id_estudiante : 0,
      nombre,
      apellido,
      correo,
    };

    try {
      if (selectedEstudiante) {
        await updateEstudiante(estudiante.id_estudiante, estudiante);
        setEstudiantes((prev) =>
          prev.map((est) =>
            est.id_estudiante === estudiante.id_estudiante ? estudiante : est
          )
        );
      } else {
        const nuevo = await createEstudiante(estudiante);
        setEstudiantes((prev) => [...prev, nuevo]);
      }

      // Reinicia el formulario y la selección
      setSelectedEstudiante(null);
      setNombre("");
      setApellido("");
      setCorreo("");
    } catch (error) {
      console.error("Error al guardar el estudiante:", error);
    }
  };

 return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="estudiante-form">
        <h2 className="form-title">
          {selectedEstudiante ? "Editar Estudiante" : "Agregar Estudiante"}
        </h2>

        <div className="form-group">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="form-input"
            placeholder="Ingrese el nombre"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Apellido:</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
            className="form-input"
            placeholder="Ingrese el apellido"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Correo:</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            className="form-input"
            placeholder="ejemplo@correo.com"
          />
        </div>

        <button type="submit" className="form-button">
          {selectedEstudiante ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
};