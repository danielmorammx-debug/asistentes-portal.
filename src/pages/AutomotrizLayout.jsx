import React from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import { ArrowLeft, CarFront, MessageSquare } from 'lucide-react';
import FAQSection from '../components/FAQSection';
import ContactFooter from '../components/ContactFooter';
import PoweredBy from '../components/PoweredBy';
import VapiWidget from '../components/VapiWidget';
import AutomotrizSimulator from '../components/AutomotrizSimulator';

const automotrizFaqs = [
  {
    question: "¿Para qué sirve el Simulador Operativo?",
    answer: "Este simulador te permite vivir la experiencia de cómo el Asistente Mariana recibe a un cliente, perfila el tipo de vehículo y gestiona una cita de servicio. Además, verás una simulación de cómo los leads llegarían directamente a tu WhatsApp."
  },
  {
    question: "¿Para qué sirve el Consultor Técnico (MARIANA)?",
    answer: "Es un asistente especializado diseñado para gerentes y directores. Puedes hacerle cualquier pregunta técnica, sobre procesos de implementación, o dudas sobre cómo integrar la IA en tu agencia automotriz."
  },
  {
    question: "¿Cómo funciona la Atención Telefónica 24/7?",
    answer: "Mariana responde llamadas en fines de semana, días festivos o cuando los asesores están ocupados. Lo hace con una voz humana, elegante y profesional, perfilando al cliente sin inventar información."
  },
  {
    question: "¿Qué es el Agendamiento Inteligente en el Taller?",
    answer: "Mariana se conecta en tiempo real a tu CRM (como Salesforce). Si el horario pedido está ocupado, ofrece proactivamente alternativas según las reglas y capacidad que defina el gerente de servicio."
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
    answer: "En el momento que el cliente agenda un servicio, recibe una confirmación premium por WhatsApp. Por esta misma vía, Mariana puede solicitar datos previos como el número de serie (VIN) o kilometraje."
  },
  {
    question: "¿Cómo funciona el Sistema Anti-Ausentismo?",
    answer: "Mariana envía recordatorios automáticos por WhatsApp (ej. 24 horas y 2 horas antes de la cita) personalizados según los protocolos de postventa para evitar rampas vacías en el taller."
  },
  {
    question: "¿Qué pasa si un cliente cancela su cita?",
    answer: "Mariana libera el espacio en el calendario de inmediato. Además, puede reprogramar la cita con empatía si la agencia tuvo un imprevisto (ej. una refacción no llegó)."
  },
  {
    question: "¿Qué es el Resumen Matutino o Briefing?",
    answer: "A primera hora de la mañana, Mariana envía un mensaje de WhatsApp a los gerentes. Al de Servicio le desglosa los ingresos del día y al de Ventas la lista de Leads generados la noche anterior."
  }
];

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
    <div className="layout-container fade-in">
      <header className="layout-header">
        <button className="back-button" onClick={handleBack}>
          <ArrowLeft size={20} />
          Volver
        </button>
        <h1 className="vertical-title text-gradient text-gradient-auto">Sector Automotriz</h1>
        <div style={{width: 80}}></div>
      </header>

      <Routes>
        <Route path="/" element={
          <>
            <div className="actions-grid delay-1 fade-in">
              <div 
                className="action-card glass-panel auto-card"
                onClick={() => navigate('/automotriz/simulador')}
              >
                <CarFront size={48} className="action-icon auto-icon" />
                <h3 className="action-title">Simulador Operativo</h3>
                <p className="action-desc">
                  Prueba la experiencia de recepción, agendamiento y visualiza cómo llegarían los leads a tu WhatsApp.
                </p>
              </div>

              <div 
                className="action-card glass-panel auto-card"
                onClick={() => navigate('/automotriz/consultor')}
              >
                <MessageSquare size={48} className="action-icon auto-icon" />
                <h3 className="action-title">Consultor Técnico</h3>
                <p className="action-desc">
                  Habla con MARIANA para resolver dudas técnicas y de implementación para tu agencia.
                </p>
              </div>
            </div>

            <FAQSection faqs={automotrizFaqs} type="automotriz" />
            <PoweredBy />
            <ContactFooter />
          </>
        } />
        <Route path="/simulador" element={
          <div className="fade-in" style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h2 className="text-2xl mb-8">Simulador Operativo (MARIANA)</h2>
            
            <AutomotrizSimulator />

            <div style={{ marginTop: '60px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h3 className="text-xl mb-4 text-center">Haz la prueba ahora mismo de hablar con Mariana como si fueras un cliente</h3>
              <VapiWidget 
                assistantName="Mariana (Demo)" 
                assistantType="Simulador" 
                assistantId="a8c8e1f6-32fd-4d91-8880-f7a070e0d1fe"
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
              MARIANA está lista para responder tus preguntas técnicas y de integración.
            </p>
            <VapiWidget 
              assistantName="Mariana Corporativa" 
              assistantType="Consultor Técnico" 
              assistantId="0b52944f-e62b-4c1c-9c70-d664413f6e5f"
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
