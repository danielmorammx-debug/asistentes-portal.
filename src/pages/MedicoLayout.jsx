import React, { useState } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import MedicoSimulator from '../components/MedicoSimulator';

const medicoFaqs = [
  {
    question: "¿Para qué sirve el Simulador Operativo?",
    answer: "Muestra cómo el Asistente Merit atiende a un paciente, programa una cita en tu calendario y envía los recordatorios por WhatsApp. Incluye la simulación de notificación al paciente."
  },
  {
    question: "¿Para qué sirve el Consultor Técnico Merit?",
    answer: "Es un asistente especializado diseñado para gerentes y directores. Puedes hacerle cualquier pregunta técnica, sobre procesos de implementación, o dudas sobre cómo integrar la IA en tu consultorio."
  },
  {
    question: "¿Merit da consultas o consejos médicos por teléfono?",
    answer: "No. Merit es estrictamente administrativa y de agendamiento. Está programada para perfilar y derivar pacientes de acuerdo a los protocolos médicos que elijas."
  },
  {
    question: "¿Qué pasa si un paciente llama de madrugada, en domingo o en un día festivo?",
    answer: "Merit atiende la llamada en el momento de forma cálida, agenda la cita de acuerdo a la disponibilidad real y le notifica al paciente."
  },
  {
    question: "¿Cómo sabe Merit en qué horarios agendar a los pacientes?",
    answer: "Merit se sincroniza bidireccionalmente con el calendario de tu consultorio en tiempo real. Siempre sabe exactamente qué espacios hay libres."
  },
  {
    question: "¿Qué sucede con la información de los pacientes que llaman?",
    answer: "Cada prospecto es clasificado y guardado de manera automática, sin errores ni pérdida de datos."
  },
  {
    question: "¿Cómo me ayuda Merit a reducir el ausentismo de pacientes?",
    answer: "Envía recordatorios de manera automática en horarios estratégicos (por ejemplo 24 y 2 horas antes de su cita) vía WhatsApp para asegurar la asistencia."
  },
  {
    question: "¿Qué pasa si un paciente cancela su cita?",
    answer: "Merit actualiza el calendario instantáneamente para liberar el horario."
  },
  {
    question: "¿Qué ocurre si la agenda está llena y se libera un espacio?",
    answer: "Puede contactar proactivamente a pacientes en lista de espera y rellenar el espacio vacío."
  },
  {
    question: "¿Qué pasa si yo, como doctor, tengo una emergencia y necesito cancelar mis citas?",
    answer: "Con un simple comando, Merit puede contactar a todos los pacientes del día, disculparse en tu nombre, y reagendarlos para otra fecha."
  },
  {
    question: "¿Cómo me mantengo al tanto de mis consultas del día?",
    answer: "Merit envía un resumen a primera hora por WhatsApp o correo con todas las consultas del día ordenadas y con el perfil de cada paciente."
  }
];

function FAQBlock() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-container-custom-light">
      {medicoFaqs.map((faq, idx) => (
        <div key={idx} className="faq-item-custom-light">
          <div 
            className="faq-question-custom-light" 
            onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
          >
            <h4 className="text-renner" style={{ fontWeight: 600 }}>{faq.question}</h4>
            {openIndex === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          {openIndex === idx && (
            <div className="faq-answer-custom-light text-renner" style={{ fontSize: '1.1rem' }}>
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
      <h3 className="text-renner text-black" style={{ fontSize: '1.2rem', letterSpacing: '2px', marginBottom: '16px' }}>CONTACTO</h3>
      <p style={{ textAlign: 'center', maxWidth: '650px', fontSize: '1rem', color: '#333', fontStyle: 'italic', marginBottom: '40px', lineHeight: 1.5 }}>
        ¿Te interesa alguno de nuestros modelos, buscas llevar tus ideas al siguiente nivel o requieres soporte en un rubro diferente? <br />
        Contacta hoy mismo a <span className="text-halaney text-black" style={{fontSize: '1.8rem'}}>Marco</span>, nuestro agente experto, y comencemos a diseñar la solución que tu proyecto necesita.
      </p>
      
      <div className="marco-avatar-container-light" onClick={() => toggleCall(MARCO_ASSISTANT_ID)} style={{ cursor: 'pointer' }}>
        <img src="/Marco_Avatar.png" alt="Marco" className="marco-avatar-img" style={{ opacity: isActive ? 0.7 : 1, transform: isActive ? 'scale(1.05)' : 'scale(1)' }} />
        <span className="text-halaney marco-shadow" style={{ position: 'absolute', bottom: '-20px', color: isActive ? '#52e19d' : '#f5a6f9', fontSize: isActive ? '2rem' : '3.5rem' }}>
          {isActive ? 'Hablando...' : isConnecting ? 'Conectando...' : 'Marco'}
        </span>
      </div>

      <div style={{ marginTop: '80px', textAlign: 'center' }}>
        <p className="text-renner text-black" style={{ fontSize: '0.9rem', marginBottom: '8px' }}>powered by</p>
        <img src="/Logo_TDM_Negro.png" alt="Test Drive Mx" style={{ height: '50px', objectFit: 'contain' }} />
        <p className="text-black" style={{ fontSize: '0.85rem', marginTop: '24px', fontWeight: 600 }}>2026 © Test Drive Mx</p>
        <p className="text-black" style={{ fontSize: '0.85rem' }}>Todos los derechos reservados</p>
      </div>
    </div>
  );
};

const VAPI_PUBLIC_KEY = "2b6e0014-709a-4af2-8612-27bfa5ca8d1a";
const MERIT_ASSISTANT_ID = "ce61a543-e6a1-4a38-af00-bd1295d3eed4";
const MERIT_TECNICO_ID = "181b8c2b-e653-4d3f-81b5-8e2c1f875c5c";

import { useVapiCall } from '../hooks/useVapiCall';
import { Square } from 'lucide-react';

function SimuladorMedicoView() {
  const { isActive, isConnecting, toggleCall } = useVapiCall(VAPI_PUBLIC_KEY);

  const handleWhatsApp = () => {
    window.open('https://wa.me/529989203237?text=Hola%20Merit,%20quiero%20agendar%20una%20cita%20médica', '_blank');
  };

  return (
    <div className="fade-in" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px', alignSelf: 'flex-start' }}>
        <h2 className="text-renner text-black" style={{ fontSize: '2rem' }}>Simulador Operativo</h2>
        <span className="text-halaney text-green title-shadow" style={{ fontSize: '3.5rem' }}>Merit</span>
      </div>

      <div className="medico-simulator-wrapper">
        <MedicoSimulator />
      </div>

      <h3 className="text-renner text-black" style={{ fontSize: '1.8rem', textAlign: 'center', margin: '60px 0 40px', maxWidth: '600px', lineHeight: 1.4 }}>
        Haz la prueba ahora mismo de hablar o chatear con <span className="text-halaney text-green title-shadow" style={{ fontSize: '3rem', verticalAlign: 'middle' }}>Merit</span> como si fueras un paciente.
      </h3>

      <div className="prueba-panel-custom-light">
        <img src="/Merit_Asistente_App.png" alt="Prueba Merit" className="prueba-img" />
        
        <div className="prueba-buttons-container">
          <div className="prueba-btn-wrapper" onClick={() => toggleCall(MERIT_ASSISTANT_ID)} style={{ cursor: 'pointer' }}>
            <div className={`circle-bisel-wrapper-light ${isActive ? 'active-call' : ''}`}>
              <div className="red-circle-btn" style={{ backgroundColor: isActive ? '#ff4b2b' : '' }}>
                {isActive ? <Square size={40} color="white" /> : <Phone size={50} color="white" />}
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <p className="text-black" style={{ fontSize: '1.4rem', fontWeight: 600 }}>
                {isConnecting ? 'Conectando...' : isActive ? 'Finalizar' : 'Hablar con'}
              </p>
              <p className="text-halaney text-green title-shadow" style={{ fontSize: '2.5rem', marginTop: '12px' }}>Merit</p>
            </div>
          </div>

          <div className="prueba-btn-wrapper" onClick={handleWhatsApp} style={{ cursor: 'pointer' }}>
            <div className="circle-bisel-wrapper-light">
              <div className="green-circle-btn">
                <MessageCircle size={50} color="white" />
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <p className="text-black" style={{ fontSize: '1.4rem', fontWeight: 600 }}>Chatear con</p>
              <p className="text-halaney text-green title-shadow" style={{ fontSize: '2.5rem', marginTop: '12px' }}>Merit</p>
            </div>
          </div>
        </div>

        <p style={{ fontSize: '0.85rem', textAlign: 'center', color: '#5a5a5a', fontStyle: 'italic', marginTop: '30px', padding: '0 40px', lineHeight: 1.5 }}>
          <b>Nota de privacidad:</b> Este entorno operativo es una simulación con fines demostrativos.
        </p>
      </div>

      <CustomFooter />
    </div>
  );
}

function ConsultorMedicoView() {
  const { isActive, isConnecting, toggleCall } = useVapiCall(VAPI_PUBLIC_KEY);

  return (
    <div className="fade-in" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px', alignSelf: 'flex-start' }}>
        <h2 className="text-renner text-black" style={{ fontSize: '2rem' }}>Consultor Técnico</h2>
        <span className="text-halaney text-green title-shadow" style={{ fontSize: '3.5rem' }}>Merit</span>
      </div>
      
      <div className="prueba-panel-custom-light">
        <img src="/Merit_tecnico_app.png" alt="Prueba Consultor" className="prueba-img" />
        
        <div className="prueba-buttons-container">
          <div className="prueba-btn-wrapper" onClick={() => toggleCall(MERIT_TECNICO_ID)} style={{ cursor: 'pointer' }}>
            <div className={`circle-bisel-wrapper-light ${isActive ? 'active-call' : ''}`}>
              <div className="red-circle-btn" style={{ backgroundColor: isActive ? '#ff4b2b' : '' }}>
                {isActive ? <Square size={40} color="white" /> : <Phone size={50} color="white" />}
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <p className="text-black" style={{ fontSize: '1.4rem', fontWeight: 600 }}>
                {isConnecting ? 'Conectando...' : isActive ? 'Finalizar' : 'Hablar con'}
              </p>
              <p className="text-halaney text-green title-shadow" style={{ fontSize: '2.5rem', marginTop: '12px' }}>Merit</p>
            </div>
          </div>
        </div>

        <p style={{ fontSize: '0.85rem', textAlign: 'center', color: '#5a5a5a', fontStyle: 'italic', marginTop: '30px', padding: '0 40px', lineHeight: 1.5 }}>
          <b>Nota de privacidad:</b> Este entorno operativo es una simulación con fines demostrativos.
        </p>
      </div>

      <CustomFooter />
    </div>
  );
}

export default function MedicoLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.pathname === '/medico') {
      navigate('/');
    } else {
      navigate('/medico');
    }
  };

  return (
    <div className="layout-container fade-in" style={{ backgroundColor: '#a4cdfa', minHeight: '100vh', padding: '0', position: 'relative' }}>
      
      {/* HEADER */}
      <header className="layout-header-custom" style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center' }}>
        <button onClick={handleBack} style={{ background: 'transparent', color: 'black', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', border: 'none' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-renner text-black" style={{ fontSize: '2.5rem', marginLeft: '20px' }}>
          Sector Médico
        </h1>
      </header>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Routes>
          <Route path="/" element={
            <>
              <div className="cards-grid-custom fade-in delay-1">
                <div className="card-type-b-light" onClick={() => navigate('/medico/simulador')}>
                  <div className="card-img-wrapper">
                    <img src="/Merit_Asistente_App.png" alt="Simulador Operativo" className="card-img" />
                    <div className="card-content">
                      <h2 className="text-halaney text-green title-shadow" style={{ fontSize: '4rem', margin: '-10px 0', lineHeight: 0.8 }}>Merit</h2>
                      <h3 className="text-renner text-black" style={{ fontSize: '1.6rem', marginBottom: '8px', marginTop: '10px' }}>Simulador Operativo</h3>
                      <p className="text-black" style={{ fontSize: '0.9rem', lineHeight: 1.4 }}>
                        Experimenta el agendamiento inteligente 24/7 y la gestión automatizada de pacientes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card-type-b-light" onClick={() => navigate('/medico/consultor')}>
                  <div className="card-img-wrapper">
                    <img src="/Merit_tecnico_app.png" alt="Consultor Técnico" className="card-img" />
                    <div className="card-content">
                      <h3 className="text-renner text-black" style={{ fontSize: '1.6rem', marginBottom: '8px', marginTop: '30px' }}>Consultor Técnico</h3>
                      <p className="text-black" style={{ fontSize: '0.9rem', lineHeight: 1.4 }}>
                        Habla con <span className="text-halaney text-green title-shadow" style={{ fontSize: '1.4rem' }}>Merit</span> para resolver dudas sobre la implementación en tu consultorio.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-renner text-black" style={{ fontSize: '2.2rem', margin: '80px 0 40px', textAlign: 'center' }}>Preguntas Frecuentes & Respuestas</h2>
              <FAQBlock />

              <CustomFooter />
            </>
          } />

          <Route path="/simulador" element={<SimuladorMedicoView />} />
          <Route path="/consultor" element={<ConsultorMedicoView />} />
        </Routes>
      </div>
    </div>
  );
}
