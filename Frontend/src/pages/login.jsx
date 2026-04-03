import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  //  email
  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Клиентская валидация
      if (!email.trim() || !password.trim()) {
        throw new Error("Пожалуйста, заполните все поля");
      }

      if (!isValidEmail(email)) {
        throw new Error("Введите корректный email адрес (например: example@gmail.com)");
      }

      if (password.length < 4) {
        throw new Error("Пароль слишком короткий");
      }

      // запрос к серверу
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email: email.trim().toLowerCase(),
        password: password
      });

      // вход
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      alert(`Добро пожаловать, ${res.data.user.name}!`);

      // редирект 
      if (res.data.user.role === 'Expert') {
        navigate('/expert');
      } else {
        navigate('/student');
      }

    } catch (err) {
      // обработка всех возможных ошибок
      let errorMsg = "Произошла ошибка при входе";

      if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (err.message) {
        errorMsg = err.message;
      }

      setError(errorMsg);
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
        maxWidth: '420px',
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
          <h1 style={{ fontSize: '32px', fontWeight: '700' }}>Вход в аккаунт</h1>
        </div>

        {error && (
          <p style={{ 
            color: 'red', 
            textAlign: 'center', 
            marginBottom: '20px', 
            fontWeight: '600',
            background: '#fee2e2',
            padding: '12px',
            borderRadius: '8px'
          }}>
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{ 
                width: '100%', 
                padding: '16px 20px', 
                border: '1px solid #cbd5e1', 
                borderRadius: '14px', 
                fontSize: '17px' 
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ 
                width: '100%', 
                padding: '16px 20px', 
                border: '1px solid #cbd5e1', 
                borderRadius: '14px', 
                fontSize: '17px' 
              }}
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
            {loading ? 'Проверка данных...' : 'Войти'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', color: '#64748b' }}>
          Нет аккаунта?{' '}
          <Link to="/register" style={{ color: '#2563eb', fontWeight: '600' }}>Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
}