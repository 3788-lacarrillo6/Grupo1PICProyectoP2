import type { Inscripcion } from '../interfaces/Inscripcion';

const API_URL = 'http://localhost:3000/api/inscripciones';

export const getInscripciones = async (): Promise<Inscripcion[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener las inscripciones');
  return res.json();
};

export const getCursosByEstudiante = async (id_estudiante: number): Promise<any[]> => {
  const res = await fetch(`${API_URL}/estudiante/${id_estudiante}`);
  if (!res.ok) throw new Error('Error al obtener cursos del estudiante');
  return res.json();
};

export const createInscripcion = async (inscripcion: Inscripcion): Promise<Inscripcion> => {
  const res = await fetch(`${API_URL}/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inscripcion),
  });
  if (!res.ok) throw new Error('Error al crear inscripción');
  return res.json();
};

export const deleteInscripcion = async (id_estudiante: number, id_curso: number): Promise<void> => {
  const res = await fetch(`${API_URL}/${id_estudiante}/${id_curso}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar inscripción');
};
