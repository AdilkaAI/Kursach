import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/register';
import Questions from './pages/questions';
import Experts from './pages/Experts';
import Chat from './pages/Chat';
import Chats from './pages/Chats';
import Settings from './pages/Settings';

function App() {
  const token = localStorage.getItem('token');

  // Строгая защита: без токена можно только на главную, логин и регистрацию
  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        <Header />
        
        <Routes>
          {/* Публичные страницы (доступны без логина) */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Защищённые страницы (требуют авторизации) */}
          <Route path="/questions" element={
            <ProtectedRoute>
              <Questions />
            </ProtectedRoute>
          } />

          <Route path="/experts" element={
            <ProtectedRoute>
              <Experts />
            </ProtectedRoute>
          } />

          <Route path="/chat" element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          } />

          <Route path="/chats" element={
            <ProtectedRoute>
              <Chats />
            </ProtectedRoute>
          } />

          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;