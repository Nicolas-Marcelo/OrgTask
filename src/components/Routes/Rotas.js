import React from 'react';

import MostrarTarefaKan from '../Kanban/MostrarTarefaKanban.js';
import MostrarTarefaLis from '../Lista/MostarTarefaLista.js';
import './Rotas.css';
import { moverTarefa } from '../DataManipulation/Mover.js';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Rotas() {
  return (
    <div>
      <BrowserRouter>
      <nav className='rotas-menu'>
        <Link to="/kanban">Kanban</Link>
        <Link to="/lista">Lista</Link>
      </nav>
        <Routes>
          <Route 
            path="/kanban" 
            element={<MostrarTarefaKan moverTarefa={moverTarefa}/>} />
          <Route 
            path="/lista" 
            element={<MostrarTarefaLis moverTarefa={moverTarefa}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Rotas;