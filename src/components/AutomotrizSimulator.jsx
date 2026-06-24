import React, { useState, useEffect } from 'react';
import CalendarSimulator from './CalendarSimulator';
import ChatSimulator from './ChatSimulator';

const BASE_APPOINTMENTS = [
  { dayIdx: 0, timeIdx: 0, state: 'blue' }, // Lun 09:00
  { dayIdx: 0, timeIdx: 3, state: 'blue' }, // Lun 12:00
  { dayIdx: 1, timeIdx: 2, state: 'blue' }, // Mar 11:00
  { dayIdx: 2, timeIdx: 4, state: 'blue' }, // Mié 16:00
  { dayIdx: 3, timeIdx: 1, state: 'blue' }, // Jue 10:00 (Ocupada)
  { dayIdx: 3, timeIdx: 5, state: 'blue' }, // Jue 17:00
  { dayIdx: 4, timeIdx: 0, state: 'blue' }, // Vie 09:00
  { dayIdx: 4, timeIdx: 2, state: 'blue' }, // Vie 11:00
];

export default function AutomotrizSimulator() {
  const [appointments, setAppointments] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let isCancelled = false;
    let timeouts = [];

    const delay = (ms) => new Promise(resolve => {
      const t = setTimeout(resolve, ms);
      timeouts.push(t);
    });

    const runLoop = async () => {
      while (!isCancelled) {
        // Reset
        setAppointments([]);
        setMessages([]);
        await delay(1000);

        // 1. Aparecen 8 citas
        let currentApts = [];
        for (let apt of BASE_APPOINTMENTS) {
          if (isCancelled) return;
          currentApts = [...currentApts, apt];
          setAppointments(currentApts);
          await delay(700); 
        }

        await delay(2000);
        if (isCancelled) return;

        // 2. Mariana saluda
        let currentMsgs = [{
          sender: 'bot',
          time: '14:20 PM',
          text: `Hola soy Mariana, asistente virtual de la agencia Vallejo, ¿en qué puedo ayudarle el día de hoy?`
        }];
        setMessages([...currentMsgs]);
        await delay(4000);
        if (isCancelled) return;

        // 3. Cliente pide cita ocupada (Jueves 10:00 AM)
        currentMsgs.push({
          sender: 'user',
          time: '14:22 PM',
          text: `Hola necesito una cita de servicio de los 20 mil kilómetros para mi vehículo, para el dia jueves a las 10:00 am`
        });
        setMessages([...currentMsgs]);
        await delay(3000);
        if (isCancelled) return;

        // 4. Mariana revisa disponibilidad
        currentMsgs.push({
          sender: 'bot',
          time: '14:22 PM',
          text: `Con todo gusto, deme un momento le consulto la disponibilidad.`
        });
        setMessages([...currentMsgs]);
        await delay(4500);
        if (isCancelled) return;

        // 5. Mariana ofrece alternativa (Jueves 12:00 PM)
        currentMsgs.push({
          sender: 'bot',
          time: '14:23 PM',
          text: `Lo lamento, ese horario ya está ocupado, pero el horario de las 12:00 PM está disponible. ¿Le gustaría que le agende la cita para ese horario?`
        });
        setMessages([...currentMsgs]);
        await delay(4000);
        if (isCancelled) return;

        // 6. Cliente acepta
        currentMsgs.push({
          sender: 'user',
          time: '14:25 PM',
          text: `Sí por favor`
        });
        setMessages([...currentMsgs]);
        await delay(2500);
        if (isCancelled) return;

        // 7. Calendario se pone verde en la nueva hora
        setAppointments(prev => [...prev, { dayIdx: 3, timeIdx: 3, state: 'green' }]); // Jueves 12:00

        // 8. Mariana pide datos finales
        currentMsgs.push({
          sender: 'bot',
          time: '14:25 PM',
          text: `Para terminar de agendar su cita voy a necesitar que me dé los siguientes datos personales y del vehículo...`
        });
        setMessages([...currentMsgs]);
        
        await delay(6000);
      }
    };

    runLoop();

    return () => {
      isCancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
      <CalendarSimulator appointments={appointments} brandColor="var(--brand-auto-light)" />
      <ChatSimulator messages={messages} />
    </div>
  );
}
