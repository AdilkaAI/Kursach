import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Лого */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl">
            Q
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">QazConsult</h1>
          </div>
        </div>

        {/* Навигация */}
        <nav className="flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-blue-600 transition-colors">Главная</Link>
          <Link to="#" className="hover:text-blue-600 transition-colors">Эксперты</Link>
          <Link to="#" className="hover:text-blue-600 transition-colors">Вопросы и ответы</Link>
          <Link to="#" className="hover:text-blue-600 transition-colors">Как это работает</Link>
        </nav>

        {/* Кнопки */}
        <div className="flex items-center gap-4">
          <Link 
            to="/login"
            className="px-6 py-2.5 text-blue-600 font-medium hover:bg-gray-100 rounded-2xl transition-colors"
          >
            Войти
          </Link>
          <Link 
            to="/register"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-2xl transition-colors"
          >
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </header>
  );
}