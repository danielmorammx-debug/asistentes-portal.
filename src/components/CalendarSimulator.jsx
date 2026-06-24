import React from 'react';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function CalendarSimulator({ appointments = [], brandColor = "var(--brand-med-light)" }) {
  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'];
  const times = ['09:00', '10:00', '11:00', '12:00', '16:00', '17:00'];

  return (
    <div className="calendar-sim glass-panel">
      <div className="cal-header">
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <Calendar size={24} color={brandColor} />
          <h3 className="cal-title">Agenda Interactiva</h3>
        </div>
        <span className="cal-badge">Semana Actual</span>
      </div>
      
      <div className="cal-grid">
        <div className="cal-row header-row">
          <div className="cal-cell empty"></div>
          {days.map(d => <div key={d} className="cal-cell header-cell">{d}</div>)}
        </div>
        
        {times.map((t, idx) => (
          <div key={t} className="cal-row">
            <div className="cal-cell time-cell"><Clock size={12} style={{marginRight: 4}}/> {t}</div>
            {days.map((d, didx) => {
              const apt = appointments.find(a => a.dayIdx === didx && a.timeIdx === idx);

              let cellClass = "cal-cell slot-cell ";
              let content = null;

              if (!apt) {
                cellClass += "available";
              } else {
                if (apt.state === 'blue') {
                  cellClass += "occupied fade-in";
                } else if (apt.state === 'red') {
                  cellClass += "fade-in";
                  content = <XCircle size={16} color="#ff4b2b" />;
                } else if (apt.state === 'green') {
                  cellClass += "fade-in pulse-anim";
                  content = <CheckCircle size={16} color="#25D366" />;
                } else if (apt.state === 'blue-check') {
                  cellClass += "occupied fade-in";
                  content = <CheckCircle size={16} color={brandColor} />;
                }
              }

              // inline styles for red and green states to override .occupied if needed
              const style = apt?.state === 'red' ? { background: 'rgba(255, 75, 43, 0.2)', border: '1px solid rgba(255, 75, 43, 0.5)' } : 
                            apt?.state === 'green' ? { background: 'rgba(37, 211, 102, 0.2)', border: '1px solid rgba(37, 211, 102, 0.5)' } : {};

              return (
                <div key={`${d}-${t}`} className={cellClass} style={style}>
                  {content}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
