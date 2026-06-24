import React from 'react';

export default function PoweredBy() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '40px 0 20px 0' }}>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '12px' }}>powered by</p>
      <img src="/Logo 2026 TDM Blanco.png" alt="Logo 2026 TDM" style={{ height: '120px', objectFit: 'contain' }} />
    </div>
  );
}
