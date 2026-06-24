import React, { useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';

export default function ChatSimulator({ messages }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  return (
    <div className="leads-sim-container glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '420px', margin: '20px 0', width: '100%', maxWidth: '400px' }}>
      <div className="leads-header" style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.1)', margin: 0, borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
        <MessageCircle size={20} color="#25D366" />
        <h4 style={{ margin: 0, marginLeft: '8px' }}>WhatsApp Corporativo</h4>
      </div>
      <div className="leads-list hide-scrollbar" ref={scrollRef} style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
        {messages.map((msg, i) => (
          <div key={i} className="fade-in" style={{
            display: 'flex',
            justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            width: '100%'
          }}>
            <div style={{
              background: msg.sender === 'user' ? '#005c4b' : 'rgba(255,255,255,0.1)',
              padding: '10px 14px',
              borderRadius: '12px',
              maxWidth: '90%',
              borderBottomRightRadius: msg.sender === 'user' ? '2px' : '12px',
              borderBottomLeftRadius: msg.sender === 'bot' ? '2px' : '12px',
            }}>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.4', margin: 0, whiteSpace: 'pre-wrap' }}>{msg.text}</p>
              <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', display: 'block', textAlign: 'right', marginTop: '4px' }}>
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
