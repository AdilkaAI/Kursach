import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isLoggedIn = !!token;

  // Загрузка сохранённой темы
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    setShowMenu(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setShowMenu(false);
    navigate('/login');
  };

  return (
    <header style={{
      backgroundColor: isDarkMode ? '#1e2937' : '#ffffff',
      boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid #e5e7eb',
      color: isDarkMode ? '#e2e8f0' : '#1f2937',
      transition: 'all 0.4s ease'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '16px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Лого */}
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
          <h1 style={{ fontSize: '28px', fontWeight: '700', margin: 0 }}>QazConsult</h1>
        </div>

        {/* Навигация */}
        <nav style={{ display: 'flex', gap: '42px', fontSize: '17px', fontWeight: '500' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Главная</Link>
          <Link to="/questions" style={{ color: 'inherit', textDecoration: 'none' }}>Вопросы</Link>
          <Link to="/experts" style={{ color: 'inherit', textDecoration: 'none' }}>Эксперты</Link>
          <Link to="/chat" style={{ color: 'inherit', textDecoration: 'none' }}>Чат</Link>
          <Link to="/chats" style={{ color: 'inherit', textDecoration: 'none' }}>Мои чаты</Link>
        </nav>

        {/* Правая часть - Профиль */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {isLoggedIn ? (
            <div style={{ position: 'relative' }}>
              <div 
                onClick={() => setShowMenu(!showMenu)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  backgroundColor: isDarkMode ? '#334155' : '#f1f5f9',
                  transition: 'all 0.3s'
                }}
              >
                <span style={{ fontWeight: '600' }}>{user.name || 'Профиль'}</span>
                <div style={{ fontSize: '24px' }}>👤</div>
              </div>

              {/* Выпадающее меню */}
              {showMenu && (
                <div style={{
                  position: 'absolute',
                  top: '60px',
                  right: '0',
                  backgroundColor: isDarkMode ? '#1e2937' : 'white',
                  borderRadius: '16px',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.2)',
                  padding: '12px 0',
                  width: '260px',
                  zIndex: 200,
                  overflow: 'hidden'
                }}>
                  <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: '600' }}>{user.name}</div>
                    <div style={{ fontSize: '14px', color: '#64748b' }}>{user.email}</div>
                  </div>

                  <div 
                    onClick={() => { setShowMenu(false); navigate('/settings'); }}
                    style={{ padding: '14px 20px', cursor: 'pointer' }}
                  >
                    ⚙️ Настройки
                  </div>

                  <div 
                    onClick={() => { setShowMenu(false); navigate('/chats'); }}
                    style={{ padding: '14px 20px', cursor: 'pointer' }}
                  >
                    💬 Мои чаты
                  </div>

                  <div 
                    onClick={toggleDarkMode}
                    style={{ 
                      padding: '14px 20px', 
                      cursor: 'pointer', 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    🌗 Тёмная тема
                    <span>{isDarkMode ? 'Вкл' : 'Выкл'}</span>
                  </div>

                  <div 
                    onClick={handleLogout}
                    style={{ 
                      padding: '14px 20px', 
                      cursor: 'pointer', 
                      color: '#ef4444',
                      borderTop: '1px solid #e2e8f0'
                    }}
                  >
                    Выйти из аккаунта
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </header>
  );
}