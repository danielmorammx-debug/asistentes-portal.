import React from 'react';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function CalendarSimulator({ appointments = [], brandColor = "var(--brand-med-light)", theme = 'dark' }) {
  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'];
  const times = ['09:00', '10:00', '11:00', '12:00', '16:00', '17:00'];
  const isLight = theme === 'light';

  return (
    <div className="calendar-sim glass-panel" style={{ background: isLight ? 'rgba(255, 255, 255, 0.4)' : undefined, border: isLight ? '1px solid rgba(255, 255, 255, 0.6)' : undefined, color: isLight ? '#000' : undefined }}>
      <div className="cal-header">
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <Calendar size={24} color={isLight ? '#2ba76b' : brandColor} />
          <h3 className="cal-title" style={{ color: isLight ? '#000' : undefined }}>Agenda Interactiva</h3>
        </div>
        <span className="cal-badge" style={{ background: isLight ? 'rgba(0,0,0,0.1)' : undefined, color: isLight ? '#000' : undefined }}>Semana Actual</span>
      </div>
      
      <div className="cal-grid">
        <div className="cal-row header-row">
          <div className="cal-cell empty"></div>
          {days.map(d => <div key={d} className="cal-cell header-cell" style={{ color: isLight ? '#333' : undefined }}>{d}</div>)}
        </div>
        
        {times.map((t, idx) => (
          <div key={t} className="cal-row">
            <div className="cal-cell time-cell" style={{ color: isLight ? '#333' : undefined }}><Clock size={12} style={{marginRight: 4}}/> {t}</div>
            {days.map((d, didx) => {
              const apt = appointments.find(a => a.dayIdx === didx && a.timeIdx === idx);

              let cellClass = "cal-cell slot-cell ";
              let content = null;
              let customStyle = {};

              if (!apt) {
                cellClass += "available";
                if (isLight) {
                  customStyle = { background: 'rgba(255,255,255,0.4)', border: '1px dashed rgba(0,0,0,0.2)' };
                }
              } else {
                if (apt.state === 'blue') {
                  cellClass += "occupied fade-in";
                  if (isLight) customStyle = { background: 'rgba(0, 210, 255, 0.25)', border: '1px solid rgba(0, 210, 255, 0.4)' };
                } else if (apt.state === 'red') {
                  cellClass += "fade-in";
                  content = <XCircle size={16} color="#ff4b2b" />;
                  customStyle = { background: 'rgba(255, 75, 43, 0.2)', border: '1px solid rgba(255, 75, 43, 0.5)' };
                } else if (apt.state === 'green') {
                  cellClass += "fade-in pulse-anim";
                  content = <CheckCircle size={16} color="#25D366" />;
                  customStyle = { background: 'rgba(37, 211, 102, 0.2)', border: '1px solid rgba(37, 211, 102, 0.5)' };
                } else if (apt.state === 'blue-check') {
                  cellClass += "occupied fade-in";
                  content = <CheckCircle size={16} color={isLight ? '#2ba76b' : brandColor} />;
                  if (isLight) customStyle = { background: 'rgba(0, 210, 255, 0.25)', border: '1px solid rgba(0, 210, 255, 0.4)' };
                }
              }

              return (
                <div key={`${d}-${t}`} className={cellClass} style={customStyle}>
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
