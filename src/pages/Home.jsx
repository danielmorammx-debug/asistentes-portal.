import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-split-container fade-in">
      {/* Medico Side */}
      <div 
        className="split-panel med-panel"
        onClick={() => navigate('/medico')}
      >
        <div className="split-badge med-badge">
          <span className="text-halaney text-green title-shadow" style={{ fontSize: '3rem' }}>Merit</span>
        </div>
        <p className="split-label text-renner text-white">Sector Médico</p>
      </div>

      {/* Automotriz Side */}
      <div 
        className="split-panel auto-panel"
        onClick={() => navigate('/automotriz')}
      >
        <div className="split-badge auto-badge">
          <span className="text-halaney text-golden title-shadow" style={{ fontSize: '3rem' }}>Mariana</span>
        </div>
        <p className="split-label text-renner text-white" style={{ right: '40px', left: 'auto' }}>Sector Automotriz</p>
      </div>
    </div>
  );
}
