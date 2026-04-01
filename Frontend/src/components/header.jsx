import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header style={{
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid #e5e7eb'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '16px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '32px',
            fontWeight: 'bold'
          }}>Q</div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', margin: 0, color: '#1e40af' }}>QazConsult</h1>
        </div>

        <nav style={{ display: 'flex', gap: '40px', fontSize: '17px', fontWeight: '500' }}>
          <Link to="/" style={{ color: '#374151', textDecoration: 'none' }}>Главная</Link>
          <Link to="/student" style={{ color: '#374151', textDecoration: 'none' }}>Вопросы</Link>
          <Link to="/expert" style={{ color: '#374151', textDecoration: 'none' }}>Эксперты</Link>
          <Link to="/chat" style={{ color: '#374151', textDecoration: 'none' }}>Чат</Link>
        </nav>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Link 
            to="/login"
            style={{
              padding: '12px 28px',
              color: '#2563eb',
              border: '2px solid #dbeafe',
              borderRadius: '9999px',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            Войти
          </Link>
          <Link 
            to="/register"
            style={{
              padding: '12px 28px',
              backgroundColor: '#2563eb',
              color: 'white',
              borderRadius: '9999px',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </header>
  );
}