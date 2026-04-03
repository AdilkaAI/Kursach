import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  //  валидация email
  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); 
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // валидация на клиенте
      if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.password.trim()) {
        throw new Error("Все поля обязательны для заполнения");
      }

      if (formData.email.length < 8) {
        throw new Error("Email слишком короткий");
      }

      if (!isValidEmail(formData.email)) {
        throw new Error("Введите корректный email адрес (например: example@gmail.com)");
      }

      if (formData.password.length < 6) {
        throw new Error("Пароль должен содержать минимум 6 символов");
      }

      const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;

      // запрос к серверу
      await axios.post('http://localhost:5000/api/auth/register', {
        name: fullName,
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        role: 'Student'
      });

      alert('Аккаунт успешно создан! Теперь вы можете войти.');
      navigate('/login');

    } catch (err) {
      // Обработка ошибок
      const errorMessage = err.response?.data?.message || err.message || 'Ошибка при регистрации. Попробуйте позже.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        width: '100%',
        maxWidth: '440px',
        borderRadius: '24px',
        padding: '50px 40px',
        boxShadow: '0 25px 70px rgba(0,0,0,0.2)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: '#2563eb',
            borderRadius: '20px',
            margin: '0 auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '48px',
            fontWeight: 'bold'
          }}>Q</div>
          <h1 style={{ fontSize: '32px', fontWeight: '700' }}>Создать аккаунт</h1>
          <p style={{ color: '#64748b' }}>Присоединяйся к сообществу QazConsult</p>
        </div>

        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '20px', fontWeight: '600' }}>{error}</p>}

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Имя</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Введите ваше имя"
              style={{ width: '100%', padding: '16px 20px', border: '1px solid #cbd5e1', borderRadius: '14px', fontSize: '17px' }}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Фамилия</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Введите вашу фамилию"
              style={{ width: '100%', padding: '16px 20px', border: '1px solid #cbd5e1', borderRadius: '14px', fontSize: '17px' }}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Введите ваш email"
              style={{ width: '100%', padding: '16px 20px', border: '1px solid #cbd5e1', borderRadius: '14px', fontSize: '17px' }}
              required
            />
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Пароль</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              style={{ width: '100%', padding: '16px 20px', border: '1px solid #cbd5e1', borderRadius: '14px', fontSize: '17px' }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '9999px',
              fontSize: '18px',
              fontWeight: '600'
            }}
          >
            {loading ? 'Создание аккаунта...' : 'Создать аккаунт'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', color: '#64748b' }}>
          Уже есть аккаунт?{' '}
          <Link to="/login" style={{ color: '#2563eb', fontWeight: '600' }}>Войти</Link>
        </p>
      </div>
    </div>
  );
}