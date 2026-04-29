import { useState, useMemo } from 'react';
import Icon from '../../components/Icon.jsx';
import { Button, Card, Chip, useToast } from '../../components/Primitives.jsx';
import AdminLayout from './AdminLayout.jsx';
import { QUESTIONS } from '../../data/questions.js';
import { CATEGORIES, getCategoryById } from '../../data/categories.js';

const AdminQuestionsScreen = ({ onNav, onLogout }) => {
  const { show: toast, ToastContainer } = useToast();
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const [diff, setDiff] = useState('all');
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState(new Set());

  const filtered = QUESTIONS.filter(q => {
    if (search && !q.text.toLowerCase().includes(search.toLowerCase())) return false;
    if (cat !== 'all' && q.category !== cat) return false;
    if (diff !== 'all' && q.difficulty !== diff) return false;
    return true;
  });

  const counts = useMemo(() => {
    const m = { total: QUESTIONS.length };
    CATEGORIES.forEach(c => { m[c.id] = QUESTIONS.filter(q => q.category === c.id).length; });
    return m;
  }, []);

  const toggle = (id) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  return (
    <AdminLayout active="questions" onNav={onNav} onLogout={onLogout} title="База вопросов" subtitle={`Всего ${QUESTIONS.length} вопросов в 5 категориях · отображено ${filtered.length}`}
      actions={<>
        <Button variant="ghost" icon="download" onClick={() => toast('База вопросов выгружена', 'ok')}>Экспорт</Button>
        <Button onClick={() => setShowAdd(true)}>Добавить вопрос</Button>
      </>}>

      {/* KPI по категориям */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 20 }} className="s-cat-grid">
        {CATEGORIES.map(c => (
          <Card key={c.id} padding={14} hoverable onClick={() => setCat(c.id)} style={{ borderTop: `3px solid ${c.color}` }}>
            <div style={{ fontFamily: 'Manrope', fontSize: 24, fontWeight: 800, color: c.color, fontVariantNumeric: 'tabular-nums', lineHeight: 1, marginBottom: 4 }}>{counts[c.id]}</div>
            <div style={{ fontSize: 12, color: '#3A4657', fontWeight: 600 }}>{c.short}</div>
          </Card>
        ))}
      </div>

      {/* Фильтры */}
      <Card padding={16} style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1 1 280px', minWidth: 200 }}>
            <Icon name="search" size={16} color="#5B6778" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}/>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск по тексту вопроса…"
              style={{ width: '100%', padding: '10px 12px 10px 36px', border: '1px solid #E4E8EF', borderRadius: 8, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box' }}/>
          </div>
          <select value={cat} onChange={(e) => setCat(e.target.value)} style={{ padding: '10px 12px', border: '1px solid #E4E8EF', borderRadius: 8, fontSize: 14 }}>
            <option value="all">Все категории</option>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select value={diff} onChange={(e) => setDiff(e.target.value)} style={{ padding: '10px 12px', border: '1px solid #E4E8EF', borderRadius: 8, fontSize: 14 }}>
            <option value="all">Любая сложность</option>
            <option value="easy">Лёгкие</option>
            <option value="medium">Средние</option>
            <option value="hard">Сложные</option>
          </select>
        </div>
      </Card>

      {selected.size > 0 && (
        <Card padding={12} style={{ marginBottom: 14, background: '#EEF3F8', borderColor: '#1B4B7A' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ flex: 1, fontSize: 13 }}>Выбрано: <strong>{selected.size}</strong></div>
            <Button variant="ghost" size="sm">Изменить категорию</Button>
            <Button variant="danger" size="sm">Удалить</Button>
            <Button variant="ghost" size="sm" onClick={() => setSelected(new Set())}>Отмена</Button>
          </div>
        </Card>
      )}

      <Card padding={0}>
        <div className="s-table-wrap">
          <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th style={{ width: 40, padding: '12px 16px', background: '#F7F9FC', borderBottom: '1px solid #E4E8EF' }}>
                  <input type="checkbox"/>
                </th>
                <th style={{ width: 80, textAlign:'left', padding:'12px 16px', fontSize:11, fontWeight:600, textTransform:'uppercase', color:'#5B6778', background:'#F7F9FC', borderBottom:'1px solid #E4E8EF' }}>ID</th>
                <th style={{ width: 140, textAlign:'left', padding:'12px 16px', fontSize:11, fontWeight:600, textTransform:'uppercase', color:'#5B6778', background:'#F7F9FC', borderBottom:'1px solid #E4E8EF' }}>Категория</th>
                <th style={{ textAlign:'left', padding:'12px 16px', fontSize:11, fontWeight:600, textTransform:'uppercase', color:'#5B6778', background:'#F7F9FC', borderBottom:'1px solid #E4E8EF' }}>Вопрос</th>
                <th style={{ width: 120, textAlign:'left', padding:'12px 16px', fontSize:11, fontWeight:600, textTransform:'uppercase', color:'#5B6778', background:'#F7F9FC', borderBottom:'1px solid #E4E8EF' }}>Сложность</th>
                <th style={{ width: 120, textAlign:'left', padding:'12px 16px', fontSize:11, fontWeight:600, textTransform:'uppercase', color:'#5B6778', background:'#F7F9FC', borderBottom:'1px solid #E4E8EF' }}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 50).map((q, i) => {
                const c = getCategoryById(q.category);
                return (
                  <tr key={q.id} style={{ background: selected.has(q.id) ? '#EEF3F8' : i%2 ? '#F7F9FC' : '#fff' }}>
                    <td style={{ padding: '10px 16px' }}><input type="checkbox" checked={selected.has(q.id)} onChange={() => toggle(q.id)}/></td>
                    <td style={{ padding: '10px 16px', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: '#5B6778' }}>{q.id}</td>
                    <td style={{ padding: '10px 16px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', background: c.bg, color: c.color }}>{c.short}</span>
                    </td>
                    <td style={{ padding: '10px 16px', fontSize: 13, color: '#1A2332', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{q.text}</td>
                    <td style={{ padding: '10px 16px' }}>
                      <Chip tone={q.difficulty === 'hard' ? 'bad' : q.difficulty === 'medium' ? 'warn' : 'ok'}>
                        {q.difficulty === 'hard' ? 'Сложная' : q.difficulty === 'medium' ? 'Средняя' : 'Лёгкая'}
                      </Chip>
                    </td>
                    <td style={{ padding: '10px 16px' }}>
                      <Button variant="ghost" size="sm" onClick={() => toast(`Редактор вопроса: в разработке`, 'info')}>Изменить</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {showAdd && (
        <div onClick={() => setShowAdd(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(15,45,74,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 14, padding: 28, maxWidth: 600, width: '100%' }}>
            <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 20, margin: '0 0 16px' }}>Добавить вопрос</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <textarea placeholder="Текст вопроса" rows={3} style={{ padding: '12px 14px', border: '1px solid #E4E8EF', borderRadius: 8, fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}/>
              {[1,2,3,4].map(n => (
                <div key={n} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input type="radio" name="correct" value={n} defaultChecked={n === 1}/>
                  <input placeholder={`Вариант ${n}`} style={{ flex: 1, padding: '10px 14px', border: '1px solid #E4E8EF', borderRadius: 8, fontSize: 14 }}/>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 8 }}>
                <select style={{ flex: 1, padding: '10px 14px', border: '1px solid #E4E8EF', borderRadius: 8, fontSize: 14 }}>
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <select style={{ flex: 1, padding: '10px 14px', border: '1px solid #E4E8EF', borderRadius: 8, fontSize: 14 }}>
                  <option value="easy">Лёгкая</option>
                  <option value="medium">Средняя</option>
                  <option value="hard">Сложная</option>
                </select>
              </div>
              <textarea placeholder="Объяснение правильного ответа" rows={2} style={{ padding: '12px 14px', border: '1px solid #E4E8EF', borderRadius: 8, fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}/>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 }}>
              <Button variant="ghost" onClick={() => setShowAdd(false)}>Отмена</Button>
              <Button onClick={() => { setShowAdd(false); toast('Вопрос добавлен в базу', 'ok'); }} iconRight="check">Сохранить</Button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </AdminLayout>
  );
};

export default AdminQuestionsScreen;
