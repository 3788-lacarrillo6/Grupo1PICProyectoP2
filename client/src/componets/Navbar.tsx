import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getRutasNavbar } from '../services/rutasNavbarService';
import type { RutaNavbar } from '../interfaces/RutaNavbar';
import { AcademicCapIcon } from '@heroicons/react/24/solid';

const Navbar: React.FC = () => {
  const [rutas, setRutas] = useState<RutaNavbar[]>([]);
  const location = useLocation();

  useEffect(() => {
    getRutasNavbar()
      .then((data) => {
        console.log('Rutas recibidas del backend:', data); 
        setRutas(data);
      })
      .catch(console.error);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="" className="flex items-center space-x-2 text-white">
        <AcademicCapIcon className="w-6 h-6 text-cyan-300" />
        <span>EduSystem</span>
        </Link>
        
        <ul className="navbar-nav">
          {rutas.map((ruta) => (
            <li key={ruta.id}>
              <Link 
                to={ruta.path} 
                className={`nav-link ${location.pathname === ruta.path ? 'active' : ''}`}
              >
                {ruta.nombre}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;