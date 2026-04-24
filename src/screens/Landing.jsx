import Icon from '../components/Icon.jsx';
import { Button, Card, TopBar, MARK, LOGO_WHITE } from '../components/Primitives.jsx';

const LandingScreen = ({ onLogin, onStudy }) => (
  <div style={{ background: '#fff', minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#1A2332' }}>
    <TopBar onLogin={onLogin} onRegister={onStudy} />

    {/* Hero */}
    <section className="s-hero-section" style={{ position: 'relative', overflow: 'hidden', padding: '96px 40px 120px' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='92' viewBox='0 0 80 92'><polygon points='40,2 76,23 76,69 40,90 4,69 4,23' fill='none' stroke='%231B4B7A' stroke-width='1.5' opacity='0.06'/></svg>")`, backgroundSize: '80px 92px' }} />
      <div className="s-hero" style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1B4B7A', marginBottom: 18 }}>НТЦ «Востоктехносервис» · Корпоративный портал</div>
          <h1 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 64, lineHeight: 1.05, letterSpacing: '-0.025em', margin: 0 }}>
            Единая система проверки знаний<br/>и тестирования <span style={{ color: '#1B4B7A' }}>работников</span>
          </h1>
          <p className="s-hero-sub" style={{ fontSize: 18, color: '#475060', lineHeight: 1.6, margin: '24px 0 40px', maxWidth: 560 }}>
            Ежедневные и ежегодные проверки, видеоуроки, теоретические экзамены и протоколы смертельных опасностей — в едином промышленном контуре СПЕКТР.
          </p>
          <div className="s-hero-cta" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Button size="lg" onClick={onLogin} iconRight="arrow">Вход для сотрудников ВТС</Button>
            <Button size="lg" variant="success" icon="graduation" onClick={onStudy}>Вход в Учебный центр</Button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={MARK} className="s-hero-img" style={{ width: 340, filter: 'drop-shadow(0 24px 56px rgba(27,75,122,0.18))' }} alt="" />
        </div>
      </div>
    </section>

    {/* Feature grid */}
    <section className="s-feature-section" style={{ padding: '64px 40px', background: '#F7F9FC' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 40, letterSpacing: '-0.02em', margin: '0 0 48px' }}>Что внутри портала</h2>
        <div className="s-feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {[
            { ic: 'book', t: 'База тестов и видеоуроков', d: 'Пять направлений проверки, централизованная база вопросов.' },
            { ic: 'clipboard', t: 'Ежедневная проверка', d: '10 вопросов · 10 минут. Допуск к смене.' },
            { ic: 'target', t: 'Ежегодная проверка', d: '50 вопросов · 60 минут. Подтверждение квалификации.' },
            { ic: 'shield', t: 'Безопасный труд', d: 'Протоколы смертельных опасностей и обучающие тесты.' },
          ].map((f, i) => (
            <Card key={i} padding={28}>
              <div style={{ width: 48, height: 48, borderRadius: 10, background: '#EEF3F8', color: '#1B4B7A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Icon name={f.ic} size={24} color="#1B4B7A" />
              </div>
              <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 20, margin: '0 0 8px', lineHeight: 1.25 }}>{f.t}</h3>
              <p style={{ fontSize: 14, color: '#5B6778', margin: 0, lineHeight: 1.55 }}>{f.d}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="s-stat-section" style={{ padding: '64px 40px' }}>
      <div className="s-stat-grid" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid #E4E8EF', borderBottom: '1px solid #E4E8EF' }}>
        {[
          { n: '5', l: 'направлений проверки' },
          { n: '1 247', l: 'сотрудников в системе' },
          { n: '3 840', l: 'тестов в базе' },
          { n: '280', l: 'видеоуроков' },
        ].map((s, i) => (
          <div key={i} style={{ padding: '36px 24px', borderLeft: i ? '1px solid #E4E8EF' : 'none' }}>
            <div className="s-stat-num" style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 48, letterSpacing: '-0.025em', fontVariantNumeric: 'tabular-nums', color: '#1B4B7A' }}>{s.n}</div>
            <div style={{ fontSize: 14, color: '#5B6778', marginTop: 6 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>

    {/* Footer */}
    <footer className="s-footer" style={{ background: '#0F2D4A', color: '#fff', padding: '48px 40px 32px' }}>
      <div className="s-footer-grid" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: 40, alignItems: 'start' }}>
        <div>
          <img src={LOGO_WHITE} style={{ height: 44, marginBottom: 14 }} alt=""/>
          <p style={{ fontSize: 13, color: '#A8C0D6', lineHeight: 1.5, margin: 0 }}>Система Проверки Единых Компетенций и Тестирования Работников.<br/>Разработано НТЦ «Востоктехносервис».</p>
        </div>
        <div><div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Продукт</div>{['О системе','Учебный центр','Документация','Обновления'].map(x=><div key={x} style={{ fontSize:13, color:'#A8C0D6', marginBottom:8 }}>{x}</div>)}</div>
        <div><div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Поддержка</div>{['Инструкции','FAQ','Связаться с мастером','Техподдержка'].map(x=><div key={x} style={{ fontSize:13, color:'#A8C0D6', marginBottom:8 }}>{x}</div>)}</div>
        <div><div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Контакты</div><div style={{ fontSize:13, color:'#A8C0D6', lineHeight:1.6 }}>support@spektr.kz<br/>+7 (7232) 00-00-00<br/>г. Усть-Каменогорск</div></div>
      </div>
      <div className="s-footer-bottom" style={{ maxWidth: 1280, margin: '32px auto 0', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,.08)', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#8A95A5' }}>
        <span>© 2026 НТЦ «Востоктехносервис». Все права защищены.</span>
        <span>v 1.0.0</span>
      </div>
    </footer>
  </div>
);

export default LandingScreen;
