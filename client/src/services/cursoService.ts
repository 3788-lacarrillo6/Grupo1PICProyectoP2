import type { Curso } from '../interfaces/Curso';

const API_URL = 'http://localhost:3000/api/cursos';

export const getCursos = async (): Promise<Curso[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener los cursos');
  return res.json();
};

export const getCursoById = async (id: number): Promise<Curso> => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error(`Error al obtener el curso con ID ${id}`);
  return res.json();
};

export const createCurso = async (curso: Curso): Promise<Curso> => {
  const res = await fetch(`${API_URL}/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(curso),
  });
  if (!res.ok) throw new Error('Error al crear el curso');
  return res.json();
};

export const updateCurso = async (id: number, curso: Curso): Promise<Curso> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(curso),
  });
  if (!res.ok) throw new Error('Error al actualizar el curso');
  return res.json();
};

export const deleteCurso = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar el curso');
};
