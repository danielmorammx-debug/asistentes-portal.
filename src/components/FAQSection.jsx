import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQSection({ faqs, type }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const gradientClass = type === 'medico' ? 'text-gradient-med' : 'text-gradient-auto';

  return (
    <div className="faq-section fade-in delay-2">
      <h3 className="faq-heading">
        Preguntas Frecuentes <span className={`text-gradient ${gradientClass}`}>& Respuestas</span>
      </h3>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item glass-panel">
            <div 
              className="faq-question" 
              onClick={() => toggleFaq(index)}
            >
              <h4>{faq.question}</h4>
              {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            {openIndex === index && (
              <div className="faq-answer fade-in">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
