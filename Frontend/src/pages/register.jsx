import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Student'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      alert('Регистрация прошла успешно! Теперь войдите в систему.');
      navigate('/login');
    }, 700);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
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
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
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
            fontSize: '42px',
            fontWeight: 'bold'
          }}>Q</div>
          <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 8px' }}>Создать аккаунт</h1>
          <p style={{ color: '#64748b', fontSize: '18px' }}>Присоединяйся к QazConsult</p>
        </div>

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>Имя и фамилия</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ваше имя и фамилия"
              style={{ width: '100%', padding: '16px 20px', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '17px' }}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              style={{ width: '100%', padding: '16px 20px', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '17px' }}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>Пароль</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Минимум 6 символов"
              style={{ width: '100%', padding: '16px 20px', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '17px' }}
              required
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>Роль</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{ width: '100%', padding: '16px 20px', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '17px' }}
            >
              <option value="Student">Студент</option>
              <option value="Expert">Эксперт</option>
            </select>
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
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', color: '#64748b' }}>
          Уже есть аккаунт?{' '}
          <Link to="/login" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}