import { useState, useEffect, useRef } from 'react';
import Vapi from '@vapi-ai/web';

export function useVapiCall(publicKey) {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const vapiRef = useRef(null);

  useEffect(() => {
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

  const toggleCall = async (assistantId) => {
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

  return { isActive, isConnecting, toggleCall };
}
