import { useState } from 'react';
import Icon from '../../components/Icon.jsx';
import { Button, Card, Chip } from '../../components/Primitives.jsx';
import AdminLayout from './AdminLayout.jsx';
import { LESSONS } from '../../data/lessons.js';
import { CATEGORIES, getCategoryById } from '../../data/categories.js';

const AdminLessonsScreen = ({ onNav, onLogout }) => {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <AdminLayout active="lessons" onNav={onNav} onLogout={onLogout} title="Видеоуроки" subtitle={`${LESSONS.length} уроков в библиотеке`}
      actions={<Button onClick={() => setShowAdd(true)}>Добавить урок</Button>}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {LESSONS.map(l => {
          const c = getCategoryById(l.category);
          return (
            <Card key={l.id} padding={0} hoverable>
              <div style={{ aspectRatio: '16/9', background: `linear-gradient(135deg, ${c.bg}, #fff)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', borderRadius: '12px 12px 0 0' }}>
                <Icon name="play" size={32} color={c.color}/>
                <div style={{ position: 'absolute', top: 10, left: 10, padding: '3px 8px', background: c.color, color: '#fff', borderRadius: 4, fontSize: 11, fontWeight: 700 }}>{c.short}</div>
                <div style={{ position: 'absolute', bottom: 10, right: 10, padding: '3px 8px', background: 'rgba(15,45,74,.85)', color: '#fff', borderRadius: 4, fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}>{l.duration}</div>
              </div>
              <div style={{ padding: 16 }}>
                <h4 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 15, margin: '0 0 8px', lineHeight: 1.3 }}>{l.title}</h4>
                <div style={{ display: 'flex', gap: 12, fontSize: 12, color: '#5B6778', marginBottom: 10 }}>
                  <span>👁 {l.views}</span>
                  {l.hasTest && <span>📝 С тестом</span>}
                  <span>{l.publishDate}</span>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <Button variant="ghost" size="sm">Изменить</Button>
                  <Button variant="ghost" size="sm">Удалить</Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {showAdd && (
        <div onClick={() => setShowAdd(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(15,45,74,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 14, padding: 28, maxWidth: 520, width: '100%' }}>
            <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 20, margin: '0 0 16px' }}>Добавить видеоурок</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input placeholder="Название" style={{ padding: '12px 14px', border: '1px solid #E4E8EF', borderRadius: 8, fontSize: 14 }}/>
              <select style={{ padding: '12px 14px', border: '1px solid #E4E8EF', borderRadius: 8, fontSize: 14 }}>
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <input placeholder="Ссылка на видео (YouTube или файл)" style={{ padding: '12px 14px', border: '1px solid #E4E8EF', borderRadius: 8, fontSize: 14 }}/>
              <textarea placeholder="Описание" rows={3} style={{ padding: '12px 14px', border: '1px solid #E4E8EF', borderRadius: 8, fontSize: 14, resize: 'vertical', fontFamily: 'inherit' }}/>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}><input type="checkbox" defaultChecked/> Привязать тест после просмотра</label>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 }}>
              <Button variant="ghost" onClick={() => setShowAdd(false)}>Отмена</Button>
              <Button onClick={() => { setShowAdd(false); alert('Урок добавлен'); }}>Сохранить</Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminLessonsScreen;
