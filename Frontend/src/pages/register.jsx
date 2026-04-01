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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();

      await axios.post('http://localhost:5000/api/auth/register', {
        name: fullName,
        email: formData.email,
        password: formData.password,
        role: 'Student'
      });

      alert('Аккаунт успешно создан! Теперь войдите в систему.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при регистрации');
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
          <div style={{ width: '80px', height: '80px', background: '#2563eb', borderRadius: '20px', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '48px', fontWeight: 'bold' }}>Q</div>
          <h1 style={{ fontSize: '32px', fontWeight: '700' }}>Создать аккаунт</h1>
          <p style={{ color: '#64748b' }}>Присоединяйся к сообществу QazConsult</p>
        </div>

        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>{error}</p>}

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Имя</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Имя" required style={{ width: '100%', padding: '16px', borderRadius: '14px', border: '1px solid #cbd5e1' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Фамилия</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Фамилия" required style={{ width: '100%', padding: '16px', borderRadius: '14px', border: '1px solid #cbd5e1' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Почта" required style={{ width: '100%', padding: '16px', borderRadius: '14px', border: '1px solid #cbd5e1' }} />
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Пароль</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required style={{ width: '100%', padding: '16px', borderRadius: '14px', border: '1px solid #cbd5e1' }} />
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '16px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '9999px', fontSize: '18px', fontWeight: '600' }}>
            {loading ? 'Создание...' : 'Создать аккаунт'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', color: '#64748b' }}>
          Уже есть аккаунт? <Link to="/login" style={{ color: '#2563eb', fontWeight: '600' }}>Войти</Link>
        </p>
      </div>
    </div>
  );
}