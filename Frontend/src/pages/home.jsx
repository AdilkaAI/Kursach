import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Салам */}
      <div style={{
        height: '100vh',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ textAlign: 'center', zIndex: 2, maxWidth: '900px', padding: '0 20px' }}>
          <h1 style={{
            fontSize: '68px',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '24px'
          }}>
            QazConsult
          </h1>
          <p style={{
            fontSize: '28px',
            marginBottom: '50px',
            opacity: '0.95'
          }}>
            Онлайн-платформа для консультаций<br />
            студентов и экспертов Казахстана
          </p>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => navigate('/register')}
              style={{
                padding: '18px 48px',
                fontSize: '20px',
                background: 'white',
                color: '#1e40af',
                border: 'none',
                borderRadius: '9999px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
              }}
            >
              Создать аккаунт бесплатно
            </button>

            <button 
              onClick={() => navigate('/login')}
              style={{
                padding: '18px 48px',
                fontSize: '20px',
                background: 'transparent',
                color: 'white',
                border: '2px solid white',
                borderRadius: '9999px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Войти в аккаунт
            </button>
          </div>
        </div>

        {/* Декоративные элементы */}
        <div style={{ position: 'absolute', bottom: '10%', left: '10%', fontSize: '120px', opacity: '0.1' }}>💡</div>
        <div style={{ position: 'absolute', top: '20%', right: '15%', fontSize: '140px', opacity: '0.1' }}>👨‍💻</div>
      </div>

      {/* кардс */}
      <div style={{ padding: '100px 40px', background: '#f8fafc' }}>
        <h2 style={{ textAlign: 'center', fontSize: '42px', marginBottom: '80px' }}>
          Почему выбирают QazConsult?
        </h2>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
          gap: '40px',
          maxWidth: '1300px',
          margin: '0 auto'
        }}>
          <div style={{ background: 'white', padding: '50px 40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
        
            <h3 style={{ fontSize: '26px', marginBottom: '16px' }}>Быстрые консультации</h3>
            <p style={{ fontSize: '18px', lineHeight: '1.7', color: '#475569' }}>
              Задавайте вопросы экспертам из IT и получайте ответы в реальном времени через чат.
            </p>
          </div>

          <div style={{ background: 'white', padding: '50px 40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
           
            <h3 style={{ fontSize: '26px', marginBottom: '16px' }}>Опытные эксперты</h3>
            <p style={{ fontSize: '18px', lineHeight: '1.7', color: '#475569' }}>
              Более 10 казахстанских специалистов из разных областей IT готовы помочь вам.
            </p>
          </div>

          <div style={{ background: 'white', padding: '50px 40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
          
            <h3 style={{ fontSize: '26px', marginBottom: '16px' }}>База знаний</h3>
            <p style={{ fontSize: '18px', lineHeight: '1.7', color: '#475569' }}>
              Часто задаваемые вопросы с готовыми ответами. Не нашли ответ — сразу в чат.
            </p>
          </div>
        </div>
      </div>

      {/* хау ит ворк */}
      <div style={{ padding: '100px 40px', background: 'white' }}>
        <h2 style={{ textAlign: 'center', fontSize: '42px', marginBottom: '70px' }}>
          Как это работает?
        </h2>

        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '70px', marginBottom: '20px' }}>1️⃣</div>
            <h3 style={{ fontSize: '24px' }}>Зарегистрируйтесь</h3>
            <p>Создайте аккаунт за 30 секунд</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '70px', marginBottom: '20px' }}>2️⃣</div>
            <h3 style={{ fontSize: '24px' }}>Выберите эксперта</h3>
            <p>Или задайте вопрос в общем чате</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '70px', marginBottom: '20px' }}>3️⃣</div>
            <h3 style={{ fontSize: '24px' }}>Получите помощь</h3>
            <p>Эксперт ответит в чате в реальном времени</p>
          </div>
        </div>
      </div>

      {/* Призыв к действию внизу */}
      <div style={{
        background: 'linear-gradient(135deg, #1e40af, #2563eb)',
        color: 'white',
        padding: '120px 40px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '46px', marginBottom: '30px' }}>
          Готовы начать учиться и развиваться?
        </h2>
        <button 
          onClick={() => navigate('/register')}
          style={{
            padding: '20px 60px',
            fontSize: '22px',
            background: 'white',
            color: '#1e40af',
            border: 'none',
            borderRadius: '9999px',
            fontWeight: '700',
            boxShadow: '0 15px 40px rgba(0,0,0,0.3)'
          }}
        >
          Присоединиться сейчас
        </button>
      </div>
    </div>
  );
}