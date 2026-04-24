// Shared primitive components: Button, Chip, Card, Alert, TopBar, Sidebar
import Icon from './Icon.jsx';

const MARK = '/mark.svg';
const LOGO_WHITE = '/logo-white.svg';

export const Button = ({ children, variant = 'primary', size = 'md', icon, iconRight, onClick, disabled, style, fullWidth }) => {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    fontFamily: 'inherit', fontWeight: 600, borderRadius: 8, border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer', transition: 'all 180ms cubic-bezier(.2,0,0,1)',
    whiteSpace: 'nowrap', width: fullWidth ? '100%' : 'auto',
  };
  const sizes = { sm: { padding: '7px 12px', fontSize: 13 }, md: { padding: '10px 18px', fontSize: 14 }, lg: { padding: '14px 24px', fontSize: 16 } };
  const variants = {
    primary: { background: '#1B4B7A', color: '#fff' },
    success: { background: '#1F7A3D', color: '#fff' },
    danger:  { background: '#B8242D', color: '#fff' },
    secondary: { background: '#fff', color: '#1B4B7A', borderColor: '#1B4B7A' },
    ghost: { background: 'transparent', color: '#1A2332', borderColor: '#E4E8EF' },
    quiet: { background: '#F7F9FC', color: '#1A2332' },
  };
  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled}
      style={{ ...base, ...sizes[size], ...variants[variant], ...(disabled ? { background: '#E4E8EF', color: '#8A95A5', borderColor: 'transparent' } : {}), ...style }}>
      {icon && <Icon name={icon} size={size === 'lg' ? 20 : 16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'lg' ? 20 : 16} />}
    </button>
  );
};

export const Chip = ({ tone = 'neutral', children }) => {
  const tones = {
    ok:      { bg: '#EAF5EE', fg: '#176030', dot: '#1F7A3D' },
    warn:    { bg: '#FDF4E7', fg: '#8C5409', dot: '#C77A0F' },
    bad:     { bg: '#FBECEC', fg: '#941C24', dot: '#B8242D' },
    info:    { bg: '#EEF3F8', fg: '#153C63', dot: '#1B4B7A' },
    neutral: { bg: '#F7F9FC', fg: '#5B6778', dot: '#8A95A5' },
  };
  const t = tones[tone];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', background: t.bg, color: t.fg }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: t.dot }} />
      {children}
    </span>
  );
};

export const Card = ({ children, style, padding = 24, onClick, hoverable, className }) => (
  <div onClick={onClick} className={className} style={{
    background: '#fff', border: '1px solid #E4E8EF', borderRadius: 12,
    boxShadow: '0 4px 20px rgba(26,35,50,0.06)', padding,
    cursor: onClick || hoverable ? 'pointer' : 'default',
    transition: 'all 180ms cubic-bezier(.2,0,0,1)',
    ...style,
  }}>{children}</div>
);

export const Alert = ({ tone = 'info', title, description, action, onAction }) => {
  const tones = {
    bad:  { bg: '#FBECEC', border: '#F2CFD1', ic: '#B8242D', icName: 'alert' },
    warn: { bg: '#FDF4E7', border: '#F2DEB6', ic: '#C77A0F', icName: 'timer' },
    ok:   { bg: '#EAF5EE', border: '#CFE7D6', ic: '#1F7A3D', icName: 'check' },
    info: { bg: '#EEF3F8', border: '#D6E2ED', ic: '#1B4B7A', icName: 'bell' },
  };
  const t = tones[tone];
  return (
    <div style={{ display: 'flex', gap: 14, padding: '14px 16px', borderRadius: 12, border: `1px solid ${t.border}`, background: t.bg, alignItems: 'center' }}>
      <div style={{ width: 36, height: 36, borderRadius: 8, background: t.ic, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon name={t.icName} size={18} color="#fff" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: '#1A2332', marginBottom: 2 }}>{title}</div>
        {description && <div style={{ fontSize: 13, color: '#5B6778' }}>{description}</div>}
      </div>
      {action && <Button variant="ghost" size="sm" onClick={onAction} iconRight="arrow">{action}</Button>}
    </div>
  );
};

export const TopBar = ({ onLogin, onRegister }) => (
  <header className="s-topbar" style={{ height: 72, background: '#fff', borderBottom: '1px solid #E4E8EF', display: 'flex', alignItems: 'center', padding: '0 40px', position: 'sticky', top: 0, zIndex: 10 }}>
    <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
      <img src={MARK} className="s-topbar-logo-img" style={{ height: 36 }} alt="" />
      <span className="s-topbar-logo-text" style={{ fontFamily: 'Manrope, Inter, sans-serif', fontWeight: 800, fontSize: 22, color: '#1A2332', letterSpacing: '-0.01em' }}>СПЕКТР</span>
    </a>
    <nav className="s-topbar-nav" style={{ display: 'flex', gap: 28, marginLeft: 48 }}>
      {['О системе', 'Учебный центр', 'Документы', 'Контакты'].map(l => (
        <a key={l} href="#" style={{ color: '#2F3B4D', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>{l}</a>
      ))}
    </nav>
    <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
      <Button variant="ghost" onClick={onLogin}>Войти</Button>
      <span className="s-topbar-register" style={{ display: 'contents' }}>
        <Button variant="success" icon="graduation" onClick={onRegister}>Регистрация в Учебном центре</Button>
      </span>
    </div>
  </header>
);

export const Sidebar = ({ active, onNav, user }) => {
  const items = [
    { id: 'home', icon: 'home', label: 'Главная' },
    { id: 'daily', icon: 'clipboard', label: 'Ежедневная проверка' },
    { id: 'video', icon: 'film', label: 'Видеоуроки' },
    { id: 'exam', icon: 'target', label: 'Экзамены' },
    { id: 'safe', icon: 'shield', label: 'Безопасный труд' },
    { id: 'results', icon: 'chart', label: 'Мои результаты' },
  ];
  return (
    <aside className="s-sidebar" style={{ width: 248, background: '#0F2D4A', color: '#fff', display: 'flex', flexDirection: 'column', padding: '20px 14px', minHeight: '100vh' }}>
      <div className="s-sidebar-header" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 10px 20px', borderBottom: '1px solid rgba(255,255,255,.08)', marginBottom: 14 }}>
        <img src={MARK} style={{ width: 32, height: 32 }} alt="" />
        <span className="s-sidebar-title" style={{ fontFamily: 'Manrope, Inter, sans-serif', fontWeight: 800, fontSize: 20, letterSpacing: '-0.01em' }}>СПЕКТР</span>
      </div>
      {items.map(it => {
        const isActive = active === it.id;
        return (
          <div key={it.id} onClick={() => onNav && onNav(it.id)}
            className="s-sidebar-item"
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 12px', borderRadius: 8, fontSize: 14, cursor: 'pointer',
              background: isActive ? '#1B4B7A' : 'transparent',
              color: isActive ? '#fff' : '#A8C0D6',
              fontWeight: isActive ? 600 : 500,
              marginBottom: 2,
            }}>
            <Icon name={it.icon} size={18} />
            <span className="s-sidebar-label">{it.label}</span>
          </div>
        );
      })}
      <div className="s-sidebar-user" style={{ marginTop: 'auto', padding: '14px 12px', borderTop: '1px solid rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 999, background: '#1B4B7A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Manrope', fontWeight: 700, fontSize: 14 }}>ИП</div>
        <div style={{ fontSize: 13, lineHeight: 1.3 }}>
          <div style={{ fontWeight: 600 }}>{user?.name || 'Иван Петров'}</div>
          <div style={{ color: '#8A95A5', fontSize: 12 }}>Таб. № {user?.id || '48213'}</div>
        </div>
      </div>
    </aside>
  );
};

export { MARK, LOGO_WHITE };
