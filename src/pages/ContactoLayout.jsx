import React from 'react';
import VapiWidget from '../components/VapiWidget';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ContactoLayout() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', padding: '40px', position: 'relative' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'transparent', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', border: 'none', marginBottom: '40px' }}>
        <ArrowLeft size={24} />
      </button>

      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 className="text-halaney text-white" style={{ fontSize: '4rem', marginBottom: '20px' }}>Marco</h1>
        <p className="text-renner text-white" style={{ fontSize: '1.2rem', marginBottom: '40px', color: '#ccc' }}>
          Agente Experto Test Drive MX
        </p>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <VapiWidget 
            assistantName="Marco"
            assistantType="Experto Comercial"
            assistantId="951561ae-d96c-493d-9677-5e029bef24ad"
            publicKey="2b6e0014-709a-4af2-8612-27bfa5ca8d1a"
          />
        </div>
      </div>
    </div>
  );
}
