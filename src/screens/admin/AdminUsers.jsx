import { useState, useMemo } from 'react';
import Icon from '../../components/Icon.jsx';
import { Button, Card, Chip, useToast } from '../../components/Primitives.jsx';
import AdminLayout from './AdminLayout.jsx';
import { EMPLOYEES } from '../../data/employees.js';

const STATUS_LABELS = {
  ok: { tone: 'ok', l: 'В норме' },
  overdue_annual: { tone: 'bad', l: 'Просрочена ежегодная' },
  overdue_medical: { tone: 'bad', l: 'Просрочен медосмотр' },
  overdue_daily: { tone: 'warn', l: 'Не ежедневная' },
  failed_annual: { tone: 'bad', l: 'Провалил ежегодную' },
};

const PERSON_STATE = {
  active: { tone: 'ok', l: 'Активен' },
  vacation: { tone: 'info', l: 'В отпуске' },
  sick: { tone: 'warn', l: 'На больничном' },
};

const AdminUsersScreen = ({ onNav, onLogout }) => {
  const { show: toast, ToastContainer } = useToast();
  const [search, setSearch] = useState('');
  const [section, setSection] = useState('all');
  const [state, setState] = useState('all');
  const [selected, setSelected] = useState(new Set());
  const [showAdd, setShowAdd] = useState(false);

  const sections = useMemo(() => ['all', ...new Set(EMPLOYEES.map(e => e.section))], []);

  const filtered = EMPLOYEES.filter(e => {
    if (search && !e.fullName.toLowerCase().includes(search.toLowerCase()) && !e.tabNumber.includes(search)) return false;
    if (section !== 'all' && e.section !== section) return false;
    if (state !== 'all' && e.status !== state) return false;
    return true;
  });

  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map(e => e.id)));
  };
  const toggle = (id) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  return (
    <AdminLayout active="users" onNav={onNav} onLogout={onLogout} title="Пользователи" subtitle={`Всего ${EMPLOYEES.length} сотрудников · отображено ${filtered.length}`}
      actions={<>
        <Button variant="ghost" icon="download" onClick={() => toast('Список выгружен в Excel', 'ok')}>Экспорт</Button>
        <Button onClick={() => setShowAdd(true)} icon="user">Добавить</Button>
      </>}>
      {/* Фильтры */}
      <Card padding={20} style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1 1 240px', minWidth: 200 }}>
            <Icon name="search" size={16} color="#5B6778" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}/>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск по ФИО или табельному…"
              style={{ width: '100%', padding: '10px 12px 10px 36px', border: '1px solid #E4E8EF', borderRadius: 8, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box' }}/>
          </div>
          <select value={section} onChange={(e) => setSection(e.target.value)} style={{ padding: '10px 12px', border: '1px solid #E4E8EF', borderRadius: 8, fontSize: 14, fontFamily: 'inherit' }}>
            {sections.map(s => <option key={s} value={s}>{s === 'all' ? 'Все участки' : s}</option>)}
          </select>
          <select value={state} onChange={(e) => setState(e.target.value)} style={{ padding: '10px 12px', border: '1px solid #E4E8EF', borderRadius: 8, fontSize: 14, fontFamily: 'inherit' }}>
            <option value="all">Все статусы</option>
            <option value="active">Активные</option>
            <option value="vacation">В отпуске</option>
            <option value="sick">Больничный</option>
          </select>
        </div>
      </Card>

      {selected.size > 0 && (
        <Card padding={14} style={{ marginBottom: 14, background: '#EEF3F8', borderColor: '#1B4B7A' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1, fontSize: 14 }}>Выбрано: <strong>{selected.size}</strong></div>
            <Button variant="ghost" size="sm" onClick={() => { toast(`Уведомление отправлено ${selected.size} сотруднику(ам)`, 'ok'); setSelected(new Set()); }}>Уведомить</Button>
            <Button variant="ghost" size="sm" onClick={() => toast('Массовое изменение участка: в разработке', 'info')}>Изменить участок</Button>
            <Button variant="ghost" size="sm" onClick={() => setSelected(new Set())}>Снять выбор</Button>
          </div>
        </Card>
      )}

      <Card padding={0}>
        <div className="s-table-wrap">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontVariantNumeric: 'tabular-nums' }}>
            <thead>
              <tr>
                <th style={{ padding: '12px 16px', background: '#F7F9FC', borderBottom: '1px solid #E4E8EF', width: 36 }}>
                  <input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleAll}/>
                </th>
                {['ФИО','Таб. №','Должность','Участок','Сост.','Посл. тест','Статус','Действия'].map(h =>
                  <th key={h} style={{ textAlign:'left', padding:'12px 16px', fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'.06em', color:'#5B6778', background:'#F7F9FC', borderBottom:'1px solid #E4E8EF' }}>{h}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((e, i) => {
                const st = STATUS_LABELS[e.testStatus] || STATUS_LABELS.ok;
                const ps = PERSON_STATE[e.status] || PERSON_STATE.active;
                return (
                  <tr key={e.id} style={{ background: selected.has(e.id) ? '#EEF3F8' : i%2 ? '#F7F9FC' : '#fff' }}>
                    <td style={{ padding: '10px 16px' }}><input type="checkbox" checked={selected.has(e.id)} onChange={() => toggle(e.id)}/></td>
                    <td style={{ padding:'10px 16px', fontSize:13, fontWeight: 600 }}>{e.fullName}</td>
                    <td style={{ padding:'10px 16px', fontSize:13, fontFamily:'JetBrains Mono, monospace' }}>{e.tabNumber}</td>
                    <td style={{ padding:'10px 16px', fontSize:13, color: '#475060' }}>{e.position}</td>
                    <td style={{ padding:'10px 16px', fontSize:13, color: '#475060' }}>{e.section}</td>
                    <td style={{ padding:'10px 16px' }}><Chip tone={ps.tone}>{ps.l}</Chip></td>
                    <td style={{ padding:'10px 16px', fontSize:13, fontFamily:'JetBrains Mono, monospace', color: '#5B6778' }}>{e.lastTest}</td>
                    <td style={{ padding:'10px 16px' }}><Chip tone={st.tone}>{st.l}</Chip></td>
                    <td style={{ padding:'10px 16px' }}>
                      <Button variant="ghost" size="sm" onClick={() => toast(`Карточка ${e.fullName.split(' ')[0]}: в разработке`, 'info')}>Открыть</Button>
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
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 14, padding: 28, maxWidth: 480, width: '100%' }}>
            <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 20, margin: '0 0 16px' }}>Добавить сотрудника</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input placeholder="ФИО" style={{ padding: '12px 14px', border: '1px solid #E4E8EF', borderRadius: 8, fontSize: 14 }}/>
              <input placeholder="Табельный номер" style={{ padding: '12px 14px', border: '1px solid #E4E8EF', borderRadius: 8, fontSize: 14 }}/>
              <input placeholder="Должность" style={{ padding: '12px 14px', border: '1px solid #E4E8EF', borderRadius: 8, fontSize: 14 }}/>
              <select style={{ padding: '12px 14px', border: '1px solid #E4E8EF', borderRadius: 8, fontSize: 14 }}>
                <option>Участок № 1</option><option>Участок № 2</option><option>Участок № 3</option><option>Участок № 4</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 }}>
              <Button variant="ghost" onClick={() => setShowAdd(false)}>Отмена</Button>
              <Button onClick={() => { setShowAdd(false); toast('Сотрудник добавлен', 'ok'); }} iconRight="check">Добавить</Button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </AdminLayout>
  );
};

export default AdminUsersScreen;
