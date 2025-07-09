import { Link } from 'react-router-dom';

const Inicio: React.FC = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Bienvenido</h1>
      <p className="page-subtitle">Sistema de Gestión Educativa</p>

      <div className="grid grid-2">
        <Link to="/cursos" className="card">
          <h3 className="card-title">Cursos</h3>
          <p className="card-description">Gestiona los cursos disponibles</p>
        </Link>

        <Link to="/estudiantes" className="card">
          <h3 className="card-title">Estudiantes</h3>
          <p className="card-description">Administra la información de estudiantes</p>
        </Link>
      </div>
    </div>
  );
};

export default Inicio;
