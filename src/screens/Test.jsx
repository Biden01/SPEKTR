import { useState, useEffect, useMemo } from 'react';
import Icon from '../components/Icon.jsx';
import { Button, Chip, Card, MARK } from '../components/Primitives.jsx';

const TestScreen = ({ onFinish, onBack }) => {
  const total = 50;
  const [current, setCurrent] = useState(11);
  // Pre-seed answers for first 11 questions so mini-map reflects "answered" state.
  const [answers, setAnswers] = useState(() => {
    const init = {};
    for (let i = 0; i < 11; i++) init[i] = Math.floor(Math.random() * 4);
    return init;
  });
  const [sel, setSel] = useState(null);
  const [mins, setMins] = useState(42);
  const [secs, setSecs] = useState(17);
  const [confirmFinish, setConfirmFinish] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setSecs(s => {
        if (s > 0) return s - 1;
        setMins(m => m - 1);
        return 59;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const timerLow = mins < 5;
  const timerColor = timerLow ? '#B8242D' : '#1A2332';

  const options = [
    'Отключить вводной автомат и повесить запрещающий плакат.',
    'Проверить отсутствие напряжения указателем с проверкой исправности на заведомо работающем участке.',
    'Наложить переносное заземление на все фазы отключённого оборудования.',
    'Все перечисленные действия выполняются последовательно.',
  ];

  // Save current selection, then move to index.
  const jumpTo = (idx) => {
    const bounded = Math.max(0, Math.min(total - 1, idx));
    const next = sel !== null ? { ...answers, [current]: sel } : answers;
    if (sel !== null) setAnswers(next);
    setCurrent(bounded);
    setSel(next[bounded] ?? null);
  };

  const handleSubmit = () => {
    if (sel === null) return;
    const next = { ...answers, [current]: sel };
    setAnswers(next);
    if (current === total - 1) {
      onFinish && onFinish();
      return;
    }
    setCurrent(current + 1);
    setSel(next[current + 1] ?? null);
  };

  const handleSkip = () => {
    if (current === total - 1) return;
    const next = sel !== null ? { ...answers, [current]: sel } : answers;
    if (sel !== null) setAnswers(next);
    setCurrent(current + 1);
    setSel(next[current + 1] ?? null);
  };

  const handleBack = () => jumpTo(current - 1);

  const tryFinish = () => {
    const answeredCount = Object.keys(sel !== null ? { ...answers, [current]: sel } : answers).length;
    if (answeredCount < total) {
      setConfirmFinish(true);
      return;
    }
    onFinish && onFinish();
  };

  // Keyboard shortcuts: 1–4, A–D (EN+RU layout ф/и/с/в), ←/→, Enter, Esc
  useEffect(() => {
    const ruToIdx = { 'ф':0,'и':1,'с':2,'в':3,'Ф':0,'И':1,'С':2,'В':3 };
    const onKey = (e) => {
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (confirmFinish) {
        if (e.key === 'Escape') setConfirmFinish(false);
        return;
      }
      if (['1','2','3','4'].includes(e.key)) {
        e.preventDefault();
        setSel(Number(e.key) - 1);
      } else if (/^[a-dA-D]$/.test(e.key)) {
        e.preventDefault();
        setSel(e.key.toLowerCase().charCodeAt(0) - 97);
      } else if (ruToIdx[e.key] !== undefined) {
        e.preventDefault();
        setSel(ruToIdx[e.key]);
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleBack();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sel, current, answers, confirmFinish]);

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const progressPct = Math.round((answeredCount / total) * 100);

  return (
    <div style={{ minHeight: '100vh', background: '#F7F9FC', fontFamily: 'Inter, sans-serif', color: '#1A2332' }}>
      <header className="s-test-header" style={{ background: '#fff', borderBottom: '1px solid #E4E8EF', padding: '16px 40px', display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={MARK} style={{ height: 28 }} alt=""/>
          <span style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 16, color: '#1A2332' }}>СПЕКТР</span>
        </div>
        <div className="s-test-header-mid" style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: '#5B6778', textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 600 }}>Ежегодная проверка знаний</div>
          <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 18 }}>
            Вопрос <span style={{ color: '#1B4B7A', fontVariantNumeric: 'tabular-nums' }}>{current + 1}</span> из {total}
            <span style={{ fontSize: 13, fontWeight: 500, color: '#5B6778', marginLeft: 10 }}>· отвечено {answeredCount}</span>
          </div>
        </div>
        <div className={`s-test-header-timer${timerLow ? ' s-timer-danger' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: 10, background: timerLow ? '#FBECEC' : '#F7F9FC', padding: '8px 14px', borderRadius: 8 }}>
          <Icon name="timer" size={20} color={timerColor}/>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 22, fontWeight: 600, color: timerColor, fontVariantNumeric: 'tabular-nums' }}>{String(mins).padStart(2,'0')}:{String(secs).padStart(2,'0')}</span>
        </div>
      </header>

      {/* Segmented progress */}
      <div className="s-test-progress" style={{ padding: '16px 40px', background: '#fff', borderBottom: '1px solid #E4E8EF' }}>
        <div style={{ display: 'flex', gap: 3, height: 6 }}>
          {[{c:'#1B4B7A'},{c:'#1F7A3D'},{c:'#B8242D'},{c:'#C77A0F'},{c:'#2F3B4D'}].map((s,i)=>(
            <div key={i} style={{ flex: 1, background: '#E4E8EF', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: i < 2 ? '100%' : i === 2 ? '20%' : '0%', height: '100%', background: s.c, transition: 'width 400ms ease' }}/>
            </div>
          ))}
        </div>
        <div className="s-test-progress-labels" style={{ display: 'flex', gap: 3, marginTop: 6, fontSize: 11, color: '#5B6778' }}>
          {['Специфика','Медицина','Пожарная безопасность','ТБ и ОТ','Электробезопасность'].map((n,i)=><div key={i} style={{flex:1, textAlign:'center'}}>{n}</div>)}
        </div>
      </div>

      <div className="s-test-grid" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 32, padding: '32px 40px', maxWidth: 1280, margin: '0 auto' }}>
        {/* Question mini-map */}
        <aside className="s-test-nav">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: '#5B6778' }}>Навигация</div>
            <div style={{ fontSize: 12, color: '#5B6778', fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums' }}>{progressPct}%</div>
          </div>
          <div className="s-test-minimap" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
            {[...Array(total)].map((_,i)=>{
              const isCurrent = i === current;
              const isAnswered = answers[i] !== undefined;
              const bg = isCurrent ? '#1B4B7A' : isAnswered ? '#1F7A3D' : '#fff';
              const col = isCurrent || isAnswered ? '#fff' : '#5B6778';
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => jumpTo(i)}
                  className="s-test-minimap-cell"
                  style={{
                    aspectRatio: '1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: bg,
                    color: col,
                    fontSize: 11,
                    fontWeight: 600,
                    borderRadius: 4,
                    border: !isCurrent && !isAnswered ? '1px solid #E4E8EF' : '1px solid transparent',
                    fontFamily: 'JetBrains Mono, monospace',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'transform 120ms ease, box-shadow 120ms ease',
                  }}
                  aria-label={`Вопрос ${i+1}${isAnswered ? ', отвечен' : ''}${isCurrent ? ', текущий' : ''}`}
                >
                  {i+1}
                </button>
              );
            })}
          </div>
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, color: '#5B6778' }}>
            <div style={{display:'flex',alignItems:'center',gap:8}}><span style={{width:12,height:12,background:'#1F7A3D',borderRadius:3}}/>Отвечено ({answeredCount})</div>
            <div style={{display:'flex',alignItems:'center',gap:8}}><span style={{width:12,height:12,background:'#1B4B7A',borderRadius:3}}/>Текущий</div>
            <div style={{display:'flex',alignItems:'center',gap:8}}><span style={{width:12,height:12,background:'#fff',border:'1px solid #E4E8EF',borderRadius:3}}/>Не пройден ({total - answeredCount})</div>
          </div>

          {/* Keyboard hints */}
          <div className="s-test-kbdhints" style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #E4E8EF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: '#5B6778', marginBottom: 10 }}>
              <Icon name="keyboard" size={14} color="#5B6778"/> Горячие клавиши
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, color: '#5B6778' }}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><span>Выбор</span><span style={{display:'inline-flex',gap:3,alignItems:'center'}}><span className="kbd">1</span>–<span className="kbd">4</span></span></div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><span>Ответить</span><span className="kbd">Enter</span></div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><span>Назад</span><span className="kbd">←</span></div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><span>Далее</span><span className="kbd">→</span></div>
            </div>
          </div>

          <button
            type="button"
            onClick={tryFinish}
            className="s-test-finish-btn"
            style={{
              marginTop: 16, width: '100%', padding: '10px 12px',
              background: '#EEF3F8', color: '#1B4B7A', border: '1px solid #D6E2ED',
              borderRadius: 8, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              transition: 'all 140ms ease',
            }}
          >
            Завершить тест
          </button>
        </aside>

        {/* Question */}
        <section className="s-test-card-wrap">
          <Card padding={36}>
            <Chip tone="bad">Электробезопасность</Chip>
            <h2 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 26, lineHeight: 1.3, margin: '18px 0 28px', letterSpacing: '-0.015em' }}>
              Какие действия обязательны при подготовке рабочего места к работам со снятием напряжения на электроустановке до 1000 В?
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {options.map((opt, i) => {
                const activeOpt = sel === i;
                return (
                  <label key={i} onClick={()=>setSel(i)} className="s-test-option" style={{
                    display: 'flex', gap: 14, padding: '16px 18px',
                    border: `1.5px solid ${activeOpt ? '#1B4B7A' : '#E4E8EF'}`,
                    borderRadius: 10, cursor: 'pointer',
                    background: activeOpt ? '#EEF3F8' : '#fff',
                    alignItems: 'flex-start',
                    transition: 'all 140ms ease',
                  }}>
                    <span style={{ width: 22, height: 22, borderRadius: 999, border: `2px solid ${activeOpt ? '#1B4B7A' : '#B8C0CC'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1, transition: 'border-color 140ms ease' }}>
                      {activeOpt && <span style={{ width: 10, height: 10, borderRadius: 999, background: '#1B4B7A' }}/>}
                    </span>
                    <span style={{ fontSize: 15, lineHeight: 1.5, color: '#1A2332', flex: 1 }}>
                      <span className="kbd" style={{ marginRight: 10 }}>{String.fromCharCode(65 + i)}</span>
                      {opt}
                    </span>
                  </label>
                );
              })}
            </div>
            <div className="s-test-footer" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, paddingTop: 24, borderTop: '1px solid #EEF1F6' }}>
              <Button variant="ghost" icon="chevron" onClick={handleBack} disabled={current === 0} style={{flexDirection:'row-reverse'}}>Назад</Button>
              <div className="s-test-footer-right" style={{ display: 'flex', gap: 10 }}>
                <Button variant="quiet" onClick={handleSkip} disabled={current === total - 1}>Пропустить</Button>
                <Button onClick={handleSubmit} disabled={sel === null} iconRight="arrow">
                  {current === total - 1 ? 'Завершить' : 'Ответить'}
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </div>

      {/* Finish confirmation modal */}
      {confirmFinish && (
        <div
          onClick={() => setConfirmFinish(false)}
          className="s-test-modal-backdrop"
          style={{ position: 'fixed', inset: 0, background: 'rgba(15,45,74,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20 }}
        >
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 14, padding: 32, maxWidth: 440, width: '100%', boxShadow: '0 24px 60px rgba(15,45,74,0.3)' }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: '#FDF4E7', color: '#C77A0F', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Icon name="alert" size={22} color="#C77A0F"/>
            </div>
            <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 22, margin: '0 0 8px' }}>Завершить тест досрочно?</h3>
            <p style={{ fontSize: 14, color: '#5B6778', lineHeight: 1.5, margin: '0 0 20px' }}>
              Отвечено <strong style={{ color: '#1A2332' }}>{answeredCount} из {total}</strong>. Незаполненные вопросы будут зачтены как неверные.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <Button variant="ghost" onClick={() => setConfirmFinish(false)}>Продолжить тест</Button>
              <Button variant="danger" onClick={() => { setConfirmFinish(false); onFinish && onFinish(); }}>Завершить</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestScreen;
