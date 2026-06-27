import { useState, useEffect } from 'react';
import Vapi from '@vapi-ai/web';

let vapiInstance = null;

export function useVapiCall(publicKey) {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Initialize singleton if it doesn't exist
    if (!vapiInstance) {
      const VapiConstructor = Vapi.default || Vapi;
      vapiInstance = new VapiConstructor(publicKey);
    }

    const onCallStart = () => {
      setIsActive(true);
      setIsConnecting(false);
    };

    const onCallEnd = () => {
      setIsActive(false);
      setIsConnecting(false);
    };

    vapiInstance.on('call-start', onCallStart);
    vapiInstance.on('call-end', onCallEnd);

    return () => {
      vapiInstance.off('call-start', onCallStart);
      vapiInstance.off('call-end', onCallEnd);
    };
  }, [publicKey]);

  const toggleCall = async (assistantId) => {
    if (isActive) {
      vapiInstance.stop();
    } else {
      setIsConnecting(true);
      try {
        await vapiInstance.start(assistantId);
      } catch (error) {
        console.error("Error al iniciar llamada Vapi:", error);
        setIsConnecting(false);
      }
    }
  };

  return { isActive, isConnecting, toggleCall };
}
