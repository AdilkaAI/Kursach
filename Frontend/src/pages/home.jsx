export default function Home() {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 40px' }}>
      {/* Hero секция */}
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h1 style={{
          fontSize: '52px',
          fontWeight: '700',
          lineHeight: '1.1',
          color: '#1e40af',
          marginBottom: '24px'
        }}>
          Система онлайн-консультаций<br />и вопросов-ответов
        </h1>
        
        <p style={{
          fontSize: '22px',
          color: '#475569',
          maxWidth: '700px',
          margin: '0 auto 40px'
        }}>
          Задавайте вопросы, получайте быстрые ответы от экспертов и проводите консультации в реальном времени
        </p>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <a href="/login" style={{
            padding: '16px 40px',
            backgroundColor: '#2563eb',
            color: 'white',
            fontSize: '18px',
            fontWeight: '600',
            borderRadius: '9999px',
            textDecoration: 'none'
          }}>
            Войти в систему
          </a>
          <a href="/register" style={{
            padding: '16px 40px',
            border: '2px solid #2563eb',
            color: '#2563eb',
            fontSize: '18px',
            fontWeight: '600',
            borderRadius: '9999px',
            textDecoration: 'none'
          }}>
            Зарегистрироваться
          </a>
        </div>
      </div>

      {/* Блоки преимуществ */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        <div style={{ background: 'white', padding: '40px 32px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#1e40af' }}>Для студентов</h3>
          <p style={{ color: '#475569', fontSize: '17px' }}>
            Задавайте вопросы и получайте качественные ответы от проверенных экспертов
          </p>
        </div>

        <div style={{ background: 'white', padding: '40px 32px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#1e40af' }}>Для экспертов</h3>
          <p style={{ color: '#475569', fontSize: '17px' }}>
            Отвечайте на вопросы, проводите консультации и помогайте студентам
          </p>
        </div>

        <div style={{ background: 'white', padding: '40px 32px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#1e40af' }}>Онлайн чат</h3>
          <p style={{ color: '#475569', fontSize: '17px' }}>
            Общайтесь с экспертом в реальном времени. Быстрые и точные ответы
          </p>
        </div>
      </div>
    </div>
  );
}