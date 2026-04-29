import { useState } from 'react';
import Icon from '../../components/Icon.jsx';
import { Button, Card, Chip } from '../../components/Primitives.jsx';
import AdminLayout from './AdminLayout.jsx';
import { CATEGORIES } from '../../data/categories.js';

const AdminSettingsScreen = ({ onNav, onLogout }) => {
  const [tab, setTab] = useState('general');

  const tabs = [
    { id: 'general',     l: 'Общие' },
    { id: 'tests',       l: 'Параметры тестов' },
    { id: 'categories',  l: 'Категории' },
    { id: 'sections',    l: 'Участки и должности' },
    { id: 'integrations',l: 'Интеграции' },
    { id: 'security',    l: 'Безопасность' },
  ];

  return (
    <AdminLayout active="settings" onNav={onNav} onLogout={onLogout} title="Настройки" subtitle="Конфигурация системы">

      <Card padding={0}>
        <div style={{ display: 'flex', borderBottom: '1px solid #EEF1F6', overflowX: 'auto' }}>
          {tabs.map(t => (
            <button key={t.id} type="button" onClick={() => setTab(t.id)}
              aria-current={tab === t.id ? 'page' : undefined}
              style={{
                padding: '14px 20px', border: 'none', background: 'transparent',
                color: tab === t.id ? '#1B4B7A' : '#475060',
                borderBottom: `3px solid ${tab === t.id ? '#1B4B7A' : 'transparent'}`,
                fontFamily: 'inherit', fontSize: 14, fontWeight: tab === t.id ? 600 : 500,
                cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'all 140ms ease',
              }}>{t.l}</button>
          ))}
        </div>
        <div style={{ padding: 28 }}>
          {tab === 'general' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 520 }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 600 }}>
                Название организации
                <input defaultValue="НТЦ «Востоктехносервис»" style={{ padding: '10px 12px', border: '1px solid #E4E8EF', borderRadius: 8, fontSize: 14, fontFamily: 'inherit' }}/>
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 600 }}>
                Контактный e-mail
                <input defaultValue="support@spektr.kz" style={{ padding: '10px 12px', border: '1px solid #E4E8EF', borderRadius: 8, fontSize: 14, fontFamily: 'inherit' }}/>
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 600 }}>
                Телефон поддержки
                <input defaultValue="+7 (7232) 00-00-00" style={{ padding: '10px 12px', border: '1px solid #E4E8EF', borderRadius: 8, fontSize: 14, fontFamily: 'inherit' }}/>
              </label>
              <Button>Сохранить</Button>
            </div>
          )}
          {tab === 'tests' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, maxWidth: 720 }}>
              {[
                { t: 'Ежедневная — проходной балл', v: '70', u: '%' },
                { t: 'Ежедневная — длительность',   v: '10', u: 'мин' },
                { t: 'Ежегодная — проходной балл',  v: '80', u: '%' },
                { t: 'Ежегодная — длительность',    v: '60', u: 'мин' },
                { t: 'Ежедневная — крайний срок',   v: '08:00', u: '' },
                { t: 'Кол-во попыток ежедневной',   v: '3', u: 'раза' },
              ].map((s, i) => (
                <label key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 600 }}>
                  {s.t}
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input defaultValue={s.v} style={{ flex: 1, padding: '10px 12px', border: '1px solid #E4E8EF', borderRadius: 8, fontSize: 14, fontFamily: 'inherit' }}/>
                    {s.u && <span style={{ fontSize: 13, color: '#5B6778' }}>{s.u}</span>}
                  </div>
                </label>
              ))}
              <div style={{ gridColumn: '1 / -1' }}><Button>Сохранить</Button></div>
            </div>
          )}
          {tab === 'categories' && (
            <div>
              <div style={{ fontSize: 13, color: '#475060', marginBottom: 14 }}>Управление направлениями проверки. Цвет используется в интерфейсе и графиках.</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {CATEGORIES.map(c => (
                  <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', border: '1px solid #E4E8EF', borderRadius: 8 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 6, background: c.color }}/>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: '#5B6778' }}>id: {c.id}</div>
                    </div>
                    <Button variant="ghost" size="sm">Изменить</Button>
                  </div>
                ))}
              </div>
              <Button style={{ marginTop: 14 }}>Добавить направление</Button>
            </div>
          )}
          {tab === 'sections' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <h4 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 16, margin: '0 0 12px' }}>Участки</h4>
                {['Участок № 1', 'Участок № 2', 'Участок № 3', 'Участок № 4'].map(s => (
                  <div key={s} style={{ padding: '10px 14px', border: '1px solid #E4E8EF', borderRadius: 8, marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14 }}>
                    {s}
                    <Button variant="ghost" size="sm">Изменить</Button>
                  </div>
                ))}
                <Button size="sm">Добавить участок</Button>
              </div>
              <div>
                <h4 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 16, margin: '0 0 12px' }}>Должности</h4>
                {['Электромонтёр', 'Слесарь-ремонтник', 'Сварщик', 'Слесарь КИПиА', 'Мастер участка', 'Мастер смены'].map(s => (
                  <div key={s} style={{ padding: '10px 14px', border: '1px solid #E4E8EF', borderRadius: 8, marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14 }}>
                    {s}
                    <Button variant="ghost" size="sm">Изменить</Button>
                  </div>
                ))}
                <Button size="sm">Добавить должность</Button>
              </div>
            </div>
          )}
          {tab === 'integrations' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { t: '1С: Зарплата и Управление Персоналом', d: 'Синхронизация табельных номеров и должностей', s: 'pending' },
                { t: 'Active Directory', d: 'Единый вход через корпоративный AD', s: 'connected' },
                { t: 'Кадровая система ВТС', d: 'Импорт штатного расписания и приказов', s: 'pending' },
                { t: 'API внешних систем', d: 'REST API для интеграций', s: 'connected' },
              ].map((it, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, padding: '16px 18px', border: '1px solid #E4E8EF', borderRadius: 10, alignItems: 'center' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: '#EEF3F8', color: '#1B4B7A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="settings" size={20} color="#1B4B7A"/>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{it.t}</div>
                    <div style={{ fontSize: 12, color: '#5B6778' }}>{it.d}</div>
                  </div>
                  <Chip tone={it.s === 'connected' ? 'ok' : 'neutral'}>{it.s === 'connected' ? 'Подключено' : 'Не подключено'}</Chip>
                  <Button variant="ghost" size="sm">{it.s === 'connected' ? 'Настройки' : 'Подключить'}</Button>
                </div>
              ))}
            </div>
          )}
          {tab === 'security' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 560 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', border: '1px solid #E4E8EF', borderRadius: 10 }}>
                <input type="checkbox" defaultChecked/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Двухфакторная аутентификация для админов</div>
                  <div style={{ fontSize: 12, color: '#5B6778' }}>SMS-код или приложение-аутентификатор</div>
                </div>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', border: '1px solid #E4E8EF', borderRadius: 10 }}>
                <input type="checkbox" defaultChecked/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Минимум 8 символов в пароле</div>
                  <div style={{ fontSize: 12, color: '#5B6778' }}>Цифры + буквы + спецсимвол</div>
                </div>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', border: '1px solid #E4E8EF', borderRadius: 10 }}>
                <input type="checkbox"/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Принудительная смена пароля каждые 90 дней</div>
                  <div style={{ fontSize: 12, color: '#5B6778' }}>Для всех ролей кроме «слушатель»</div>
                </div>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', border: '1px solid #E4E8EF', borderRadius: 10 }}>
                <input type="checkbox" defaultChecked/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Лог всех изменений базы вопросов (audit)</div>
                </div>
              </label>
              <Button>Сохранить</Button>
            </div>
          )}
        </div>
      </Card>
    </AdminLayout>
  );
};

export default AdminSettingsScreen;
