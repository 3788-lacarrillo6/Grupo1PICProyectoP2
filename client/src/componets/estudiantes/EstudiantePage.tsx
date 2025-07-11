import type React from 'react';
import { useEffect, useState } from 'react';
import type { Estudiante } from '../../interfaces/Estudiante';
import { getEstudiantes,deleteEstudiante } from '../../services/estudianteService';
import { EstudianteList } from './EstudianteList';
import { EstudianteForm } from './EstudianteForm';

export const EstudiantePage: React.FC = () => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [selectedEstudiante, setSelectedEstudiante] = useState<Estudiante | null>(null);

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const data = await getEstudiantes();
        setEstudiantes(data);
      } catch (error) {
        console.error('Error fetching estudiantes:', error);
      }
    };
    fetchEstudiantes();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteEstudiante(id); // Borra en la BD
      setEstudiantes(estudiantes.filter((e) => e.id_estudiante !== id)); // Actualiza vista
    } catch (error) {
      console.error("Error al eliminar estudiante:", error);
      // Puedes mostrar un mensaje al usuario si lo deseas
    }
  };




  const handleEdit = (estudiante: Estudiante) => {
    setSelectedEstudiante(estudiante);
  };

  return (
    <div className="estudiante-page">
      <h1>Gestión de Estudiantes</h1>
      <EstudianteForm
        selectedEstudiante={selectedEstudiante}
        setSelectedEstudiante={setSelectedEstudiante}
        setEstudiantes={setEstudiantes}
      />
      <EstudianteList estudiantes={estudiantes} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};
