import { useState, useEffect, useRef } from 'react';
import Icon from '../components/Icon.jsx';
import { Button, Chip, Card, MARK } from '../components/Primitives.jsx';

const TestScreen = ({ onFinish, onBack }) => {
  const [current, setCurrent] = useState(11);
  const total = 50;
  const answered = [...Array(11)].map((_,i)=>i); // indices 0..10 answered
  const selected = useRef({});
  const [sel, setSel] = useState(null);
  const [mins, setMins] = useState(42);
  const [secs, setSecs] = useState(17);
  useEffect(() => {
    const t = setInterval(() => {
      setSecs(s => {
        if (s > 0) return s - 1;
        setMins(m => m - 1); return 59;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const timerColor = mins < 5 ? '#B8242D' : '#1A2332';

  const options = [
    'Отключить вводной автомат и повесить запрещающий плакат.',
    'Проверить отсутствие напряжения указателем с проверкой исправности на заведомо работающем участке.',
    'Наложить переносное заземление на все фазы отключённого оборудования.',
    'Все перечисленные действия выполняются последовательно.',
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F7F9FC', fontFamily: 'Inter, sans-serif', color: '#1A2332' }}>
      <header className="s-test-header" style={{ background: '#fff', borderBottom: '1px solid #E4E8EF', padding: '16px 40px', display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={MARK} style={{ height: 28 }} alt=""/>
          <span style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 16, color: '#1A2332' }}>СПЕКТР</span>
        </div>
        <div className="s-test-header-mid" style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: '#5B6778', textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 600 }}>Ежегодная проверка знаний</div>
          <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 18 }}>Вопрос <span style={{ color: '#1B4B7A', fontVariantNumeric: 'tabular-nums' }}>{current + 1}</span> из {total}</div>
        </div>
        <div className="s-test-header-timer" style={{ display: 'flex', alignItems: 'center', gap: 10, background: mins<5?'#FBECEC':'#F7F9FC', padding: '8px 14px', borderRadius: 8 }}>
          <Icon name="timer" size={20} color={timerColor}/>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 22, fontWeight: 600, color: timerColor, fontVariantNumeric: 'tabular-nums' }}>{String(mins).padStart(2,'0')}:{String(secs).padStart(2,'0')}</span>
        </div>
      </header>

      {/* Segmented progress */}
      <div className="s-test-progress" style={{ padding: '16px 40px', background: '#fff', borderBottom: '1px solid #E4E8EF' }}>
        <div style={{ display: 'flex', gap: 3, height: 6 }}>
          {[{c:'#1B4B7A',w:10,n:'Специфика'},{c:'#1F7A3D',w:10,n:'Медицина'},{c:'#B8242D',w:10,n:'Пожарная'},{c:'#C77A0F',w:10,n:'ТБ и ОТ'},{c:'#2F3B4D',w:10,n:'Электро'}].map((s,i)=>(
            <div key={i} style={{ flex: 1, background: '#E4E8EF', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: i < 2 ? '100%' : i === 2 ? '20%' : '0%', height: '100%', background: s.c }}/>
            </div>
          ))}
        </div>
        <div className="s-test-progress-labels" style={{ display: 'flex', gap: 3, marginTop: 6, fontSize: 11, color: '#5B6778' }}>
          {['Специфика','Медицина','Пожарная безопасность','ТБ и ОТ','Электробезопасность'].map((n,i)=><div key={i} style={{flex:1, textAlign:'center'}}>{n}</div>)}
        </div>
      </div>

      <div className="s-test-grid" style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32, padding: '32px 40px', maxWidth: 1280, margin: '0 auto' }}>
        {/* Question mini-map */}
        <aside className="s-test-nav">
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: '#5B6778', marginBottom: 12 }}>Навигация</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
            {[...Array(total)].map((_,i)=>{
              const status = i === current ? 'current' : answered.includes(i) ? 'answered' : 'empty';
              const bg = status==='current'?'#1B4B7A':status==='answered'?'#1F7A3D':'#fff';
              const col = status==='empty'?'#5B6778':'#fff';
              return <div key={i} style={{ aspectRatio:'1', display:'flex', alignItems:'center', justifyContent:'center', background:bg, color:col, fontSize:11, fontWeight:600, borderRadius:4, border: status==='empty'?'1px solid #E4E8EF':'none', fontFamily:'JetBrains Mono, monospace', cursor:'pointer' }}>{i+1}</div>;
            })}
          </div>
          <div style={{ marginTop: 16, display:'flex', flexDirection:'column', gap:6, fontSize:12, color:'#5B6778' }}>
            <div style={{display:'flex',alignItems:'center',gap:8}}><span style={{width:12,height:12,background:'#1F7A3D',borderRadius:3}}/>Отвечено</div>
            <div style={{display:'flex',alignItems:'center',gap:8}}><span style={{width:12,height:12,background:'#1B4B7A',borderRadius:3}}/>Текущий</div>
            <div style={{display:'flex',alignItems:'center',gap:8}}><span style={{width:12,height:12,background:'#fff',border:'1px solid #E4E8EF',borderRadius:3}}/>Не пройден</div>
          </div>
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
                const active = sel === i;
                return (
                  <label key={i} onClick={()=>setSel(i)} style={{ display:'flex', gap:14, padding:'16px 18px', border:`1.5px solid ${active?'#1B4B7A':'#E4E8EF'}`, borderRadius:10, cursor:'pointer', background: active?'#EEF3F8':'#fff', alignItems:'flex-start' }}>
                    <span style={{ width:22, height:22, borderRadius:999, border:`2px solid ${active?'#1B4B7A':'#B8C0CC'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
                      {active && <span style={{ width:10, height:10, borderRadius:999, background:'#1B4B7A' }}/>}
                    </span>
                    <span style={{ fontSize:15, lineHeight:1.5, color:'#1A2332' }}><span style={{ fontFamily:'JetBrains Mono, monospace', fontWeight:600, color:'#5B6778', marginRight:10 }}>{String.fromCharCode(65+i)}</span>{opt}</span>
                  </label>
                );
              })}
            </div>
            <div className="s-test-footer" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, paddingTop: 24, borderTop: '1px solid #EEF1F6' }}>
              <Button variant="ghost" icon="chevron" onClick={()=>setCurrent(Math.max(0,current-1))} style={{flexDirection:'row-reverse'}}>Назад</Button>
              <div className="s-test-footer-right" style={{ display: 'flex', gap: 10 }}>
                <Button variant="quiet">Пропустить</Button>
                <Button onClick={()=>{ if(current===total-1) onFinish && onFinish(); else setCurrent(current+1); setSel(null); }} iconRight="arrow">Ответить</Button>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default TestScreen;
