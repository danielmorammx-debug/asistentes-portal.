import React from 'react';
import { Mail, Phone } from 'lucide-react';

export default function ContactFooter() {
  return (
    <footer className="contact-footer glass-panel fade-in delay-3">
      <div className="contact-info">
        <h3 className="contact-title">¿Tienes más dudas? Contáctanos</h3>
        <div className="contact-details">
          <div className="contact-item">
            <Mail size={20} className="contact-icon" />
            <span>[Correo de contacto]</span>
          </div>
          <div className="contact-item">
            <Phone size={20} className="contact-icon" />
            <span>[Teléfono de contacto]</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
