import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const question = location.state?.question || { title: "Без названия" };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!question) navigate('/student');
  }, [question, navigate]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: user.role === 'Student' ? 'student' : 'expert',
      name: user.name || (user.role === 'Student' ? 'Вы' : 'Эксперт'),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Имитация ответа эксперта
    if (user.role === 'Student') {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const replies = [
          "Спасибо за вопрос. Вот мой ответ...",
          "Я понял вашу проблему. Рекомендую сделать так...",
          "Хороший вопрос! Давайте разберёмся подробно.",
          "Моё мнение по этому поводу следующее..."
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];

        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          text: randomReply,
          sender: 'expert',
          name: 'Эксперт',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 1400);
    }
  };

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages, isTyping]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 15px 50px rgba(0,0,0,0.12)',
        overflow: 'hidden'
      }}>
        {/* Заголовок */}
        <div style={{
          background: '#2563eb',
          color: 'white',
          padding: '20px 30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{ margin: 0 }}>Чат по вопросу</h2>
            <p style={{ margin: '6px 0 0', opacity: 0.9 }}>{question.title}</p>
          </div>
          <button 
            onClick={() => navigate('/student')}
            style={{ padding: '10px 24px', background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: '9999px', color: 'white' }}
          >
            Закрыть чат
          </button>
        </div>

        {/* Сообщения */}
        <div 
          ref={chatRef}
          style={{ 
            height: '520px', 
            padding: '30px', 
            overflowY: 'auto',
            background: '#f8fafc',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', color: '#64748b', padding: '80px 0' }}>
              Напишите первое сообщение. Эксперт ответит вам.
            </div>
          )}

          {messages.map(msg => (
            <div key={msg.id} style={{
              display: 'flex',
              justifyContent: msg.sender === 'student' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                maxWidth: '75%',
                padding: '14px 22px',
                borderRadius: msg.sender === 'student' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                backgroundColor: msg.sender === 'student' ? '#2563eb' : '#ffffff',
                color: msg.sender === 'student' ? '#fff' : '#1f2937',
                boxShadow: '0 3px 10px rgba(0,0,0,0.08)'
              }}>
                <div style={{ fontSize: '13px', opacity: 0.75, marginBottom: '4px' }}>{msg.name}</div>
                <div>{msg.text}</div>
                <div style={{ fontSize: '11px', textAlign: 'right', marginTop: '6px', opacity: 0.7 }}>{msg.time}</div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ padding: '12px 20px', background: '#fff', borderRadius: '18px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                Эксперт печатает...
              </div>
            </div>
          )}
        </div>

        {/* Поле ввода */}
        <div style={{ padding: '20px 30px', background: 'white', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Напишите сообщение..."
              style={{
                flex: 1,
                padding: '16px 24px',
                border: '1px solid #cbd5e1',
                borderRadius: '9999px',
                fontSize: '16px'
              }}
            />
            <button 
              onClick={sendMessage}
              style={{
                padding: '0 36px',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '9999px',
                fontWeight: '600'
              }}
            >
              Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}