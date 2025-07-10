import type React from 'react';
import { useEffect, useState } from 'react';
import type { Curso } from '../../interfaces/Curso';
import { getCursos } from '../../services/cursoService';
import { CursoList } from './CursoList';
import { CursoForm } from './CursoForm';

export const CursoPage: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [selectedCursos, setSelectedCursos] = useState<Curso | null>(null);

  useEffect(() => {
    const fetchCurso= async () => {
      try {
        const data = await getCursos();
        setCursos(data);
      } catch (error) {
        console.error('Error fetching cursos:', error);
      }
    };
    fetchCurso();
  }, []);

  const handleDelete = (id: number) => {
    setCursos(cursos.filter((curso) => curso.id_curso !== id));
  };

  const handleEdit = (curso: Curso) => {
    setSelectedCursos(curso);
  };

  return (
    <div className="estudiante-page">
      <h1>Gestión de Estudiantes</h1>
      <CursoForm
        selectedCursos={selectedCursos}
        setSelectedCursos={setSelectedCursos}
        setCursos={setCursos}
      />
      <CursoList cursos={cursos} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};
