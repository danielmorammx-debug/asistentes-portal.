import React from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import { ArrowLeft, Stethoscope, MessageSquare } from 'lucide-react';
import FAQSection from '../components/FAQSection';
import ContactFooter from '../components/ContactFooter';
import PoweredBy from '../components/PoweredBy';
import VapiWidget from '../components/VapiWidget';
import MedicoSimulator from '../components/MedicoSimulator';

const medicoFaqs = [
  {
    question: "¿Para qué sirve el Simulador Operativo?",
    answer: "Muestra cómo el Asistente Merit atiende a un paciente, programa una cita en tu calendario y envía los recordatorios por WhatsApp. Incluye la simulación de notificación de leads."
  },
  {
    question: "¿Para qué sirve el Consultor Técnico (MERIT)?",
    answer: "Un espacio diseñado para médicos y administradores de clínicas. Aquí puedes preguntar cómo se implementa Merit, los costos, tiempos y requisitos técnicos."
  },
  {
    question: "¿Merit da consultas o consejos médicos por teléfono?",
    answer: "No. Merit es una asistente administrativa e inteligente, no un profesional de la salud. Está programada estrictamente para no analizar padecimientos, ni ofrecer consejos o recomendaciones médicas. Su función exclusiva es perfilar al paciente, capturar sus datos clave y gestionar su cita de manera eficiente."
  },
  {
    question: "¿Qué pasa si un paciente llama de madrugada, en domingo o en un día festivo?",
    answer: "Merit trabaja 24/7. Atiende el 100% de las llamadas a cualquier hora con una voz empática y completamente natural. Asegura que su clínica nunca pierda un prospecto por falta de atención telefónica, capturando los datos y agendando la consulta para sus horarios disponibles."
  },
  {
    question: "¿Cómo sabe Merit en qué horarios agendar a los pacientes?",
    answer: "Merit se sincroniza en tiempo real con su Google Calendar. Usted define previamente sus días de consulta, horarios de atención y la duración exacta de cada cita. Merit jamás agendará una cita fuera de sus parámetros y, si un horario está ocupado, ofrecerá alternativas proactivamente."
  },
  {
    question: "¿Qué sucede con la información de los pacientes que llaman?",
    answer: "Merit funciona como su propio Mini-CRM. Cada vez que agenda una cita, alimenta una base de datos privada. Si el paciente es nuevo, le crea un expediente automático; si es recurrente, actualiza su historial con la nueva fecha."
  },
  {
    question: "¿Cómo me ayuda Merit a reducir el ausentismo de pacientes?",
    answer: "A través de un Sistema Anti-Ausentismo automatizado. En el momento en que se agenda la cita, el paciente recibe una confirmación inmediata por WhatsApp. Posteriormente, Merit envía recordatorios cronometrados (ejemplo: 24h, 2h y 15m antes)."
  },
  {
    question: "¿Qué pasa si un paciente cancela su cita?",
    answer: "Si un paciente se comunica para cancelar, Merit hace el trabajo por usted: libera inmediatamente el espacio en su calendario y le envía a usted una notificación directa a su WhatsApp personal para que esté enterado en tiempo real."
  },
  {
    question: "¿Qué ocurre si la agenda está llena y se libera un espacio?",
    answer: "Merit cuenta con una Lista de Espera Inteligente. Si detecta que un paciente canceló y dejó un espacio vacío, envía de inmediato un mensaje de WhatsApp a los siguientes tres pacientes formados en la lista de espera para ofrecerles el lugar. El objetivo es garantizar cero espacios perdidos."
  },
  {
    question: "¿Qué pasa si yo, como doctor, tengo una emergencia y necesito cancelar mis citas?",
    answer: "Entendemos que los imprevistos suceden. Si usted tiene una emergencia médica o un compromiso de última hora, basta con que le envíe un mensaje a Merit indicándole la situación. Ella se encargará de comunicarse automáticamente con los pacientes afectados para informarles y reagendar sus citas lo antes posible."
  },
  {
    question: "¿Cómo me mantengo al tanto de mis consultas del día?",
    answer: "Todos los días, a la hora que usted elija (por ejemplo, a las 7:00 a.m.), Merit le enviará un 'Briefing Matutino' a su WhatsApp personal. Este mensaje le dará los buenos días e incluirá la lista desglosada de todos los pacientes que atenderá en su jornada."
  }
];

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
    <div className="layout-container fade-in">
      <header className="layout-header">
        <button className="back-button" onClick={handleBack}>
          <ArrowLeft size={20} />
          Volver
        </button>
        <h1 className="vertical-title text-gradient text-gradient-med">Sector Médico</h1>
        <div style={{width: 80}}></div>
      </header>

      <Routes>
        <Route path="/" element={
          <>
            <div className="actions-grid delay-1 fade-in">
              <div 
                className="action-card glass-panel med-card"
                onClick={() => navigate('/medico/simulador')}
              >
                <Stethoscope size={48} className="action-icon med-icon" />
                <h3 className="action-title">Simulador Operativo</h3>
                <p className="action-desc">
                  Experimenta el agendamiento inteligente 24/7 y la gestión automatizada de pacientes.
                </p>
              </div>

              <div 
                className="action-card glass-panel med-card"
                onClick={() => navigate('/medico/consultor')}
              >
                <MessageSquare size={48} className="action-icon med-icon" />
                <h3 className="action-title">Consultor Técnico</h3>
                <p className="action-desc">
                  Habla con MERIT para resolver dudas sobre la implementación en tu consultorio.
                </p>
              </div>
            </div>

            <FAQSection faqs={medicoFaqs} type="medico" />
            <PoweredBy />
            <ContactFooter />
          </>
        } />
        <Route path="/simulador" element={
          <div className="fade-in" style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h2 className="text-2xl mb-8">Simulador Operativo (MERIT)</h2>
            
            <MedicoSimulator />

            <div style={{ marginTop: '60px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h3 className="text-xl mb-4 text-center">Haz la prueba ahora mismo de hablar con Merit como si fueras un paciente</h3>
              <VapiWidget 
                assistantName="Merit (Demo)" 
                assistantType="Simulador" 
                assistantId="ce61a543-e6a1-4a38-af00-bd1295d3eed4"
                publicKey="2b6e0014-709a-4af2-8612-27bfa5ca8d1a"
              />
            </div>

            <PoweredBy />
            <ContactFooter />
          </div>
        } />
        <Route path="/consultor" element={
          <div className="fade-in" style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h2 className="text-2xl mb-4">Consultor Técnico</h2>
            <p className="text-secondary text-center max-w-2xl mb-8">
              MERIT está lista para responder tus preguntas técnicas, de integración y costos.
            </p>
            <VapiWidget 
              assistantName="Merit Corporativa" 
              assistantType="Consultor Técnico" 
              assistantId="181b8c2b-e653-4d3f-81b5-8e2c1f875c5c"
              publicKey="2b6e0014-709a-4af2-8612-27bfa5ca8d1a"
            />
            
            <PoweredBy />
            <ContactFooter />
          </div>
        } />
      </Routes>
    </div>
  );
}
