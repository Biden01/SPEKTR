import { useState } from 'react';
import Icon from '../../components/Icon.jsx';
import { Button, Card, Chip, useToast } from '../../components/Primitives.jsx';
import AdminLayout from './AdminLayout.jsx';
import { RESULTS } from '../../data/results.js';
import { EMPLOYEES } from '../../data/employees.js';
import { CATEGORIES } from '../../data/categories.js';

const AdminReportsScreen = ({ onNav, onLogout }) => {
  const { show: toast, ToastContainer } = useToast();
  const [periodFrom, setPeriodFrom] = useState('2026-04-01');
  const [periodTo, setPeriodTo] = useState('2026-04-28');

  const avgScore = Math.round(RESULTS.reduce((a, r) => a + r.pct, 0) / RESULTS.length);
  const passRate = Math.round((RESULTS.filter(r => r.status === 'ok').length / RESULTS.length) * 100);
  const failRate = 100 - passRate;
  const avgDuration = Math.round(RESULTS.reduce((a, r) => a + r.durationMin, 0) / RESULTS.length);

  // Группировка по участкам — % сдач
  const sections = ['Участок № 1', 'Участок № 2', 'Участок № 3', 'Участок № 4'];
  const sectionStats = sections.map(sec => {
    const employees = EMPLOYEES.filter(e => e.section === sec);
    const empResults = RESULTS.filter(r => employees.find(e => e.id === r.userId));
    const ok = empResults.filter(r => r.status === 'ok').length;
    return { name: sec, total: empResults.length, ok, pct: empResults.length ? Math.round((ok / empResults.length) * 100) : 0 };
  });

  // Динамика по категориям (синтетика для демо)
  const trend = CATEGORIES.map(c => ({ ...c, pct: 70 + Math.round(Math.cos(c.id.charCodeAt(0) * 7) * 18 + 10) }));

  return (
    <AdminLayout active="reports" onNav={onNav} onLogout={onLogout} title="Отчёты" subtitle="Аналитика по тестированию персонала"
      actions={<>
        <Button variant="ghost" icon="download" onClick={() => toast('Отчёт сохранён как PDF', 'ok')}>PDF</Button>
        <Button icon="download" onClick={() => toast('Отчёт выгружен в Excel', 'ok')}>Excel</Button>
      </>}>

      {/* Фильтры */}
      <Card padding={20} style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#5B6778', marginBottom: 4 }}>Период с</div>
            <input type="date" value={periodFrom} onChange={(e) => setPeriodFrom(e.target.value)} style={{ padding: '8px 10px', border: '1px solid #E4E8EF', borderRadius: 6, fontSize: 13 }}/>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#5B6778', marginBottom: 4 }}>по</div>
            <input type="date" value={periodTo} onChange={(e) => setPeriodTo(e.target.value)} style={{ padding: '8px 10px', border: '1px solid #E4E8EF', borderRadius: 6, fontSize: 13 }}/>
          </div>
          <select style={{ padding: '8px 10px', border: '1px solid #E4E8EF', borderRadius: 6, fontSize: 13 }}>
            <option>Все участки</option>{sections.map(s => <option key={s}>{s}</option>)}
          </select>
          <select style={{ padding: '8px 10px', border: '1px solid #E4E8EF', borderRadius: 6, fontSize: 13 }}>
            <option>Все категории</option>{CATEGORIES.map(c => <option key={c.id}>{c.name}</option>)}
          </select>
          <select style={{ padding: '8px 10px', border: '1px solid #E4E8EF', borderRadius: 6, fontSize: 13 }}>
            <option>Все тесты</option><option>Ежедневная</option><option>Ежегодная</option>
          </select>
        </div>
      </Card>

      {/* Метрики */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }} className="s-feature-grid">
        {[
          { l: 'Средний балл', v: avgScore + '%', c: avgScore >= 80 ? '#1F7A3D' : '#C77A0F' },
          { l: '% сдач',        v: passRate + '%', c: '#1F7A3D' },
          { l: '% не сдач',     v: failRate + '%', c: '#B8242D' },
          { l: 'Среднее время', v: avgDuration + ' мин', c: '#1B4B7A' },
        ].map((k, i) => (
          <Card key={i} padding={20}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#5B6778', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 6 }}>{k.l}</div>
            <div style={{ fontFamily: 'Manrope', fontSize: 32, fontWeight: 800, color: k.c, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{k.v}</div>
          </Card>
        ))}
      </div>

      {/* Бары по участкам */}
      <div className="s-card-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <Card padding={24}>
          <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 16, margin: '0 0 16px' }}>Результаты по участкам</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {sectionStats.map(s => (
              <div key={s.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                  <span>{s.name}</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>{s.pct}% ({s.ok}/{s.total})</span>
                </div>
                <div style={{ height: 10, background: '#EEF1F6', borderRadius: 5, overflow: 'hidden' }}>
                  <div style={{ width: `${s.pct}%`, height: '100%', background: s.pct >= 80 ? '#1F7A3D' : s.pct >= 70 ? '#C77A0F' : '#B8242D', transition: 'width 700ms ease' }}/>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card padding={24}>
          <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 16, margin: '0 0 16px' }}>Динамика по категориям</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {trend.map(t => (
              <div key={t.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                  <span>{t.name}</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>{t.pct}%</span>
                </div>
                <div style={{ height: 10, background: '#EEF1F6', borderRadius: 5, overflow: 'hidden' }}>
                  <div style={{ width: `${t.pct}%`, height: '100%', background: t.color, transition: 'width 700ms ease' }}/>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Таблица */}
      <Card padding={0}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #EEF1F6' }}>
          <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 16, margin: 0 }}>Детальные результаты ({RESULTS.length})</h3>
        </div>
        <div className="s-table-wrap">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontVariantNumeric: 'tabular-nums' }}>
            <thead>
              <tr>{['Дата','Сотрудник','Тест','Длительность','Результат','Статус'].map(h =>
                <th key={h} style={{ textAlign:'left', padding:'10px 16px', fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'.06em', color:'#5B6778', background:'#F7F9FC', borderBottom:'1px solid #E4E8EF' }}>{h}</th>
              )}</tr>
            </thead>
            <tbody>
              {RESULTS.slice(0, 15).map((r, i) => {
                const emp = EMPLOYEES.find(e => e.id === r.userId);
                return (
                  <tr key={r.id} style={{ background: i%2 ? '#F7F9FC' : '#fff' }}>
                    <td style={{ padding:'10px 16px', fontSize:13, fontFamily:'JetBrains Mono, monospace' }}>{r.date}</td>
                    <td style={{ padding:'10px 16px', fontSize:13, fontWeight: 600 }}>{emp?.fullName.split(' ').slice(0,2).join(' ') || r.userId}</td>
                    <td style={{ padding:'10px 16px', fontSize:13 }}>{r.testName}</td>
                    <td style={{ padding:'10px 16px', fontSize:13, fontFamily:'JetBrains Mono, monospace', color: '#5B6778' }}>{r.durationMin} мин</td>
                    <td style={{ padding:'10px 16px', fontSize:13, fontFamily:'JetBrains Mono, monospace', fontWeight: 600 }}>{r.score}/{r.total} · {r.pct}%</td>
                    <td style={{ padding:'10px 16px' }}><Chip tone={r.status}>{r.status === 'ok' ? 'Сдано' : 'Не сдано'}</Chip></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      <ToastContainer />
    </AdminLayout>
  );
};

export default AdminReportsScreen;
