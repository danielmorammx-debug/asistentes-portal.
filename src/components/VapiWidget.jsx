import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square } from 'lucide-react';
import Vapi from '@vapi-ai/web';

export default function VapiWidget({ assistantName, assistantType, assistantId, publicKey }) {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const vapiRef = useRef(null);

  useEffect(() => {
    // Inicializar Vapi
    const VapiConstructor = Vapi.default || Vapi;
    vapiRef.current = new VapiConstructor(publicKey);

    vapiRef.current.on('call-start', () => {
      setIsActive(true);
      setIsConnecting(false);
    });

    vapiRef.current.on('call-end', () => {
      setIsActive(false);
      setIsConnecting(false);
    });

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
        vapiRef.current = null;
      }
    };
  }, [publicKey]);

  const toggleCall = async () => {
    if (isActive) {
      vapiRef.current.stop();
    } else {
      setIsConnecting(true);
      try {
        await vapiRef.current.start(assistantId);
      } catch (error) {
        console.error("Error al iniciar llamada Vapi:", error);
        setIsConnecting(false);
      }
    }
  };

  return (
    <div className="vapi-widget glass-panel fade-in">
      <div className="vapi-header">
        <div className={`vapi-status-dot ${isActive ? 'active pulse-anim' : ''}`}></div>
        <h3>{assistantName}</h3>
        <span className="cal-badge">{assistantType}</span>
      </div>
      
      <div className="vapi-body">
        <div className={`vapi-avatar ${isActive ? 'speaking' : ''}`}>
          <Mic size={40} color={isActive ? "white" : "var(--text-secondary)"} />
        </div>
        <p className="vapi-status-text">
          {isConnecting ? "Conectando..." : isActive ? "Conectado. Empieza a hablar..." : "Haz clic para iniciar la simulación"}
        </p>
      </div>

      <div className="vapi-footer">
        <button 
          className={`vapi-btn ${isActive ? 'btn-stop' : 'btn-start'}`}
          onClick={toggleCall}
          disabled={isConnecting}
        >
          {isActive ? <Square size={20} /> : <Mic size={20} />}
          {isActive ? 'Finalizar Llamada' : isConnecting ? 'Conectando...' : 'Hablar con Asistente'}
        </button>
      </div>
    </div>
  );
}
