import React from 'react';

import { Routes, Route } from 'react-router';

import AppBar from './components/AppBar.js';

import Home from './pages/Home.js';
import Events from './pages/Event/Events.js';

function App() {
  return (
    <>
      <AppBar />
      <Routes>
        <Route index path="*" element={<Home />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </>
  );
}

export default App;
