import { useState, useMemo } from 'react';
import Icon from '../components/Icon.jsx';
import { Button, Card, TopBar, Chip } from '../components/Primitives.jsx';
import { COURSES } from '../data/courses.js';

// Каталог курсов — поиск + фильтры + сетка
const CourseCatalogScreen = ({ onLogin, onStudy, onHome }) => {
  const [q, setQ] = useState('');
  const [direction, setDirection] = useState('all');
  const [format, setFormat] = useState('all');

  const directions = useMemo(() => ['all', ...new Set(COURSES.map(c => c.direction))], []);
  const formats = ['all', 'online', 'offline', 'mixed'];

  const filtered = COURSES.filter(c => {
    if (q && !c.title.toLowerCase().includes(q.toLowerCase()) && !c.direction.toLowerCase().includes(q.toLowerCase())) return false;
    if (direction !== 'all' && c.direction !== direction) return false;
    if (format !== 'all' && c.format !== format) return false;
    return true;
  });

  const formatLabel = { online: 'Онлайн', offline: 'Очно', mixed: 'Смешанный', all: 'Все' };

  return (
    <div style={{ background: '#F7F9FC', minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#1A2332' }}>
      <TopBar onLogin={onLogin} onRegister={onStudy} onHome={onHome} />

      {/* Header */}
      <section style={{ background: '#fff', padding: '40px 40px 32px', borderBottom: '1px solid #E4E8EF' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#1F7A3D', marginBottom: 12 }}>Учебный центр</div>
          <h1 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 40, letterSpacing: '-0.02em', margin: '0 0 24px' }}>Каталог курсов</h1>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: 480 }}>
            <Icon name="search" size={18} color="#5B6778" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Поиск по названию или направлению…"
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '12px 14px 12px 44px',
                border: '1px solid #E4E8EF', borderRadius: 10,
                fontFamily: 'inherit', fontSize: 15, minHeight: 48,
                outline: 'none', background: '#F7F9FC',
              }}
            />
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section style={{ padding: '32px 40px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '240px 1fr', gap: 32 }} className="s-catalog-grid">
          {/* Sidebar filters */}
          <aside>
            <div style={{ position: 'sticky', top: 92 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#5B6778', marginBottom: 14 }}>Направление</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 24 }}>
                {directions.map(d => (
                  <button key={d} type="button" onClick={() => setDirection(d)}
                    style={{
                      padding: '8px 12px', border: 'none', background: direction === d ? '#EEF3F8' : 'transparent',
                      color: direction === d ? '#1B4B7A' : '#3A4657', fontWeight: direction === d ? 600 : 500,
                      fontSize: 14, borderRadius: 6, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                      transition: 'background 140ms ease',
                    }}>
                    {d === 'all' ? 'Все направления' : d}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#5B6778', marginBottom: 14 }}>Формат</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {formats.map(f => (
                  <button key={f} type="button" onClick={() => setFormat(f)}
                    style={{
                      padding: '8px 12px', border: 'none', background: format === f ? '#EEF3F8' : 'transparent',
                      color: format === f ? '#1B4B7A' : '#3A4657', fontWeight: format === f ? 600 : 500,
                      fontSize: 14, borderRadius: 6, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                    }}>
                    {formatLabel[f]}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 14, color: '#475060' }}>Найдено <strong>{filtered.length}</strong> курсов</div>
            </div>
            {filtered.length === 0 ? (
              <Card padding={40}>
                <div style={{ textAlign: 'center', color: '#5B6778' }}>
                  <Icon name="search" size={40} color="#B8C0CC" style={{ marginBottom: 12 }} />
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#1A2332', marginBottom: 4 }}>Ничего не найдено</div>
                  <div style={{ fontSize: 14 }}>Попробуйте изменить фильтры или поисковый запрос</div>
                </div>
              </Card>
            ) : (
              <div className="s-feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
                {filtered.map(c => (
                  <Card key={c.id} padding={24} hoverable>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                      <div style={{ fontSize: 36 }} aria-hidden="true">{c.cover}</div>
                      <Chip tone={c.format === 'online' ? 'info' : c.format === 'offline' ? 'warn' : 'ok'}>{formatLabel[c.format]}</Chip>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#1F7A3D', marginBottom: 6 }}>{c.direction}</div>
                    <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 18, margin: '0 0 14px', lineHeight: 1.3 }}>{c.title}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#475060', marginBottom: 16 }}>
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Icon name="timer" size={14} color="#5B6778"/> {c.duration}</div>
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Icon name="user" size={14} color="#5B6778"/> {c.teacher}</div>
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Icon name="clipboard" size={14} color="#5B6778"/> Старт {c.nextStart}</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTop: '1px solid #EEF1F6' }}>
                      <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 20, color: '#1F7A3D' }}>{c.price}</div>
                      <Button variant="success" size="sm" onClick={onStudy} iconRight="arrow">Записаться</Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseCatalogScreen;
