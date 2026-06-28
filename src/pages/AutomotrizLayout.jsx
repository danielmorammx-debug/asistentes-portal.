import React, { useState } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import ContactFooter from '../components/ContactFooter';
import PoweredBy from '../components/PoweredBy';
import AutomotrizSimulator from '../components/AutomotrizSimulator';
import VapiWidget from '../components/VapiWidget'; // Assuming we'll use this inside the red button

const automotrizFaqs = [
  {
    question: "¿Para qué sirve el Simulador Operativo?",
    answer: "Este simulador te permite vivir la experiencia de cómo el Asistente Mariana recibe a un cliente, perfila el tipo de vehículo y gestiona una cita de servicio. Además, verás una simulación de cómo llegan las confirmaciones al cliente por medio de WhatsApp."
  },
  {
    question: "¿Para qué sirve el Consultor Técnico Mariana?",
    answer: "Es un asistente especializado diseñado para gerentes y directores. Puedes hacerle cualquier pregunta técnica, sobre procesos de implementación, o dudas sobre cómo integrar la IA en tu agencia automotriz."
  },
  {
    question: "¿Cómo funciona la Atención Telefónica 24/7?",
    answer: "Mariana responde llamadas en fines de semana, días festivos o cuando los asesores están ocupados. Lo hace con una voz humana, elegante y profesional, perfilando al cliente sin inventar información."
  },
  {
    question: "¿Qué es el Agendamiento Inteligente en el Taller?",
    answer: "Mariana se conecta en tiempo real a tu CRM. Si el horario pedido está ocupado, ofrece proactivamente alternativas según las reglas y capacidad que defina el gerente de servicio."
  },
  {
    question: "¿Cómo ayuda Mariana con la consulta de inventario?",
    answer: "Si un cliente pregunta por un auto agotado, Mariana ejecuta una 'Estrategia de Pivote': ofrece de inmediato una alternativa similar o superior que sí esté en piso, evitando perder la venta."
  },
  {
    question: "¿Se integra automáticamente al CRM?",
    answer: "Sí. Cada prospecto atendido es registrado automáticamente como un 'Lead' en el CRM de la agencia con toda la información perfilada, construyendo la base de datos sin errores ni duplicados."
  },
  {
    question: "¿Envía confirmaciones por WhatsApp?",
    answer: "En el momento que el cliente agenda un servicio, recibe una confirmación premium por WhatsApp. Por esta misma vía, Mariana puede solicitar datos previos como el VIN."
  },
  {
    question: "¿Cómo funciona el Sistema Anti-Ausentismo?",
    answer: "Mariana envía recordatorios automáticos por WhatsApp personalizados según los protocolos de postventa para evitar rampas vacías en el taller."
  },
  {
    question: "¿Qué pasa si un cliente cancela su cita?",
    answer: "Mariana libera el espacio en el calendario de inmediato y puede reprogramar la cita con empatía."
  },
  {
    question: "¿Qué es el Resumen Matutino o Briefing?",
    answer: "A primera hora de la mañana, Mariana envía un mensaje de WhatsApp a los gerentes con un desglose de los ingresos del día y la lista de Leads generados la noche anterior."
  }
];

function FAQBlock() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-container-custom">
      {automotrizFaqs.map((faq, idx) => (
        <div key={idx} className="faq-item-custom">
          <div 
            className="faq-question-custom" 
            onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
          >
            <h4 className="text-renner" style={{ fontWeight: 600 }}>{faq.question}</h4>
            {openIndex === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          {openIndex === idx && (
            <div className="faq-answer-custom text-renner" style={{ fontSize: '1.1rem' }}>
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const CustomFooter = () => {
  const { isActive, isConnecting, toggleCall } = useVapiCall(VAPI_PUBLIC_KEY);
  const MARCO_ASSISTANT_ID = "951561ae-d96c-493d-9677-5e029bef24ad";
  
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '80px', marginBottom: '40px' }}>
      <h3 className="text-renner text-white" style={{ fontSize: '1.2rem', letterSpacing: '2px', marginBottom: '16px' }}>CONTACTO</h3>
      <p style={{ textAlign: 'center', maxWidth: '650px', fontSize: '1rem', color: '#e0e0e0', fontStyle: 'italic', marginBottom: '40px', lineHeight: 1.5 }}>
        ¿Te interesa alguno de nuestros modelos, buscas llevar tus ideas al siguiente nivel o requieres soporte en un rubro diferente? <br />
        Contacta hoy mismo a <span className="text-halaney text-white" style={{fontSize: '1.8rem'}}>Marco</span>, nuestro agente experto, y comencemos a diseñar la solución que tu proyecto necesita.
      </p>
      
      <div className="marco-avatar-container" onClick={() => toggleCall(MARCO_ASSISTANT_ID)} style={{ cursor: 'pointer', background: isActive ? 'rgba(255, 68, 68, 0.4)' : isConnecting ? 'rgba(82, 225, 157, 0.4)' : 'var(--glass-bg-dark)' }}>
        <img src="/Marco_Avatar.png" alt="Marco" className="marco-avatar-img" style={{ opacity: isActive ? 0.7 : 1, transform: isActive ? 'scale(1.05)' : 'scale(1)' }} />
        <span className="text-halaney marco-shadow" style={{ position: 'absolute', bottom: '-20px', color: '#f5a6f9', fontSize: '3.5rem' }}>
          Marco
        </span>
      </div>

      <div style={{ marginTop: '80px', textAlign: 'center' }}>
        <p className="text-renner text-white" style={{ fontSize: '0.9rem', marginBottom: '8px' }}>powered by</p>
        <img src="/Logo_TDM_Blanco.png" alt="Test Drive Mx" style={{ height: '50px', objectFit: 'contain' }} />
        <p className="text-white" style={{ fontSize: '0.85rem', marginTop: '24px', fontWeight: 600 }}>2026 © Test Drive Mx</p>
        <p className="text-white" style={{ fontSize: '0.85rem' }}>Todos los derechos reservados</p>
      </div>
    </div>
  );
};

const VAPI_PUBLIC_KEY = "2b6e0014-709a-4af2-8612-27bfa5ca8d1a";
const MARIANA_ASSISTANT_ID = "a8c8e1f6-32fd-4d91-8880-f7a070e0d1fe";
// Usamos el ID de Mariana - Corporativa para el consultor técnico.
const MARIANA_TECNICO_ID = "0b52944f-e62b-4c1c-9c70-d664413f6e5f";

import { useVapiCall } from '../hooks/useVapiCall';
import { Square } from 'lucide-react';

function SimuladorView() {
  const { isActive, isConnecting, toggleCall } = useVapiCall(VAPI_PUBLIC_KEY);

  const handleWhatsApp = () => {
    // Abrir WhatsApp con el número de Test Drive MX.
    window.open('https://wa.me/529989203237?text=Hola%20Mariana,%20quiero%20información%20sobre%20Polestar', '_blank');
  };

  return (
    <div className="fade-in" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px', alignSelf: 'flex-start' }}>
        <h2 className="text-renner text-white" style={{ fontSize: '2rem' }}>Simulador Operativo</h2>
        <span className="text-halaney text-golden title-shadow" style={{ fontSize: '3.5rem' }}>Mariana</span>
      </div>

      <AutomotrizSimulator />

      <h3 className="text-renner text-white" style={{ fontSize: '1.8rem', textAlign: 'center', margin: '60px 0 40px', maxWidth: '600px', lineHeight: 1.4 }}>
        Haz la prueba ahora mismo de hablar o chatear con <span className="text-halaney text-golden title-shadow" style={{ fontSize: '3rem', verticalAlign: 'middle' }}>Mariana</span> como si fueras un cliente.
      </h3>

      <div className="prueba-panel-custom">
        <img src="/Mariana_Asistente.png" alt="Prueba Mariana" className="prueba-img" />
        
        <div className="prueba-buttons-container">
          <div className="prueba-btn-wrapper" onClick={() => toggleCall(MARIANA_ASSISTANT_ID)} style={{ cursor: 'pointer' }}>
            <div className={`circle-bisel-wrapper ${isActive ? 'active-call' : ''}`}>
              <div className="red-circle-btn" style={{ backgroundColor: isActive ? '#ff4b2b' : '' }}>
                {isActive ? <Square size={40} color="white" /> : <Phone size={50} color="white" />}
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <p className="text-white" style={{ fontSize: '1.4rem', fontWeight: 600 }}>
                {isConnecting ? 'Conectando...' : isActive ? 'Finalizar' : 'Hablar con'}
              </p>
              <p className="text-halaney text-golden title-shadow" style={{ fontSize: '2.5rem', marginTop: '12px' }}>Mariana</p>
            </div>
          </div>

          <div className="prueba-btn-wrapper" onClick={handleWhatsApp} style={{ cursor: 'pointer' }}>
            <div className="circle-bisel-wrapper">
              <div className="green-circle-btn">
                <MessageCircle size={50} color="white" />
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <p className="text-white" style={{ fontSize: '1.4rem', fontWeight: 600 }}>Chatea con</p>
              <p className="text-halaney text-golden title-shadow" style={{ fontSize: '2.5rem', marginTop: '12px' }}>Mariana</p>
            </div>
          </div>
        </div>

        <p style={{ fontSize: '0.85rem', textAlign: 'center', color: '#a0a0a0', fontStyle: 'italic', marginTop: '30px', padding: '0 40px', lineHeight: 1.5 }}>
          <b>Nota de privacidad:</b> Este entorno operativo es una simulacin con fines demostrativos.
        </p>
      </div>

      <CustomFooter />
    </div>
  );
}

function ConsultorView() {
  const { isActive, isConnecting, toggleCall } = useVapiCall(VAPI_PUBLIC_KEY);

  return (
    <div className="fade-in" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px', alignSelf: 'flex-start' }}>
        <h2 className="text-renner text-white" style={{ fontSize: '2rem' }}>Consultor Técnico</h2>
        <span className="text-halaney text-golden title-shadow" style={{ fontSize: '3.5rem' }}>Mariana</span>
      </div>
      
      <div className="prueba-panel-custom">
        <img src="/Mariana_Tecnico.png" alt="Prueba Consultor" className="prueba-img" />
        
        <div className="prueba-buttons-container">
          <div className="prueba-btn-wrapper" onClick={() => toggleCall(MARIANA_TECNICO_ID)} style={{ cursor: 'pointer' }}>
            <div className={`circle-bisel-wrapper ${isActive ? 'active-call' : ''}`}>
              <div className="red-circle-btn" style={{ backgroundColor: isActive ? '#ff4b2b' : '' }}>
                {isActive ? <Square size={40} color="white" /> : <Phone size={50} color="white" />}
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <p className="text-white" style={{ fontSize: '1.4rem', fontWeight: 600 }}>
                {isConnecting ? 'Conectando...' : isActive ? 'Finalizar' : 'Hablar con'}
              </p>
              <p className="text-halaney text-golden title-shadow" style={{ fontSize: '2.5rem', marginTop: '12px' }}>Mariana</p>
            </div>
          </div>
        </div>

        <p style={{ fontSize: '0.85rem', textAlign: 'center', color: '#a0a0a0', fontStyle: 'italic', marginTop: '30px', padding: '0 40px', lineHeight: 1.5 }}>
          <b>Nota de privacidad:</b> Este entorno operativo es una simulacin con fines demostrativos.
        </p>
      </div>

      <CustomFooter />
    </div>
  );
}

export default function AutomotrizLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.pathname === '/automotriz') {
      navigate('/');
    } else {
      navigate('/automotriz');
    }
  };

  return (
    <div className="layout-container fade-in" style={{ backgroundColor: '#1E2C2C', minHeight: '100vh', padding: '0', position: 'relative' }}>
      
      {/* HEADER */}
      <header className="layout-header-custom" style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center' }}>
        <button onClick={handleBack} style={{ background: 'transparent', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', border: 'none' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-renner text-white" style={{ fontSize: '2.5rem', marginLeft: '20px' }}>
          Sector Automotriz
        </h1>
      </header>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Routes>
          {/* BLOQUE 2: MEN PRESENTACIN */}
          <Route path="/" element={
            <>
              <div className="cards-grid-custom fade-in delay-1">
                <div className="card-type-b" onClick={() => navigate('/automotriz/simulador')}>
                  <div className="card-img-wrapper">
                    <img src="/Mariana_Asistente.png" alt="Simulador Operativo" className="card-img" />
                    <div className="card-content">
                      <h2 className="text-halaney text-golden title-shadow" style={{ fontSize: '4rem', margin: '-10px 0', lineHeight: 0.8 }}>Mariana</h2>
                      <h3 className="text-renner text-white" style={{ fontSize: '1.6rem', marginBottom: '8px', marginTop: '10px' }}>Simulador Operativo</h3>
                      <p className="text-white" style={{ fontSize: '0.9rem', lineHeight: 1.4 }}>
                        Experimenta el agendamiento inteligente 24/7 y la gestin automatizada de clientes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card-type-b" onClick={() => navigate('/automotriz/consultor')}>
                  <div className="card-img-wrapper">
                    <img src="/Mariana_Tecnico.png" alt="Consultor Técnico" className="card-img" />
                    <div className="card-content">
                      <h3 className="text-renner text-white" style={{ fontSize: '1.6rem', marginBottom: '8px', marginTop: '30px' }}>Consultor Técnico</h3>
                      <p className="text-white" style={{ fontSize: '0.9rem', lineHeight: 1.4 }}>
                        Habla con <span className="text-halaney text-golden title-shadow" style={{ fontSize: '1.4rem' }}>Mariana</span> para resolver dudas sobre la implementación en tu agencia.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-renner text-white" style={{ fontSize: '2.2rem', margin: '80px 0 40px', textAlign: 'center' }}>Preguntas Frecuentes & Respuestas</h2>
              <FAQBlock />

              <CustomFooter />
            </>
          } />

          <Route path="/simulador" element={<SimuladorView />} />
          <Route path="/consultor" element={<ConsultorView />} />
        </Routes>
      </div>
    </div>
  );
}
