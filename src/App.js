import React from 'react';

import { Routes, Route, Navigate } from 'react-router';

import Container from '@mui/material/Container';

import AppBar from './components/AppBar';

import Home from 'pages/Home';
import Arts from 'pages/Art/Arts';
import Art from 'pages/Art/Art';
import Camps from 'pages/Camp/Camps';
import Camp from 'pages/Camp/Camp';
import Events from 'pages/Event/Events';
import Event from 'pages/Event/Event';
import Radios from 'pages/Radio/Radios';
import Radio from 'pages/Radio/Radio';
import Vehicles from 'pages/Vehicle/Vehicles';
import Vehicle from 'pages/Vehicle/Vehicle';

import DataContextProvider from 'components/DataContextProvider';

function App() {
  return (
    <DataContextProvider>
      <AppBar />
      <Container maxwidth="xs" sx={{ paddingTop: 2, paddingBottom: 2 }}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/art" element={<Arts />} />
          <Route path="/art/:id" element={<Art />} />
          <Route path="/camps" element={<Camps />} />
          <Route path="/camp/:id" element={<Camp />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:id" element={<Event />} />
          <Route path="/radio" element={<Radios />} />
          <Route path="/radio/:id" element={<Radio />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicle/:id" element={<Vehicle />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </DataContextProvider>
  );
}

export default App;
