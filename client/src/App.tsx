import './App.css'

import { Routes, Route } from 'react-router-dom';
import Navbar from './componets/Navbar';

import Inicio from './componets/paguinas/Inicio';
import { CursoPage } from './componets/cursos/CursoPage';
import {EstudiantePage} from './componets/estudiantes/EstudiantePage';
import {InscripcionesPage} from './componets/inscripciones/InsPague';
import AcercaDe from './componets/paguinas/AcercaDe';

function App() {

  return (
    <>
     <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/cursos" element={<CursoPage />} />
          <Route path="/estudiantes" element={<EstudiantePage />} />
          <Route path="/inscripciones" element={<InscripcionesPage />} />
          <Route path="/acerca-de" element={<AcercaDe />} /> 
        </Routes>
      </main>
    </div>
    </>
  )
}

export default App
