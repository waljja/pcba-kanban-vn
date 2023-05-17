import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutTest from './LayoutTest'
import KanbanVn from './KanbanVn';
import reportWebVitals from './reportWebVitals';
import './index.css';
import './all.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
      <Routes>
        <Route path="/pcba-kanban-cn" element={ <LayoutTest /> }></Route>
        <Route path="pcba-kanban-vn" element={ <KanbanVn /> } />
      </Routes>
  </BrowserRouter>
);

reportWebVitals();
