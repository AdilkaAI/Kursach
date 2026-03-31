import { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function StudentDashboard() {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!user.id) {
      window.location.href = '/login';
    }
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/questions');
      setQuestions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    if (!title || !description) return toast.error("Заполните все поля");

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/questions', {
        title,
        description,
        category: "Общее",
        studentId: user.id
      });
      toast.success("Вопрос успешно создан!");
      setTitle('');
      setDescription('');
      fetchQuestions();
    } catch (err) {
      toast.error("Ошибка при создании вопроса");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Toaster />
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold">Добро пожаловать, {user.name}</h1>
          <p className="text-gray-600">Студент • Личный кабинет</p>
        </div>
        <button 
          onClick={() => { localStorage.clear(); window.location.href = '/login'; }}
          className="px-5 py-2 border border-red-300 text-red-600 rounded-xl hover:bg-red-50"
        >
          Выйти
        </button>
      </div>

      {/* Форма создания вопроса */}
      <div className="bg-white rounded-3xl shadow p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-6">Задать новый вопрос</h2>
        <form onSubmit={handleSubmitQuestion} className="space-y-6">
          <input
            type="text"
            placeholder="Заголовок вопроса"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 text-lg"
            required
          />
          <textarea
            placeholder="Подробное описание вопроса..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            className="w-full px-5 py-4 border border-gray-300 rounded-3xl focus:outline-none focus:border-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-10 py-4 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 disabled:opacity-70"
          >
            {loading ? 'Публикуется...' : 'Опубликовать вопрос'}
          </button>
        </form>
      </div>

      {/* Список вопросов */}
      <h2 className="text-2xl font-semibold mb-6">Мои вопросы и все открытые вопросы</h2>
      <div className="grid gap-6">
        {questions.length === 0 ? (
          <p className="text-gray-500">Пока нет вопросов</p>
        ) : (
          questions.map(q => (
            <div key={q.id} className="bg-white p-6 rounded-3xl shadow">
              <h3 className="font-semibold text-lg">{q.title}</h3>
              <p className="text-gray-600 mt-2 line-clamp-2">{q.description}</p>
              <div className="mt-4 text-sm text-gray-500">
                Статус: <span className="font-medium text-green-600">{q.status}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}