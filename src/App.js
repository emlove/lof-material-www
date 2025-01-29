import React from 'react';

import { Routes, Route } from 'react-router';

import Container from '@mui/material/Container';

import AppBar from './components/AppBar';

import Home from 'pages/Home';
import Events from 'pages/Event/Events';
import Event from 'pages/Event/Event';

import DataContextProvider from 'components/DataContextProvider';

function App() {
  return (
    <DataContextProvider>
      <AppBar />
      <Container maxwidth="xs">
        <Routes>
          <Route index path="*" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:id" element={<Event />} />
        </Routes>
      </Container>
    </DataContextProvider>
  );
}

export default App;
