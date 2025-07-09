import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Routes, Route } from 'react-router-dom';
import Navbar from './componets/Navbar';

import Inicio from './componets/paguinas/Inicio';
import Cursos from './componets/paguinas/Cursos';
import Estudiantes from './componets/paguinas/Estudiantes';
import Inscripciones from './componets/paguinas/Inscripciones';
import AcercaDe from './componets/paguinas/AcercaDe';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/estudiantes" element={<Estudiantes />} />
          <Route path="/inscripciones" element={<Inscripciones />} />
          <Route path="/acerca-de" element={<AcercaDe />} /> 
        </Routes>
      </main>
    </div>
    </>
  )
}

export default App
