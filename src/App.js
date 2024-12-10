import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WriteInfo from './pages/WriteInfo';
import MakeTem from './pages/MakeTem';
import WriteRev from './pages/WriteRev';
import ProductGrid from './pages/FindPro';

function App() {
  return (
    <Routes>
      <Route path="/" element={<WriteInfo />} />
      <Route path="/MakeTem" element={<MakeTem />} />
      <Route path="/WriteRev" element={<WriteRev />} />
      <Route path="/FindPro" element={<ProductGrid />} />
    </Routes>
  );
}
export default App;
