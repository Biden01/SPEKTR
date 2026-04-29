import Icon from '../components/Icon.jsx';
import { Button, Card, Sidebar, BottomNav, Chip } from '../components/Primitives.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { PROTOCOLS } from '../data/protocols.js';

const SafetyScreen = ({ onOpenProtocol, onBack, onNav, onLogout }) => {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="s-dashboard" style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', background: '#F7F9FC', color: '#1A2332' }}>
      <Sidebar active="safe" user={{ name: user.fullName.split(' ').slice(0, 2).join(' '), id: user.tabNumber }} onNav={onNav} />
      <main className="s-main" style={{ flex: 1, padding: '28px 40px 60px', overflow: 'auto' }}>
        <header className="s-main-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, gap: 16 }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <Button variant="ghost" size="sm" icon="chevron" onClick={onBack} style={{ marginBottom: 12, flexDirection: 'row-reverse' }}>В кабинет</Button>
            <h1 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 32, letterSpacing: '-0.02em', margin: 0 }}>Безопасный труд</h1>
            <div className="s-main-header-sub" style={{ fontSize: 14, color: '#3A4657', marginTop: 4 }}>6 протоколов смертельных опасностей · обязательны для всех</div>
          </div>
          <Button variant="ghost" icon="logout" onClick={onLogout}>Выход</Button>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="s-feature-grid">
          {PROTOCOLS.map(p => {
            const tones = { bad: { bg: '#FBECEC', fg: '#B8242D' }, warn: { bg: '#FDF4E7', fg: '#C77A0F' } };
            const t = tones[p.tone];
            return (
              <Card key={p.id} padding={24} hoverable onClick={() => onOpenProtocol && onOpenProtocol(p)} style={{ borderTop: `4px solid ${t.fg}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 10, background: t.bg, color: t.fg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={p.icon} size={24} color={t.fg}/>
                  </div>
                  <Chip tone={p.status === 'done' ? 'ok' : 'neutral'}>{p.status === 'done' ? 'Пройдено' : 'Не пройдено'}</Chip>
                </div>
                <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 18, margin: '0 0 8px' }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: '#475060', margin: '0 0 14px', lineHeight: 1.5 }}>{p.short}</p>
                <div style={{ fontSize: 12, color: '#5B6778', fontFamily: 'JetBrains Mono, monospace' }}>Обновлён {p.updated}</div>
              </Card>
            );
          })}
        </div>
      </main>
      <BottomNav active="home" onNav={onNav} />
    </div>
  );
};

export default SafetyScreen;
