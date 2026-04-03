import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'Student'
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Загружаем данные из localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
    
    setUserData({
      firstName: savedUser.firstName || '',
      lastName: savedUser.lastName || '',
      email: savedUser.email || '',
      phone: savedUser.phone || '',
      role: savedUser.role || 'Student'
    });
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setLoading(true);
    setMessage('');

    try {
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = { 
        ...currentUser, 
        firstName: userData.firstName.trim(),
        lastName: userData.lastName.trim(),
        phone: userData.phone.trim()
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));

      setMessage('✅ Изменения успешно сохранены!');
      
      setTimeout(() => {
        navigate('/chats'); // или куда нужно после сохранения
      }, 1200);
    } catch (error) {
      setMessage('❌ Ошибка при сохранении данных');
    } finally {
      setLoading(false);
    }
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
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                style={{ width: '100%', padding: '16px', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '17px' }}
                placeholder="Введите имя"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>Фамилия</label>
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                style={{ width: '100%', padding: '16px', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '17px' }}
                placeholder="Введите фамилию"
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
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                placeholder="+7 (___) ___-__-__"
                style={{ width: '100%', padding: '16px', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '17px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>Роль</label>
              <input
                type="text"
                value={userData.role === 'Student' ? 'Студент' : userData.role === 'Expert' ? 'Эксперт' : 'Пользователь'}
                disabled
                style={{ width: '100%', padding: '16px', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '17px', backgroundColor: '#f8fafc' }}
              />
            </div>
          </div>

          {/* Кнопки действий */}
          <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button 
              onClick={handleSave}
              disabled={loading}
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
              {loading ? 'Сохранение...' : 'Сохранить изменения'}
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

          {message && (
            <p style={{ 
              textAlign: 'center', 
              marginTop: '20px',
              color: message.includes('✅') ? 'green' : 'red',
              fontWeight: '500'
            }}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}