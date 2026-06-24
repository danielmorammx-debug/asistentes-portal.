import React from 'react';

export default function SplashScreen() {
  return (
    <div className="splash-container">
      <div className="splash-content fade-in delay-1">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '16px' }}>powered by</p>
          <img src="/Logo 2026 TDM Blanco.png" alt="Logo 2026 TDM" style={{ height: '120px', objectFit: 'contain' }} />
        </div>
        
        <h1 className="splash-title">
          Evoluciona tu <span className="text-gradient text-gradient-med">operación</span>.
        </h1>
        
        <p className="splash-subtitle fade-in delay-2">
          El futuro de la asistencia con <span className="text-gradient text-gradient-auto font-semibold">Inteligencia Artificial</span> ya está aquí.
        </p>
      </div>
    </div>
  );
}
