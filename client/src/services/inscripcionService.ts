import type { Incripcion } from '../interfaces/Inscripcion';

const API_URL = 'http://localhost:3000/api/inscripciones';

export const getInscripciones = async (): Promise<Incripcion[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener inscripciones");
    return await response.json();
};


export const createInscripcion = async (inscripcion: Incripcion): Promise<Incripcion> => {
    const response = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(inscripcion),
    });
    if (!response.ok) throw new Error("Error al crear inscripción");
    return await response.json();
};