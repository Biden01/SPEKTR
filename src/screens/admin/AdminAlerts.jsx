import { useState } from 'react';
import Icon from '../../components/Icon.jsx';
import { Button, Card, Chip } from '../../components/Primitives.jsx';
import AdminLayout from './AdminLayout.jsx';

const RULES = [
  { id: 1, t: 'Уведомить мастера при провале ежедневной проверки 2 раза подряд', target: 'Мастер участка', channel: 'Email + Push', active: true },
  { id: 2, t: 'Уведомить за 14 дней до ежегодной проверки', target: 'Сотрудник', channel: 'Push', active: true },
  { id: 3, t: 'Уведомить за 7 дней до окончания медосмотра', target: 'Сотрудник + Мастер', channel: 'Email', active: true },
  { id: 4, t: 'Уведомить администратора о просрочках > 3 дней', target: 'Администратор', channel: 'Email', active: true },
  { id: 5, t: 'Еженедельный отчёт по участку', target: 'Мастер участка', channel: 'Email', active: false },
];

const SENT = [
  { dt: '28.04.2026 09:14', to: 'sidorov@vts.kz', t: 'Просрочка ежегодной проверки' },
  { dt: '28.04.2026 08:00', to: 'petrova@vts.kz', t: 'Еженедельная сводка по Участку № 3' },
  { dt: '27.04.2026 14:35', to: 'emp_006@vts.kz', t: 'Медосмотр истекает через 5 дней' },
  { dt: '26.04.2026 16:00', to: 'emp_011@vts.kz', t: 'Требуется пересдача ежегодной' },
];

const AdminAlertsScreen = ({ onNav, onLogout }) => {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <AdminLayout active="alerts" onNav={onNav} onLogout={onLogout} title="Оповещения" subtitle="Правила автоматических уведомлений и шаблоны"
      actions={<Button onClick={() => setShowAdd(true)}>Создать правило</Button>}>

      <div className="s-card-grid-2" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20, marginBottom: 20 }}>
        <Card padding={0}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #EEF1F6' }}>
            <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 16, margin: 0 }}>Правила ({RULES.length})</h3>
          </div>
          {RULES.map((r, i) => (
            <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderBottom: i === RULES.length - 1 ? 'none' : '1px solid #EEF1F6' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: r.active ? '#EAF5EE' : '#EEF1F6', color: r.active ? '#1F7A3D' : '#8A95A5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="bell" size={18}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{r.t}</div>
                <div style={{ fontSize: 12, color: '#5B6778' }}>{r.target} · {r.channel}</div>
              </div>
              <Chip tone={r.active ? 'ok' : 'neutral'}>{r.active ? 'Активно' : 'Отключено'}</Chip>
              <Button variant="ghost" size="sm">Изменить</Button>
            </div>
          ))}
        </Card>

        <Card padding={0}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #EEF1F6' }}>
            <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 16, margin: 0 }}>Последние отправки</h3>
          </div>
          {SENT.map((s, i) => (
            <div key={i} style={{ padding: '12px 20px', borderBottom: i === SENT.length - 1 ? 'none' : '1px solid #EEF1F6' }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{s.t}</div>
              <div style={{ fontSize: 11, color: '#5B6778', fontFamily: 'JetBrains Mono, monospace' }}>{s.dt} · {s.to}</div>
            </div>
          ))}
        </Card>
      </div>

      <Card padding={24}>
        <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 16, margin: '0 0 14px' }}>Шаблоны сообщений</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {[
            { t: 'Просрочка проверки', body: 'Уважаемый/ая {ФИО}, у вас просрочена {тип проверки} на {N} дней. Пройдите проверку незамедлительно.' },
            { t: 'Напоминание о сроке', body: 'Через {N} дней истекает срок {тип проверки}. Рекомендуем пройти заранее.' },
            { t: 'Медосмотр', body: 'Срок прохождения медосмотра истекает {дата}. Запишитесь через мастера.' },
            { t: 'Сводка участка', body: 'Еженедельная сводка по {участок}: пройдено {N} тестов, средний балл {%}.' },
          ].map((tmp, i) => (
            <div key={i} style={{ padding: 14, border: '1px solid #E4E8EF', borderRadius: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{tmp.t}</div>
              <div style={{ fontSize: 12, color: '#475060', lineHeight: 1.5 }}>{tmp.body}</div>
            </div>
          ))}
        </div>
      </Card>

      {showAdd && (
        <div onClick={() => setShowAdd(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(15,45,74,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 14, padding: 28, maxWidth: 480, width: '100%' }}>
            <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 20, margin: '0 0 16px' }}>Новое правило оповещения</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input placeholder="Название правила" style={{ padding: '12px 14px', border: '1px solid #E4E8EF', borderRadius: 8, fontSize: 14 }}/>
              <select style={{ padding: '12px 14px', border: '1px solid #E4E8EF', borderRadius: 8, fontSize: 14 }}>
                <option>Триггер: Просрочка проверки</option>
                <option>Триггер: До истечения срока</option>
                <option>Триггер: Провал теста</option>
              </select>
              <select style={{ padding: '12px 14px', border: '1px solid #E4E8EF', borderRadius: 8, fontSize: 14 }}>
                <option>Получатель: Сотрудник</option>
                <option>Получатель: Мастер</option>
                <option>Получатель: Администратор</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 }}>
              <Button variant="ghost" onClick={() => setShowAdd(false)}>Отмена</Button>
              <Button onClick={() => { setShowAdd(false); alert('Правило создано'); }}>Создать</Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminAlertsScreen;
