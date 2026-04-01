import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Заполните все поля");
      return;
    }

    const newQuestion = {
      id: Date.now().toString(),
      title,
      description,
      studentId: user.id,
      status: "open"
    };

    alert("Вопрос опубликован! Переходим в чат...");

    // Переход в чат
    navigate('/chat', { state: { question: newQuestion } });

    setTitle('');
    setDescription('');
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '36px', fontWeight: '700' }}>Личный кабинет студента</h1>
          <p style={{ color: '#64748b', fontSize: '18px' }}>Добро пожаловать, {user.name || 'Студент'}</p>
        </div>
        <button 
          onClick={() => { localStorage.clear(); navigate('/login'); }}
          style={{ padding: '12px 28px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '600' }}
        >
          Выйти
        </button>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '40px', 
        borderRadius: '20px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)' 
      }}>
        <h2 style={{ fontSize: '28px', marginBottom: '30px' }}>Задать новый вопрос</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Заголовок вопроса"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '18px', 
              fontSize: '18px', 
              border: '1px solid #cbd5e1', 
              borderRadius: '12px', 
              marginBottom: '20px' 
            }}
            required
          />
          
          <textarea
            placeholder="Опишите ваш вопрос подробно..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="7"
            style={{ 
              width: '100%', 
              padding: '18px', 
              fontSize: '17px', 
              border: '1px solid #cbd5e1', 
              borderRadius: '12px',
              resize: 'vertical'
            }}
            required
          />

          <button 
            type="submit"
            style={{
              marginTop: '25px',
              padding: '16px 50px',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '9999px',
              fontSize: '18px',
              fontWeight: '600'
            }}
          >
            Опубликовать вопрос и открыть чат
          </button>
        </form>
      </div>
    </div>
  );
}