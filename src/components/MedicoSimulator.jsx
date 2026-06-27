import React, { useState, useEffect } from 'react';
import CalendarSimulator from './CalendarSimulator';
import ChatSimulator from './ChatSimulator';

const BASE_APPOINTMENTS = [
  { dayIdx: 0, timeIdx: 2, state: 'blue' }, // Lunes 11:00
  { dayIdx: 1, timeIdx: 1, state: 'blue' }, // Martes 10:00
  { dayIdx: 1, timeIdx: 3, state: 'blue' }, // Martes 12:00
  { dayIdx: 2, timeIdx: 4, state: 'blue' }, // Miércoles 16:00
  // Jueves: 3 citas
  { dayIdx: 3, timeIdx: 0, state: 'blue' }, // Jueves 09:00
  { dayIdx: 3, timeIdx: 2, state: 'blue' }, // Jueves 11:00
  { dayIdx: 3, timeIdx: 5, state: 'blue' }, // Jueves 17:00
  // Viernes: 1 cita
  { dayIdx: 4, timeIdx: 1, state: 'blue' }, // Viernes 10:00
];

export default function MedicoSimulator() {
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

        // 1. Aparecen 8 citas una por una
        let currentApts = [];
        for (let apt of BASE_APPOINTMENTS) {
          if (isCancelled) return;
          currentApts = [...currentApts, apt];
          setAppointments(currentApts);
          await delay(700); // Antes 400
        }

        await delay(1500); // Antes 1000
        if (isCancelled) return;

        // 2. Resumen matutino en WhatsApp
        const resumenMsg = {
          sender: 'bot',
          time: '07:00 AM',
          text: `Buenos días Dr Rodriguez, le doy el resumen de sus citas de hoy (Jueves):\n\n- 09:00 AM - Roberto Gómez\n- 11:00 AM - María Pérez\n- 17:00 PM - Carlos Ramírez\n\n¡Excelente jornada!`
        };
        setMessages([resumenMsg]);

        await delay(6000); // Antes 4000
        if (isCancelled) return;

        // 3. Limpiar chat para el siguiente evento
        setMessages([]);
        await delay(1000);
        if (isCancelled) return;

        // 4. Cancelación (viernes se pone rojo)
        setAppointments(prev => prev.map(a => 
          (a.dayIdx === 4 && a.timeIdx === 1) ? { ...a, state: 'red' } : a
        ));
        await delay(1000);
        if (isCancelled) return;

        // 5. WhatsApp avisa cancelación
        let currentMsgs = [{
          sender: 'bot',
          time: '10:30 AM',
          text: `Hola Dr. Rodriguez, le comunico que el señor Luis Hernández ha cancelado su cita de mañana viernes a las 10:00 AM.\n\n¿Gusta que busque un paciente en la lista de espera para asignarlo a esa hora?`
        }];
        setMessages([...currentMsgs]);
        await delay(4000);
        if (isCancelled) return;

        // 6. Doctor responde
        currentMsgs.push({
          sender: 'user',
          time: '10:32 AM',
          text: `Sí por favor Merit`
        });
        setMessages([...currentMsgs]);
        await delay(1500);
        if (isCancelled) return;

        // 7. Merit confirma
        currentMsgs.push({
          sender: 'bot',
          time: '10:32 AM',
          text: `De acuerdo Dr. me pongo a ello en este momento.`
        });
        setMessages([...currentMsgs]);
        await delay(3000);
        if (isCancelled) return;

        // 8. Reagendamiento exitoso
        currentMsgs.push({
          sender: 'bot',
          time: '10:36 AM',
          text: `¡Listo! La paciente Sofía Castro ha sido reagendada para mañana viernes a las 10:00 AM en lugar de Luis Hernández.`
        });
        setMessages([...currentMsgs]);
        
        // 9. Cita cambia a azul con check
        setAppointments(prev => prev.map(a => 
          (a.dayIdx === 4 && a.timeIdx === 1) ? { ...a, state: 'blue-check' } : a
        ));

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
      <CalendarSimulator appointments={appointments} brandColor="var(--brand-med-light)" theme="light" />
      <ChatSimulator messages={messages} theme="light" />
    </div>
  );
}
