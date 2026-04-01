import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    role: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  // Загружаем данные из localStorage при открытии страницы
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
    
    setUserData({
      name: savedUser.name || '',
      surname: '', // фамилию пока нет в регистрации, можно добавить позже
      email: savedUser.email || '',
      phone: savedUser.phone || '+7 (___) ___-__-__',
      role: savedUser.role || 'Student'
    });
  }, []);

  const handleSave = () => {
    // Обновляем данные в localStorage
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const updatedUser = { ...currentUser, ...userData };
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    alert("Изменения успешно сохранены!");
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Вы уверены, что хотите удалить аккаунт? Это действие нельзя отменить.")) {
      localStorage.clear();
      alert("Аккаунт удалён.");
      navigate('/register');
    }
  };

  return (
    <div style={{ maxWidth: '720px', margin: '40px auto', padding: '20px' }}>
      <div style={{
        background: 'white',
        borderRadius: '24px',
        boxShadow: '0 15px 50px rgba(0,0,0,0.12)',
        overflow: 'hidden'
      }}>
        {/* Заголовок */}
        <div style={{
          padding: '32px 40px',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700' }}>Редактировать профиль</h1>
          <button 
            onClick={() => navigate(-1)}
            style={{ fontSize: '28px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: '40px' }}>
          {/* Фото */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              width: '110px',
              height: '110px',
              background: '#2563eb',
              borderRadius: '50%',
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '50px',
              color: 'white'
            }}>
              👤
            </div>
            <button style={{
              padding: '8px 24px',
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '9999px',
              fontSize: '15px'
            }}>
              Изменить фото
            </button>
          </div>

          {/* Форма */}
          <div style={{ display: 'grid', gap: '28px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>Имя</label>
              <input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                style={{ width: '100%', padding: '16px', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '17px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>Фамилия</label>
              <input
                type="text"
                value={userData.surname}
                onChange={(e) => setUserData({ ...userData, surname: e.target.value })}
                style={{ width: '100%', padding: '16px', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '17px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>E-mail</label>
              <input
                type="email"
                value={userData.email}
                disabled
                style={{ width: '100%', padding: '16px', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '17px', backgroundColor: '#f8fafc' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>Телефон</label>
              <input
                type="tel"
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                style={{ width: '100%', padding: '16px', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '17px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>Роль</label>
              <input
                type="text"
                value={userData.role === 'Student' ? 'Студент' : 'Эксперт'}
                disabled
                style={{ width: '100%', padding: '16px', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '17px', backgroundColor: '#f8fafc' }}
              />
            </div>
          </div>

          {/* Кнопки действий */}
          <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button 
              onClick={handleSave}
              style={{
                padding: '18px',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '9999px',
                fontSize: '18px',
                fontWeight: '600'
              }}
            >
              Сохранить изменения
            </button>

            <button 
              onClick={handleDeleteAccount}
              style={{
                padding: '18px',
                background: '#fee2e2',
                color: '#ef4444',
                border: 'none',
                borderRadius: '9999px',
                fontSize: '17px',
                fontWeight: '600'
              }}
            >
              Удалить аккаунт
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}