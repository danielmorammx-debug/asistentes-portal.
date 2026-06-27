import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import AutomotrizLayout from './pages/AutomotrizLayout';
import MedicoLayout from './pages/MedicoLayout';
import ContactoLayout from './pages/ContactoLayout';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide splash screen after 5.5 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/automotriz/*" element={<AutomotrizLayout />} />
            <Route path="/medico/*" element={<MedicoLayout />} />
            <Route path="/contacto/*" element={<ContactoLayout />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
