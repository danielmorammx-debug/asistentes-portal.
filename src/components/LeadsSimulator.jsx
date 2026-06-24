import React, { useState, useEffect } from 'react';
import { MessageCircle, User } from 'lucide-react';

export default function LeadsSimulator({ active }) {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    if (!active) return;
    
    const fakeLeads = [
      { name: "Carlos R.", intent: "Agendó Cita (Servicio)", time: "Justo ahora" },
      { name: "Ana P.", intent: "Pidió Cotización", time: "Hace 2 min" },
      { name: "Luis M.", intent: "Agendó Cita (Revisión)", time: "Hace 5 min" }
    ];

    let timer1 = setTimeout(() => setLeads([fakeLeads[0]]), 2000);
    let timer2 = setTimeout(() => setLeads([fakeLeads[0], fakeLeads[1]]), 5000);
    let timer3 = setTimeout(() => setLeads(fakeLeads), 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="leads-sim-container">
      <div className="leads-header">
        <MessageCircle size={20} color="#25D366" />
        <h4>Notificaciones (WhatsApp)</h4>
      </div>
      <div className="leads-list">
        {leads.map((lead, i) => (
          <div key={i} className="lead-item fade-in glass-panel">
            <div className="lead-avatar"><User size={20} /></div>
            <div className="lead-info">
              <strong>{lead.name}</strong>
              <span>{lead.intent}</span>
            </div>
            <div className="lead-time">{lead.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
