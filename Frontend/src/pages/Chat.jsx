import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Chat() {
  const location = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const expert = location.state?.expert;
  const initialQuestion = location.state?.question;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const chatKey = expert ? `chat_${expert.id}` : null;

  useEffect(() => {
    if (!chatKey) return;

    const saved = JSON.parse(localStorage.getItem(chatKey) || '[]');
    setMessages(saved);

    if (initialQuestion && saved.length === 0) {
      const initMsg = {
        id: Date.now(),
        text: initialQuestion.description || initialQuestion.title || "Новый вопрос",
        sender: 'student',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const newMsgs = [initMsg];
      setMessages(newMsgs);
      localStorage.setItem(chatKey, JSON.stringify(newMsgs));
    }
  }, [chatKey, initialQuestion]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const saveToStorage = (msgs) => {
    if (chatKey) localStorage.setItem(chatKey, JSON.stringify(msgs));
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !chatKey) return;

    const userMsg = {
      id: Date.now(),
      text: newMessage.trim(),
      sender: 'student',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    saveToStorage(updated);
    setNewMessage('');

    setIsTyping(true);

    try {
      const res = await axios.post('http://localhost:5000/api/ai/expert-reply', {
        expertName: expert.name,
        specialty: expert.specialty,
        userMessage: newMessage.trim()
      });

      const expertReply = {
        id: Date.now() + 1,
        text: res.data.reply,
        sender: 'expert',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const finalMsgs = [...updated, expertReply];
      setMessages(finalMsgs);
      saveToStorage(finalMsgs);
    } catch (err) {
      const fallback = {
        id: Date.now() + 1,
        text: "Извините, сейчас я не могу ответить. Попробуйте позже.",
        sender: 'expert',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const finalMsgs = [...updated, fallback];
      setMessages(finalMsgs);
      saveToStorage(finalMsgs);
    } finally {
      setIsTyping(false);
    }
  };

  const endChat = () => {
    if (window.confirm(`Завершить чат с ${expert?.name}?`)) {
      if (chatKey) {
        localStorage.removeItem(chatKey);   
      }
      alert("Чат успешно завершён. Эксперт теперь свободен.");
      navigate('/chats');
    }
  };

  if (!expert) {
    return <div style={{ padding: '100px', textAlign: 'center' }}>Выберите эксперта</div>;
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <div style={{
        background: '#2563eb',
        color: 'white',
        padding: '20px 30px',
        borderRadius: '16px 16px 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '32px' }}>{expert.avatar || '👤'}</span>
          <div>
            <h2 style={{ margin: 0 }}>{expert.name}</h2>
            <p style={{ margin: '4px 0 0', opacity: 0.9 }}>{expert.specialty}</p>
          </div>
        </div>

        <button 
          onClick={endChat}
          style={{
            padding: '10px 24px',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '9999px',
            fontSize: '15px',
            fontWeight: '600'
          }}
        >
          Завершить чат
        </button>
      </div>

      {/* Сообщения */}
      <div style={{ height: '520px', overflowY: 'auto', padding: '30px', background: '#f8fafc', border: '1px solid #e5e7eb', borderTop: 'none', borderRadius: '0 0 16px 16px' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ marginBottom: '16px', display: 'flex', justifyContent: msg.sender === 'student' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '75%',
              padding: '14px 20px',
              borderRadius: '18px',
              background: msg.sender === 'student' ? '#2563eb' : 'white',
              color: msg.sender === 'student' ? 'white' : '#1f2937'
            }}>
              <p style={{ margin: 0 }}>{msg.text}</p>
              <small style={{ display: 'block', textAlign: 'right', marginTop: '6px', opacity: 0.7 }}>
                {msg.time}
              </small>
            </div>
          </div>
        ))}

        {isTyping && <div style={{ display: 'flex', justifyContent: 'flex-start' }}><div style={{ background: 'white', padding: '14px 20px', borderRadius: '18px' }}>Эксперт печатает...</div></div>}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ display: 'flex', gap: '12px', padding: '20px', background: 'white', border: '1px solid #e5e7eb', borderTop: 'none', borderRadius: '0 0 16px 16px' }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Напишите сообщение эксперту..."
          style={{ flex: 1, padding: '16px 20px', borderRadius: '9999px', border: '1px solid #cbd5e1' }}
        />
        <button onClick={sendMessage} disabled={!newMessage.trim()} style={{ padding: '0 36px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '9999px' }}>
          Отправить
        </button>
      </div>
    </div>
  );
}