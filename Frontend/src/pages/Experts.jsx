import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const experts = [
  { id: 1, name: "Бекболат Каракузов", specialty: "Frontend Developer (React, Next.js)", experience: "8 лет", rating: "100", avatar: "💪", bio: "Специалист по современному фронтенду. Да в целом он человек, который прямо сейчас читает этот текст и хочет поставить моей курсовой хороший балл.", color: "#3b82f6" },
  { id: 2, name: "Хаймульдин", specialty: "Backend Developer (Node.js, Python)", experience: "6 лет", rating: "4.8", avatar: "👨‍💻", bio: "Эксперт по серверной разработке.", color: "#10b981" },
  { id: 3, name: "Наргиза Сайлаубаева", specialty: "Data Science & Machine Learning", experience: "5 лет", rating: "4.9", avatar: "👩‍🔬", bio: "Специалист по анализу данных.", color: "#8b5cf6" },
  { id: 4, name: "Акниет", specialty: "Mobile Developer (Flutter)", experience: "7 лет", rating: "?", avatar: "📱", bio: "Разработчик мобильных приложений.", color: "#f59e0b" },
  { id: 5, name: "Мартынцов В.", specialty: "DevOps & Cloud", experience: "30 лет", rating: "4.8", avatar: "☁️", bio: "Эксперт по облачным технологиям.", color: "#ec4899" },
  { id: 6, name: "Бакыт Еркиновна", specialty: "UI/UX Designer", experience: "6 лет", rating: "4.9", avatar: "🎨", bio: "Профессиональный дизайнер интерфейсов.", color: "#14b8a6" }
];

export default function Experts() {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionDesc, setQuestionDesc] = useState('');
  const [busyExperts, setBusyExperts] = useState([]);

  const navigate = useNavigate();

  // 
  const refreshBusyExperts = () => {
    const busy = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('chat_')) {
        const messages = JSON.parse(localStorage.getItem(key) || '[]');
        if (messages && messages.length > 0) {
          const expertId = parseInt(key.replace('chat_', ''));
          if (!isNaN(expertId)) busy.push(expertId);
        }
      }
    }
    setBusyExperts(busy);
  };

  useEffect(() => {
    refreshBusyExperts();
    const interval = setInterval(refreshBusyExperts, 1500);
    return () => clearInterval(interval);
  }, []);

  const filteredExperts = experts.filter(expert =>
    expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expert.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isBusy = (id) => busyExperts.includes(id);

  const handleAskQuestion = () => {
    if (!selectedExpert || !questionTitle.trim() || !questionDesc.trim()) {
      alert("Заполните заголовок и описание вопроса");
      return;
    }

    navigate('/chat', { 
      state: { 
        expert: selectedExpert,
        question: {
          title: questionTitle,
          description: questionDesc
        }
      } 
    });
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '12px' }}>Наши эксперты</h1>
        <p style={{ fontSize: '22px', color: '#64748b' }}>Выберите специалиста для консультации</p>
      </div>

      {/* Поиск */}
      <div style={{ maxWidth: '620px', margin: '0 auto 60px' }}>
        <input
          type="text"
          placeholder="Поиск по имени или специальности..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '18px 26px',
            fontSize: '18px',
            border: '2px solid #e2e8f0',
            borderRadius: '9999px',
            outline: 'none'
          }}
        />
      </div>

      {/* Кнопка обновления */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <button 
          onClick={refreshBusyExperts}
          style={{
            padding: '12px 28px',
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Обновить статус экспертов
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(390px, 1fr))', gap: '32px' }}>
        {filteredExperts.map((expert) => {
          const busy = isBusy(expert.id);
          const statusColor = busy ? '#ef4444' : '#22c55e';
          const statusText = busy ? 'Занят' : 'Онлайн';

          return (
            <div
              key={expert.id}
              onClick={() => !busy && setSelectedExpert(expert)}
              style={{
                background: busy ? '#f8fafc' : (selectedExpert?.id === expert.id ? '#eff6ff' : 'white'),
                border: busy 
                  ? '2px solid #94a3b8' 
                  : (selectedExpert?.id === expert.id ? `3px solid ${expert.color}` : '1px solid #e5e7eb'),
                borderRadius: '24px',
                padding: '40px 32px',
                cursor: busy ? 'not-allowed' : 'pointer',
                transition: 'all 0.4s ease',
                boxShadow: '0 12px 35px rgba(0,0,0,0.09)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Статус Онлайн / Занят */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'white',
                padding: '6px 14px',
                borderRadius: '9999px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  backgroundColor: statusColor,
                  borderRadius: '50%',
                  boxShadow: `0 0 8px ${statusColor}`
                }} />
                {statusText}
              </div>

              <div style={{ fontSize: '68px', textAlign: 'center', marginBottom: '24px' }}>
                {expert.avatar}
              </div>

              <h3 style={{ fontSize: '25px', textAlign: 'center', marginBottom: '8px' }}>
                {expert.name}
              </h3>
              <p style={{ color: expert.color, fontWeight: '600', textAlign: 'center', marginBottom: '18px' }}>
                {expert.specialty}
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '22px', fontSize: '15.5px' }}>
                <span>⭐ {expert.rating}</span>
                <span>· {expert.experience}</span>
              </div>

              <p style={{ color: '#475569', lineHeight: '1.65', textAlign: 'center', fontSize: '15.8px' }}>
                {expert.bio}
              </p>

              {selectedExpert?.id === expert.id && !busy && (
                <div style={{ marginTop: '34px', paddingTop: '26px', borderTop: '1px solid #e5e7eb' }}>
                  <input
                    type="text"
                    placeholder="Заголовок вопроса"
                    value={questionTitle}
                    onChange={(e) => setQuestionTitle(e.target.value)}
                    style={{ width: '100%', padding: '15px', marginBottom: '14px', borderRadius: '12px', border: '1px solid #cbd5e1' }}
                  />
                  <textarea
                    placeholder="Подробно опишите свой вопрос..."
                    value={questionDesc}
                    onChange={(e) => setQuestionDesc(e.target.value)}
                    rows="4"
                    style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #cbd5e1', resize: 'vertical' }}
                  />
                  <button 
                    onClick={handleAskQuestion}
                    style={{
                      marginTop: '22px',
                      width: '100%',
                      padding: '17px',
                      background: expert.color,
                      color: 'white',
                      border: 'none',
                      borderRadius: '9999px',
                      fontSize: '17.5px',
                      fontWeight: '600'
                    }}
                  >
                    Задать вопрос эксперту
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}