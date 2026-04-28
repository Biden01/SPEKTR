import { useState, useEffect } from 'react';
import LandingScreen from './screens/Landing.jsx';
import LoginScreen from './screens/Login.jsx';
import DashboardScreen from './screens/Dashboard.jsx';
import TestScreen from './screens/Test.jsx';
import ResultsScreen from './screens/Results.jsx';
import { useAuth } from './context/AuthContext.jsx';

// Карта экранов с метаданными для нав-бара отладки
const SCREENS = [
  { id: 'landing', l: 'Лендинг'    },
  { id: 'login',   l: 'Вход'       },
  { id: 'dash',    l: 'Кабинет'    },
  { id: 'test',    l: 'Тест'       },
  { id: 'results', l: 'Результаты' },
];

export default function App() {
  const { logout } = useAuth();
  const [s, setS] = useState(() => {
    const saved = localStorage.getItem('spektr-screen');
    return SCREENS.find(x => x.id === saved) ? saved : 'landing';
  });
  useEffect(() => { localStorage.setItem('spektr-screen', s); }, [s]);

  const goto = (id) => setS(id);

  // Дашборд-навигация (Sidebar/BottomNav) — пока маппит во временные экраны
  const onNav = (target) => {
    // Стартовые экраны проверок ведут к тесту
    if (target === 'daily-start' || target === 'annual-start') return setS('test');
    if (target === 'home') return setS('dash');
    if (target === 'results') return setS('results');
    if (target === 'history') return setS('results');
    // остальные таргеты пока ведут на дашборд (заглушки до построения экранов)
    setS('dash');
  };

  const onLogoutClick = () => {
    logout();
    setS('landing');
  };

  let CurEl = null;
  if (s === 'landing')  CurEl = <LandingScreen  onLogin={() => goto('login')} onStudy={() => goto('login')} />;
  else if (s === 'login') CurEl = <LoginScreen  onEnter={() => goto('dash')} onBack={() => goto('landing')} />;
  else if (s === 'dash')  CurEl = <DashboardScreen onStartTest={() => goto('test')} onLogout={onLogoutClick} onNav={onNav} />;
  else if (s === 'test')  CurEl = <TestScreen   onFinish={() => goto('results')} onBack={() => goto('dash')} />;
  else if (s === 'results') CurEl = <ResultsScreen onHome={() => goto('dash')} onRetry={() => goto('test')} />;
  else CurEl = <LandingScreen onLogin={() => goto('login')} onStudy={() => goto('login')} />;

  return (
    <>
      {CurEl}
      <nav className="screen-nav">
        {SCREENS.map(x => (
          <button key={x.id} className={s === x.id ? 'active' : ''} onClick={() => setS(x.id)}>
            {x.l}
          </button>
        ))}
      </nav>
    </>
  );
}
