import { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function ExpertDashboard() {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (user.role !== 'Expert') {
      window.location.href = '/login';
    }
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/questions');
      // Показываем только открытые вопросы
      setQuestions(res.data.filter(q => q.status === 'open'));
    } catch (err) {
      console.error(err);
    }
  };

  const takeQuestion = (question) => {
    setSelectedQuestion(question);
    toast.success(`Вы взяли вопрос: ${question.title}`);
  };

  const sendAnswer = () => {
    if (!answer.trim() || !selectedQuestion) return;

    // Имитация ответа
    const updatedQuestions = questions.map(q => 
      q.id === selectedQuestion.id 
        ? { ...q, status: 'closed', answers: [...(q.answers || []), { text: answer, expert: user.name }] }
        : q
    );

    setQuestions(updatedQuestions);
    setSelectedQuestion(null);
    setAnswer('');
    toast.success('Ответ отправлен! Вопрос закрыт.');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Toaster />
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold">Панель эксперта</h1>
          <p className="text-gray-600">Здравствуйте, {user.name}</p>
        </div>
        <button 
          onClick={() => { localStorage.clear(); window.location.href = '/login'; }}
          className="px-5 py-2 border border-red-300 text-red-600 rounded-xl hover:bg-red-50"
        >
          Выйти
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Список открытых вопросов */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Открытые вопросы</h2>
          <div className="space-y-6">
            {questions.length === 0 ? (
              <p className="text-gray-500">Пока нет открытых вопросов</p>
            ) : (
              questions.map(q => (
                <div key={q.id} className="bg-white p-6 rounded-3xl shadow hover:shadow-md transition">
                  <h3 className="font-semibold text-lg mb-2">{q.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{q.description}</p>
                  <button 
                    onClick={() => takeQuestion(q)}
                    className="px-6 py-2 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition"
                  >
                    Взять вопрос
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Окно ответа */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Ответ на вопрос</h2>
          {selectedQuestion ? (
            <div className="bg-white p-8 rounded-3xl shadow">
              <h3 className="font-semibold text-xl mb-4">{selectedQuestion.title}</h3>
              <p className="text-gray-600 mb-8">{selectedQuestion.description}</p>

              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Напишите ваш ответ здесь..."
                rows={10}
                className="w-full p-5 border border-gray-300 rounded-3xl focus:outline-none focus:border-blue-500"
              />

              <div className="flex gap-4 mt-6">
                <button 
                  onClick={sendAnswer}
                  className="flex-1 py-4 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700"
                >
                  Отправить ответ и закрыть вопрос
                </button>
                <button 
                  onClick={() => setSelectedQuestion(null)}
                  className="flex-1 py-4 border border-gray-300 rounded-2xl hover:bg-gray-50"
                >
                  Отменить
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl shadow text-center">
              <p className="text-gray-500">Выберите вопрос слева, чтобы ответить</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}