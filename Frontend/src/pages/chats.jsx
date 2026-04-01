import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const expertInfo = {
  1: { name: "Бекболат Каракузов", specialty: "Frontend Developer (React, Next.js)", avatar: "💪💪💪" },
  2: { name: "Хаймульдин", specialty: "Backend Developer (Node.js, Python)", avatar: "👨‍💻" },
  3: { name: "Наргиза Сайлаубаева", specialty: "Data Science & ML", avatar: "👩‍🔬" },
  4: { name: "Акниет", specialty: "Mobile Developer (Flutter)", avatar: "📱" },
  5: { name: "Мартынцов В.", specialty: "DevOps & Cloud", avatar: "☁️" },
  6: { name: "Бакыт Еркиновна", specialty: "UI/UX Designer", avatar: "🎨" }
};

export default function Chats() {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadChats = () => {
    const loaded = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('chat_')) {
        try {
          const messages = JSON.parse(localStorage.getItem(key) || '[]');
          if (messages.length > 0) {
            const lastMsg = messages[messages.length - 1];
            const expertId = parseInt(key.replace('chat_', ''));

            if (isNaN(expertId)) continue;

            const expert = expertInfo[expertId] || { name: "Неизвестный эксперт", specialty: "", avatar: "👤" };

            loaded.push({
              id: expertId,
              expertName: expert.name,
              expertAvatar: expert.avatar,
              specialty: expert.specialty,
              lastMessage: lastMsg.text.length > 75 ? lastMsg.text.substring(0, 75) + "..." : lastMsg.text,
              lastTime: lastMsg.time || "Недавно",
              messageCount: messages.length,
              lastUpdated: Date.now()
            });
          }
        } catch (e) {}
      }
    }

    loaded.sort((a, b) => b.lastUpdated - a.lastUpdated);
    setChats(loaded);
    setLoading(false);
  };

  useEffect(() => {
    loadChats();
    const interval = setInterval(loadChats, 2000);
    return () => clearInterval(interval);
  }, []);

  const openChat = (expertId) => {
    const expert = expertInfo[expertId] || { id: expertId, name: "Эксперт", avatar: "👤", specialty: "" };
    navigate('/chat', { state: { expert } });
  };

  const clearAllChats = () => {
    if (window.confirm("Удалить все чаты?")) {
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && key.startsWith('chat_')) localStorage.removeItem(key);
      }
      loadChats();
    }
  };

  return (
    <div style={{ maxWidth: '960px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '46px', fontWeight: '700' }}>Мои чаты</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={loadChats} style={{ padding: '12px 28px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '600' }}>
            Обновить
          </button>
          <button onClick={clearAllChats} style={{ padding: '12px 28px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '600' }}>
            Очистить всё
          </button>
        </div>
      </div>

      {chats.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '140px 40px', background: 'white', borderRadius: '24px', boxShadow: '0 15px 40px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '80px', marginBottom: '30px' }}>💬</div>
          <h2>Пока нет активных чатов</h2>
          <p style={{ color: '#64748b', margin: '20px 0 40px' }}>Начните общение с экспертом</p>
          <button onClick={() => navigate('/experts')} style={{ padding: '18px 48px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '9999px', fontSize: '18px' }}>
            Перейти к экспертам
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {chats.map((chat, index) => (
            <div
              key={chat.id}
              onClick={() => openChat(chat.id)}
              style={{
                background: 'white',
                padding: '28px 32px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                animation: `slideIn ${0.1 * index}s ease forwards`,
                opacity: 0
              }}
            >
              <div style={{ fontSize: '52px', flexShrink: 0 }}>{chat.expertAvatar}</div>

              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 6px 0', fontSize: '22px' }}>{chat.expertName}</h3>
                <p style={{ margin: 0, color: '#64748b', fontSize: '15.5px' }}>{chat.specialty}</p>
                <p style={{ margin: '14px 0 0 0', color: '#475569', lineHeight: '1.5' }}>
                  {chat.lastMessage}
                </p>
              </div>

              <div style={{ textAlign: 'right', minWidth: '110px' }}>
                <div style={{ color: '#64748b', fontSize: '15px' }}>{chat.lastTime}</div>
                <div style={{ color: '#94a3b8', fontSize: '14px', marginTop: '6px' }}>
                  {chat.messageCount} сообщений
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Анимация появления */}
      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}