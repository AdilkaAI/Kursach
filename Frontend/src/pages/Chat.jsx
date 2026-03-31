import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const question = location.state?.question;

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Если нет вопроса — возвращаем назад
  useEffect(() => {
    if (!question) {
      navigate('/student');
    }
  }, [question]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: user.role === 'Student' ? 'student' : 'expert',
      name: user.name,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Имитация ответа от эксперта/студента
    if (user.role === 'Student') {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const replies = [
          "Понял вопрос. Давайте разберёмся подробнее.",
          "Хороший вопрос! Вот что я могу посоветовать...",
          "Спасибо за уточнение. Вот моё мнение по этому поводу.",
          "Я думаю, решение будет следующим..."
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];

        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          text: randomReply,
          sender: 'expert',
          name: 'Эксперт',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 1500);
    }
  };

  // Автоскролл вниз
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Toaster />
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Заголовок чата */}
        <div className="bg-blue-600 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Чат с экспертом</h2>
            <p className="text-blue-100 text-sm">По вопросу: {question?.title}</p>
          </div>
          <button 
            onClick={() => navigate('/student')}
            className="px-5 py-2 bg-white/20 hover:bg-white/30 rounded-2xl transition"
          >
            Закрыть чат
          </button>
        </div>

        {/* Сообщения */}
        <div ref={chatRef} className="h-96 p-6 overflow-y-auto bg-gray-50 space-y-6">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              Начните разговор. Эксперт скоро ответит.
            </div>
          )}

          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] px-5 py-3 rounded-3xl ${msg.sender === 'student' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white shadow border'}`}>
                <p className="font-medium text-sm opacity-75">{msg.name}</p>
                <p>{msg.text}</p>
                <p className="text-xs opacity-70 text-right mt-1">{msg.time}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white shadow border px-5 py-3 rounded-3xl">
                Эксперт печатает...
              </div>
            </div>
          )}
        </div>

        {/* Поле ввода */}
        <div className="p-6 border-t bg-white">
          <div className="flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Напишите сообщение..."
              className="flex-1 px-6 py-4 border border-gray-300 rounded-3xl focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={sendMessage}
              className="px-8 py-4 bg-blue-600 text-white font-medium rounded-3xl hover:bg-blue-700 transition"
            >
              Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}