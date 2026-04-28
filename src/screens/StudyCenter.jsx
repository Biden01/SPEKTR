import Icon from '../components/Icon.jsx';
import { Button, Card, TopBar } from '../components/Primitives.jsx';
import { COURSES } from '../data/courses.js';

// Учебный центр (главная) — green-accented для отличия от корпоративного
const StudyCenterScreen = ({ onLogin, onStudy, onCatalog, onHome }) => (
  <div style={{ background: '#fff', minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#1A2332' }}>
    <TopBar onLogin={onLogin} onRegister={onStudy} onHome={onHome} />

    {/* Hero — green theme */}
    <section style={{ position: 'relative', padding: '88px 40px 72px', background: 'linear-gradient(160deg, #EAF5EE 0%, #fff 70%)' }}>
      <div className="s-hero" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 56, alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#1F7A3D', marginBottom: 18, background: '#fff', padding: '6px 12px', borderRadius: 999, border: '1px solid #CFE7D6' }}>
            <Icon name="graduation" size={14} color="#1F7A3D" />
            Учебный центр НТЦ ВТС
          </div>
          <h1 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 56, lineHeight: 1.05, letterSpacing: '-0.025em', margin: 0 }}>
            Обучение и аттестация специалистов промышленных предприятий
          </h1>
          <p style={{ fontSize: 18, color: '#475060', lineHeight: 1.6, margin: '24px 0 32px', maxWidth: 560 }}>
            Курсы повышения квалификации по электробезопасности, охране труда, пожарной безопасности и работам повышенной опасности. Удостоверения государственного образца.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Button size="lg" variant="success" onClick={onCatalog} iconRight="arrow">Каталог курсов</Button>
            <Button size="lg" variant="secondary" onClick={onStudy}>Зарегистрироваться</Button>
          </div>
        </div>
        <Card padding={28} style={{ borderTop: '4px solid #1F7A3D' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#1F7A3D', marginBottom: 14 }}>Что вы получите</div>
          {[
            { ic: 'check',     t: 'Удостоверение государственного образца' },
            { ic: 'shield',    t: 'Лицензия Министерства образования РК' },
            { ic: 'film',      t: 'Запись лекций в личном кабинете' },
            { ic: 'graduation',t: 'Опытные преподаватели-практики' },
          ].map((x, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i === 3 ? 'none' : '1px solid #EEF1F6' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#EAF5EE', color: '#1F7A3D', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={x.ic} size={16} color="#1F7A3D" />
              </div>
              <span style={{ fontSize: 14, color: '#1A2332' }}>{x.t}</span>
            </div>
          ))}
        </Card>
      </div>
    </section>

    {/* Что мы предлагаем */}
    <section style={{ padding: '72px 40px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#1F7A3D', marginBottom: 12 }}>Направления</div>
        <h2 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 40, letterSpacing: '-0.02em', margin: '0 0 36px' }}>Шесть направлений обучения</h2>
        <div className="s-feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {COURSES.map(c => (
            <Card key={c.id} padding={24} hoverable onClick={onCatalog}>
              <div style={{ fontSize: 36, marginBottom: 12 }} aria-hidden="true">{c.cover}</div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#1F7A3D', marginBottom: 6 }}>{c.direction}</div>
              <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 17, margin: '0 0 10px', lineHeight: 1.3 }}>{c.title}</h3>
              <div style={{ display: 'flex', gap: 14, fontSize: 12, color: '#5B6778', fontFamily: 'JetBrains Mono, monospace', marginBottom: 4 }}>
                <span><Icon name="timer" size={12} color="#5B6778"/> {c.duration}</span>
                <span>·</span>
                <span style={{ color: '#1F7A3D', fontWeight: 600 }}>{c.price}</span>
              </div>
              <div style={{ fontSize: 12, color: '#5B6778', marginTop: 8 }}>Старт: {c.nextStart}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* Преимущества */}
    <section style={{ padding: '72px 40px', background: '#F7F9FC' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 40, letterSpacing: '-0.02em', margin: '0 0 36px' }}>Почему Учебный центр НТЦ ВТС</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }} className="s-feature-grid">
          {[
            { n: '15+',   l: 'лет опыта обучения' },
            { n: '5 800+', l: 'выпускников' },
            { n: '95%',   l: 'успешно сдают' },
            { n: '24/7',  l: 'доступ к материалам' },
          ].map((s, i) => (
            <Card key={i} padding={24}>
              <div style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 36, color: '#1F7A3D', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums', lineHeight: 1, marginBottom: 8 }}>{s.n}</div>
              <div style={{ fontSize: 14, color: '#475060' }}>{s.l}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* Форма заявки на корпоративное обучение */}
    <section style={{ padding: '72px 40px' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <Card padding={40} style={{ borderTop: '4px solid #1F7A3D' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 32, alignItems: 'center' }} className="s-about-security">
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#1F7A3D', marginBottom: 12 }}>Юр. лицам</div>
              <h2 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 28, letterSpacing: '-0.02em', margin: '0 0 12px' }}>Корпоративное обучение</h2>
              <p style={{ fontSize: 15, color: '#475060', margin: 0, lineHeight: 1.6 }}>
                Обучаем группы сотрудников по корпоративной программе с выездом на ваше предприятие или в нашем центре. Оставьте заявку — рассчитаем стоимость.
              </p>
            </div>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input placeholder="Название организации" style={{ padding: '12px 14px', border: '1px solid #E4E8EF', borderRadius: 8, fontFamily: 'inherit', fontSize: 15, minHeight: 48 }} />
              <input placeholder="ФИО ответственного" style={{ padding: '12px 14px', border: '1px solid #E4E8EF', borderRadius: 8, fontFamily: 'inherit', fontSize: 15, minHeight: 48 }} />
              <input placeholder="Телефон или e-mail" style={{ padding: '12px 14px', border: '1px solid #E4E8EF', borderRadius: 8, fontFamily: 'inherit', fontSize: 15, minHeight: 48 }} />
              <Button variant="success" type="submit" iconRight="arrow">Оставить заявку</Button>
            </form>
          </div>
        </Card>
      </div>
    </section>
  </div>
);

export default StudyCenterScreen;
