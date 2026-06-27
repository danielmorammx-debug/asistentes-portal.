import React from 'react';

export default function SplashScreen() {
  return (
    <div className="splash-custom-container">
      <div className="splash-text-block fade-in delay-1">
        <h2 className="text-renner text-white">Evoluciona tu</h2>
        <h1 className="text-halaney text-golden mb-8">operación.</h1>
        
        <h2 className="text-renner text-white">El futuro de la</h2>
        <h2 className="text-renner text-white">asistencia con</h2>
        <h1 className="text-halaney text-green">Inteligencia Artificial</h1>
        <h2 className="text-renner text-white mb-8">ya está aquí</h2>
      </div>

      <div className="splash-footer fade-in delay-2">
        <p className="text-renner" style={{ fontSize: '0.9rem', marginBottom: '8px' }}>powered by</p>
        <img src="/Logo_TDM_Blanco.png" alt="Test Drive Mx" className="splash-logo" />
      </div>
    </div>
  );
}
