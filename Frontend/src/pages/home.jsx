export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 text-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">
        Система онлайн-консультаций и вопросов-ответов
      </h1>
      <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
        Задавайте вопросы, получайте быстрые ответы от экспертов и проводите консультации в реальном времени
      </p>

      <div className="flex justify-center gap-6">
        <a 
          href="/login" 
          className="px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-2xl hover:bg-blue-700 transition"
        >
          Войти в систему
        </a>
        <a 
          href="/register" 
          className="px-8 py-4 border-2 border-blue-600 text-blue-600 text-lg font-medium rounded-2xl hover:bg-blue-50 transition"
        >
          Зарегистрироваться
        </a>
      </div>

      <div className="mt-20 grid grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-3xl shadow">
          <h3 className="font-semibold text-xl mb-3">Для студентов</h3>
          <p className="text-gray-600">Задавайте вопросы и получайте ответы от экспертов</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow">
          <h3 className="font-semibold text-xl mb-3">Для экспертов</h3>
          <p className="text-gray-600">Отвечайте на вопросы и проводите консультации</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow">
          <h3 className="font-semibold text-xl mb-3">Онлайн чат</h3>
          <p className="text-gray-600">Общайтесь с экспертом в реальном времени</p>
        </div>
      </div>
    </div>
  );
}