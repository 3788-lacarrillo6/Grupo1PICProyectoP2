import './AcercaDe.css';

const AcercaDe: React.FC = () => {
  return (
    <div className="acerca-container">
      <h2>Acerca del Desarrollador</h2>

      <p><strong>Nombre:</strong> Andrés Carrillo</p>
      <p><strong>Correo:</strong> andres.carrillo@example.com</p>
      <p>
        <strong>Descripción:</strong> Proyecto académico desarrollado como parte del segundo parcial para la materia de Programación Integrativa de Componentes. Esta aplicación gestiona cursos, estudiantes e inscripciones usando React, Node.js y PostgreSQL.
      </p>
      <p className="quote">
        “La educación es el arma más poderosa que puedes usar para cambiar el mundo.” – Nelson Mandela
      </p>
    </div>
  );
};

export default AcercaDe;
