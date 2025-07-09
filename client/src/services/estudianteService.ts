import type { Estudiante } from '../interfaces/Estudiante';

const API_URL = 'http://localhost:3000/api/estudiantes';

export const getEstudiantes = async (): Promise<Estudiante[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener los estudiantes');
  return res.json();
};

export const getEstudianteById = async (id: number): Promise<Estudiante> => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Error al obtener el estudiante');
  return res.json();
};

export const createEstudiante = async (estudiante: Estudiante): Promise<Estudiante> => {
  const res = await fetch(`${API_URL}/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(estudiante),
  });
  if (!res.ok) throw new Error('Error al crear el estudiante');
  return res.json();
};

export const updateEstudiante = async (id: number, estudiante: Estudiante): Promise<Estudiante> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(estudiante),
  });
  if (!res.ok) throw new Error('Error al actualizar el estudiante');
  return res.json();
};

export const deleteEstudiante = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar el estudiante');
};
