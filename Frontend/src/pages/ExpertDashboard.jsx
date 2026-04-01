import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ExpertDashboard() {
  const [questions, setQuestions] = useState([
    { 
      id: 1, 
      title: "Как правильно использовать замыкания в JavaScript?", 
      description: "Нужен понятный пример для курсовой работы", 
      status: "Открыт",
      student: "Айдос Е."
    },
    { 
      id: 2, 
      title: "Как настроить PostgreSQL для учебного проекта?", 
      description: "Помогите с подключением и базовой структурой", 
      status: "Открыт",
      student: "Мадияр С."
    }
  ]);

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (user.role !== 'Expert') {
      navigate('/login');
    }
  }, [user, navigate]);

  const takeQuestion = (q) => {
    setSelectedQuestion(q);
  };

  const sendAnswer = () => {
    if (!answer.trim() || !selectedQuestion) return;

    alert(`Ответ отправлен экспертом ${user.name}!\nВопрос "${selectedQuestion.title}" закрыт.`);

    setQuestions(questions.filter(q => q.id !== selectedQuestion.id));
    setSelectedQuestion(null);
    setAnswer('');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '36px', fontWeight: '700' }}>Панель эксперта</h1>
          <p style={{ color: '#64748b', fontSize: '18px' }}>Здравствуйте, {user.name}</p>
        </div>
        <button 
          onClick={() => { localStorage.clear(); navigate('/login'); }}
          style={{ padding: '12px 28px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '12px' }}
        >
          Выйти
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Список вопросов */}
        <div>
          <h2 style={{ fontSize: '26px', marginBottom: '20px' }}>Открытые вопросы</h2>
          
          {questions.map(q => (
            <div key={q.id} style={{
              background: 'white',
              padding: '24px',
              borderRadius: '16px',
              marginBottom: '20px',
              boxShadow: '0 6px 20px rgba(0,0,0,0.07)'
            }}>
              <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{q.title}</h3>
              <p style={{ color: '#475569', marginBottom: '16px' }}>{q.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>От студента: <strong>{q.student}</strong></span>
                <button 
                  onClick={() => takeQuestion(q)}
                  style={{
                    padding: '10px 24px',
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '9999px',
                    fontWeight: '600'
                  }}
                >
                  Взять вопрос
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Окно ответа */}
        <div>
          <h2 style={{ fontSize: '26px', marginBottom: '20px' }}>Ответ на вопрос</h2>
          
          {selectedQuestion ? (
            <div style={{ background: 'white', padding: '32px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '22px', marginBottom: '16px' }}>{selectedQuestion.title}</h3>
              <p style={{ color: '#475569', marginBottom: '30px' }}>{selectedQuestion.description}</p>

              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Напишите подробный ответ..."
                rows="10"
                style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '17px' }}
              />

              <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
                <button 
                  onClick={sendAnswer}
                  style={{ flex: 1, padding: '16px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '9999px', fontSize: '17px', fontWeight: '600' }}
                >
                  Отправить ответ и закрыть вопрос
                </button>
                <button 
                  onClick={() => setSelectedQuestion(null)}
                  style={{ flex: 1, padding: '16px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '9999px', fontSize: '17px' }}
                >
                  Отменить
                </button>
              </div>
            </div>
          ) : (
            <div style={{ 
              background: 'white', 
              padding: '80px 40px', 
              textAlign: 'center', 
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
            }}>
              <p style={{ color: '#64748b', fontSize: '18px' }}>
                Выберите вопрос слева, чтобы начать отвечать
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}