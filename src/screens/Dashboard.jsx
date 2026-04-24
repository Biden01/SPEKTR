import Icon from '../components/Icon.jsx';
import { Button, Chip, Card, Alert, Sidebar, BottomNav } from '../components/Primitives.jsx';

const DashboardScreen = ({ onStartTest, onLogout }) => (
  <div className="s-dashboard" style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', background: '#F7F9FC', color: '#1A2332' }}>
    <Sidebar active="home" user={{ name: 'Иван Петров', id: '48213' }} />
    <main className="s-main" style={{ flex: 1, padding: '28px 40px 60px', overflow: 'auto' }}>
      <header className="s-main-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, gap: 16 }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 13, color: '#475060', marginBottom: 4 }}>{new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
          <h1 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 32, letterSpacing: '-0.02em', margin: 0 }}>Здравствуйте, Иван Петров</h1>
          <div className="s-main-header-sub" style={{ fontSize: 14, color: '#3A4657', marginTop: 4 }}>Электромонтёр 5 разряда · Участок № 3 · Таб. № 48213</div>
        </div>
        <div className="s-main-header-actions" style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
          <Button variant="ghost" icon="bell" aria-label="Уведомления: 2 новых"><span style={{display:'inline-flex',alignItems:'center',gap:6}}>Уведомления <span style={{background:'#B8242D',color:'#fff',fontSize:11,fontWeight:700,padding:'1px 7px',borderRadius:999,minWidth:18,textAlign:'center'}}>2</span></span></Button>
          <Button variant="ghost" icon="logout" onClick={onLogout}>Выход</Button>
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        <Alert tone="bad" title="Ежегодная проверка знаний — срок подошёл" description="Осталось 14 дней. 50 вопросов, 60 минут." action="Пройти сейчас" onAction={onStartTest}/>
        <Alert tone="warn" title="Медосмотр просрочен на 12 дней" description="Обратитесь к мастеру участка для записи."/>
      </div>

      <div className="s-card-grid-2" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20, marginBottom: 24 }}>
        <Card padding={28} style={{ borderLeft: '4px solid #1B4B7A' }}>
          <div className="s-daily-card-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20 }}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#1B4B7A', marginBottom: 8 }}>Ежедневная проверка</div>
              <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 24, margin: '0 0 8px' }}>10 вопросов · 10 минут</h3>
              <p style={{ fontSize: 14, color: '#475060', margin: 0 }}>Допуск к смене. Проходить до 08:00 каждого рабочего дня.</p>
            </div>
            <Chip tone="neutral">Не пройдено</Chip>
          </div>
          {/* Progress bar with striped empty state — clearer than a flat gray bar */}
          <div style={{ position: 'relative', height: 8, background: 'repeating-linear-gradient(45deg, #EEF1F6 0 8px, #E4E8EF 8px 16px)', borderRadius: 4, marginTop: 24 }}
               role="progressbar" aria-valuenow={0} aria-valuemin={0} aria-valuemax={10} aria-label="Прогресс ежедневной проверки"/>
          <div className="s-daily-card-foot" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#475060', fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums' }}>
              <Icon name="clipboard" size={14} color="#475060"/>
              Сегодня · 0 / 10
            </div>
            <Button onClick={onStartTest} iconRight="arrow">Начать</Button>
          </div>
        </Card>
        <Card padding={28} style={{ borderLeft: '4px solid #B8242D' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#B8242D' }}>Ежегодная проверка</div>
            <Chip tone="bad">Срочно</Chip>
          </div>
          <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 24, margin: '0 0 20px' }}>Осталось 14 дней</h3>
          <div className="s-annual-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: '#475060', marginBottom: 20 }}>
            <div><div style={{ fontFamily:'Manrope', fontSize:22, fontWeight:700, color:'#1A2332', lineHeight: 1 }}>50</div><div style={{ marginTop: 4 }}>вопросов</div></div>
            <div><div style={{ fontFamily:'Manrope', fontSize:22, fontWeight:700, color:'#1A2332', lineHeight: 1 }}>60</div><div style={{ marginTop: 4 }}>минут</div></div>
            <div><div style={{ fontFamily:'Manrope', fontSize:22, fontWeight:700, color:'#1A2332', lineHeight: 1 }}>70%</div><div style={{ marginTop: 4 }}>проходной</div></div>
          </div>
          <Button variant="danger" fullWidth iconRight="arrow" onClick={onStartTest}>Пройти сейчас</Button>
        </Card>
      </div>

      <div className="s-action-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { ic:'film',   t:'Видеоуроки',          s:'12 новых',         bg:'#EEF3F8', fg:'#1B4B7A' },
          { ic:'target', t:'Теоретический экзамен', s:'5 узлов',         bg:'#EAF5EE', fg:'#1F7A3D' },
          { ic:'shield', t:'Безопасный труд',     s:'8 протоколов',     bg:'#FBECEC', fg:'#B8242D' },
          { ic:'chart',  t:'История результатов', s:'За 12 месяцев',    bg:'#FDF4E7', fg:'#C77A0F' },
        ].map((c,i)=>(
          <Card key={i} padding={20} hoverable>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={c.ic} size={22} color={c.fg}/>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 15, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.t}</div>
                <div style={{ fontSize: 12, color: '#475060', marginTop: 2 }}>{c.s}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card padding={0}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #EEF1F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 18, margin: 0 }}>Последние результаты</h4>
          <a href="#" style={{ fontSize: 13, color: '#1B4B7A', textDecoration: 'none', fontWeight: 500 }}>Все результаты →</a>
        </div>
        <div className="s-table-wrap">
        <table style={{ width: '100%', borderCollapse: 'collapse', fontVariantNumeric: 'tabular-nums' }}>
          <thead><tr>{['Дата','Тест','Результат','Статус'].map(h=><th key={h} style={{ textAlign:'left', padding:'12px 24px', fontSize:12, fontWeight:600, textTransform:'uppercase', letterSpacing:'.06em', color:'#5B6778', background:'#F7F9FC', borderBottom:'1px solid #E4E8EF' }}>{h}</th>)}</tr></thead>
          <tbody>
            {[
              ['22.04.2026','Электробезопасность IV','9 / 10 · 90 %','ok','Сдано'],
              ['20.04.2026','Пожарная безопасность','6 / 10 · 60 %','bad','Не сдано'],
              ['18.04.2026','Охрана труда','10 / 10 · 100 %','ok','Сдано'],
            ].map((r,i)=>(
              <tr key={i} className="s-table-row" style={{ background: i%2?'#F7F9FC':'#fff', cursor: 'pointer', transition: 'background 140ms ease' }}>
                <td style={{ padding:'14px 24px', fontSize:14, fontFamily:'JetBrains Mono, monospace' }}>{r[0]}</td>
                <td style={{ padding:'14px 24px', fontSize:14 }}>{r[1]}</td>
                <td style={{ padding:'14px 24px', fontSize:14, fontFamily:'JetBrains Mono, monospace' }}>{r[2]}</td>
                <td style={{ padding:'14px 24px' }}><Chip tone={r[3]}>{r[4]}</Chip></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        {/* Mobile card list — table alternative */}
        <div className="s-table-mobile">
          {[
            ['22.04.2026','Электробезопасность IV','9 / 10 · 90 %','ok','Сдано'],
            ['20.04.2026','Пожарная безопасность','6 / 10 · 60 %','bad','Не сдано'],
            ['18.04.2026','Охрана труда','10 / 10 · 100 %','ok','Сдано'],
          ].map((r,i)=>(
            <div key={i} className="s-table-mobile-row">
              <div className="s-table-mobile-row-info">
                <div className="s-tmr-name">{r[1]}</div>
                <div className="s-tmr-meta">{r[0]} &middot; {r[2]}</div>
              </div>
              <Chip tone={r[3]}>{r[4]}</Chip>
            </div>
          ))}
        </div>
      </Card>
    </main>
    <BottomNav active="home" />
  </div>
);

export default DashboardScreen;
