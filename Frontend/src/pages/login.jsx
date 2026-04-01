import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Имитация запроса к backend
    setTimeout(() => {
      const fakeUser = {
        id: "1",
        name: "Ерасыл Алпысбаев",
        email: email,
        role: email.includes("expert") ? "Expert" : "Student"
      };

      localStorage.setItem('token', 'fake-jwt-token');
      localStorage.setItem('user', JSON.stringify(fakeUser));

      alert(`Добро пожаловать, ${fakeUser.name}!`);

      if (fakeUser.role === "Expert") {
        navigate('/expert');
      } else {
        navigate('/student');
      }
    }, 800);
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
        maxWidth: '420px',
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
          <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 8px' }}>Добро пожаловать</h1>
          <p style={{ color: '#64748b', fontSize: '18px' }}>Войдите в свой аккаунт QazConsult</p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@example.com"
              style={{
                width: '100%',
                padding: '16px 20px',
                border: '1px solid #cbd5e1',
                borderRadius: '12px',
                fontSize: '17px'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '16px 20px',
                border: '1px solid #cbd5e1',
                borderRadius: '12px',
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
              fontWeight: '600',
              marginBottom: '20px'
            }}
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#64748b' }}>
          Нет аккаунта?{' '}
          <Link to="/register" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
}