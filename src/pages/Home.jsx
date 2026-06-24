import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, CarFront } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container fade-in delay-1">
      {/* Medico Side */}
      <div 
        className="split-panel med-panel"
        onClick={() => navigate('/medico')}
      >
        <div className="panel-content">
          <Stethoscope size={64} className="panel-icon med-icon" />
          <h2 className="panel-title">Sector Médico</h2>
          <p className="panel-desc">"MERIT"</p>
        </div>
      </div>

      {/* Automotriz Side */}
      <div 
        className="split-panel auto-panel"
        onClick={() => navigate('/automotriz')}
      >
        <div className="panel-content">
          <CarFront size={64} className="panel-icon auto-icon" />
          <h2 className="panel-title">Sector Automotriz</h2>
          <p className="panel-desc">"MARIANA"</p>
        </div>
      </div>
    </div>
  );
}
