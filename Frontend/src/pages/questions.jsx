import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const faqs = [
  {
    question: "Как быстро я получу ответ на свой вопрос?",
    answer: "В среднем эксперты отвечают в течение 10–30 минут. Если вопрос сложный, ответ может занять до 2 часов."
  },
  {
    question: "Можно ли прикрепить файлы к вопросу?",
    answer: "Да, в ближайшем обновлении будет возможность прикреплять файлы, изображения и документы."
  },
  {
    question: "Сколько стоит консультация?",
    answer: "Все консультации на платформе бесплатны для студентов. Эксперты работают на добровольной основе или за рейтинг."
  },
  {
    question: "Можно ли выбрать конкретного эксперта?",
    answer: "Во вкладке эксперты можете выбрать подходящего."
  },
  {
    question: "Что делать, если ответ эксперта мне не понравился?",
    answer: "Вы можете написать дополнительное сообщение в чате."
  },
  {
    question: "Как стать айтишником?",
    answer: "Честно я и сам не знаю, и в будущем быть им не планирую."
  }
];

export default function Questions() {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px' }}>
      <h1 style={{ 
        fontSize: '42px', 
        textAlign: 'center', 
        marginBottom: '20px',
        color: '#1e40af' 
      }}>
        Часто задаваемые вопросы
      </h1>
      <p style={{ 
        textAlign: 'center', 
        color: '#64748b', 
        fontSize: '19px',
        marginBottom: '60px' 
      }}>
        Здесь собраны самые популярные вопросы студентов
      </p>

      <div style={{ marginBottom: '80px' }}>
        {faqs.map((faq, index) => (
          <div 
            key={index}
            style={{
              background: 'white',
              marginBottom: '12px',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
              transition: 'all 0.3s'
            }}
          >
            <button
              onClick={() => toggleAnswer(index)}
              style={{
                width: '100%',
                padding: '22px 28px',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                fontSize: '18px',
                fontWeight: '600',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              {faq.question}
              <span style={{
                fontSize: '24px',
                transition: 'transform 0.3s',
                transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0)'
              }}>
                +
              </span>
            </button>

            <div style={{
              maxHeight: openIndex === index ? '200px' : '0',
              overflow: 'hidden',
              transition: 'all 0.4s ease',
              padding: openIndex === index ? '0 28px 28px' : '0 28px'
            }}>
              <p style={{ 
                color: '#475569', 
                fontSize: '17px', 
                lineHeight: '1.7' 
              }}>
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Кнопка перехода в чат поддержки */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#64748b', marginBottom: '20px', fontSize: '18px' }}>
          Не нашли ответ на свой вопрос?
        </p>
        <button 
          onClick={() => navigate('/chat')}
          style={{
            padding: '18px 50px',
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '9999px',
            fontSize: '19px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 8px 25px rgba(37, 99, 235, 0.3)'
          }}
        >
          Перейти в чат поддержки
        </button>
      </div>
    </div>
  );
}