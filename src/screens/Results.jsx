import Icon from '../components/Icon.jsx';
import { Button, Chip, Card, MARK } from '../components/Primitives.jsx';

const ResultsScreen = ({ onHome, onRetry }) => {
  const score = 84; const correct = 42; const total = 50;
  const passed = score >= 70;
  const R = 90; const C = 2 * Math.PI * R;
  const offset = C * (1 - score / 100);
  const cats = [
    { n: 'Специфика',            c: 9, t: 10, col: '#1B4B7A' },
    { n: 'Медицина',             c: 8, t: 10, col: '#1F7A3D' },
    { n: 'Пожарная безопасность', c: 7, t: 10, col: '#B8242D' },
    { n: 'ТБ и ОТ',              c: 9, t: 10, col: '#C77A0F' },
    { n: 'Электробезопасность',   c: 9, t: 10, col: '#2F3B4D' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F7F9FC', fontFamily: 'Inter, sans-serif', color: '#1A2332' }}>
      <header className="s-results-header" style={{ background: '#fff', borderBottom: '1px solid #E4E8EF', padding: '16px 40px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <img src={MARK} style={{ height: 28 }} alt=""/>
        <span style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 16 }}>СПЕКТР</span>
        <span style={{ margin: '0 10px', color: '#B8C0CC' }}>/</span>
        <span style={{ fontSize: 14, color: '#5B6778' }}>Результаты теста</span>
        <div style={{ marginLeft: 'auto' }}><Button variant="ghost" onClick={onHome}>В кабинет</Button></div>
      </header>

      <main className="s-results-main" style={{ maxWidth: 1080, margin: '32px auto 60px', padding: '0 40px' }}>
        <Card padding={40} className="s-results-card">
          <div className="s-results-grid" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 48, alignItems: 'center' }}>
            <svg width="220" height="220" viewBox="0 0 220 220">
              <circle cx="110" cy="110" r={R} fill="none" stroke="#EEF1F6" strokeWidth="16"/>
              <circle cx="110" cy="110" r={R} fill="none" stroke={passed ? '#1F7A3D' : '#B8242D'} strokeWidth="16" strokeLinecap="round"
                strokeDasharray={C} strokeDashoffset={offset} transform="rotate(-90 110 110)"/>
              <text x="110" y="108" textAnchor="middle" fontFamily="Manrope" fontWeight="800" fontSize="56" fill="#1A2332" style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.03em' }}>{score}%</text>
              <text x="110" y="138" textAnchor="middle" fontFamily="Inter" fontSize="14" fill="#5B6778" style={{ fontVariantNumeric: 'tabular-nums' }}>{correct} / {total}</text>
            </svg>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, background: passed ? '#EAF5EE' : '#FBECEC', color: passed ? '#176030' : '#941C24', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 12 }}>
                <Icon name={passed?'check':'x'} size={16} color={passed?'#1F7A3D':'#B8242D'}/>
                {passed ? 'Сдано' : 'Не сдано'}
              </div>
              <h1 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 40, letterSpacing: '-0.02em', margin: '0 0 10px', lineHeight: 1.1 }}>Ежегодная проверка знаний</h1>
              <p style={{ fontSize: 15, color: '#5B6778', lineHeight: 1.6, margin: '0 0 24px', maxWidth: 520 }}>
                Проходной балл — 70%. Результат действителен 12 месяцев. Протокол подписан электромастером участка.
              </p>
              <div className="s-results-actions" style={{ display: 'flex', gap: 10 }}>
                <Button variant="secondary" icon="chart">Скачать протокол PDF</Button>
                {!passed && <Button variant="danger" onClick={onRetry}>Пересдать</Button>}
                <Button variant="ghost" onClick={onHome}>Вернуться в кабинет</Button>
              </div>
            </div>
          </div>
        </Card>

        <Card padding={32} style={{ marginTop: 20 }}>
          <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 20, margin: '0 0 24px' }}>По категориям</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {cats.map((c, i) => {
              const pct = c.c / c.t * 100;
              return (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
                    <span style={{ fontWeight: 600 }}>{c.n}</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#5B6778', fontVariantNumeric: 'tabular-nums' }}>{c.c} / {c.t} · {Math.round(pct)}%</span>
                  </div>
                  <div style={{ height: 10, background: '#EEF1F6', borderRadius: 5, overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: c.col, borderRadius: 5 }}/>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card padding={32} style={{ marginTop: 20 }}>
          <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 20, margin: '0 0 8px' }}>Неправильные ответы</h3>
          <p style={{ fontSize: 14, color: '#5B6778', margin: '0 0 20px' }}>Разберите ошибки — они войдут в рекомендованные повторения.</p>
          {[
            { q: 'Допустимое время нахождения в замкнутом пространстве без средств индивидуальной защиты?', cat: 'ТБ и ОТ', right: 'Нахождение без СИЗ запрещено — проход только с газоанализатором и страхующим.' },
            { q: 'Категория помещения насосной по взрывопожарной опасности?', cat: 'Пожарная', right: 'Категория В1 — горючие жидкости в закрытой аппаратуре.' },
          ].map((r,i)=>(
            <div key={i} style={{ padding: '16px 0', borderTop: i?'1px solid #EEF1F6':'none' }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                <Chip tone="bad">{r.cat}</Chip>
                <span style={{ fontSize: 12, color: '#8A95A5', alignSelf: 'center' }}>Вопрос № {18 + i * 5}</span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{r.q}</div>
              <div style={{ fontSize: 14, color: '#5B6778', lineHeight: 1.5 }}><strong style={{ color: '#1F7A3D' }}>Правильно:</strong> {r.right}</div>
            </div>
          ))}
        </Card>
      </main>
    </div>
  );
};

export default ResultsScreen;
