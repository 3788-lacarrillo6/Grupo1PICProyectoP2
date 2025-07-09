import type { RutaNavbar } from '../interfaces/RutaNavbar';

const API_URL = 'http://localhost:3000/api/rutas-navbar';

export const getRutasNavbar = async (): Promise<RutaNavbar[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener las rutas del navbar');
  return res.json();
};
