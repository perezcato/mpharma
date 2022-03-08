import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Index from "./page";
import Create from "./page/create";
import Edit from "./page/edit";

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Index />} />
      <Route path={'/create'} element={<Create />} />
      <Route path={'/edit/:id'} element={<Edit />} />
    </Routes>
  );
}

export default App;
