import { useState, useEffect } from 'react';
import LandingScreen from './screens/Landing.jsx';
import LoginScreen from './screens/Login.jsx';
import DashboardScreen from './screens/Dashboard.jsx';
import TestScreen from './screens/Test.jsx';
import ResultsScreen from './screens/Results.jsx';

const SCREENS = [
  { id: 'landing', l: 'Landing',     C: LandingScreen },
  { id: 'login',   l: 'Вход',        C: LoginScreen },
  { id: 'dash',    l: 'Кабинет',     C: DashboardScreen },
  { id: 'test',    l: 'Тест',        C: TestScreen },
  { id: 'results', l: 'Результаты',  C: ResultsScreen },
];

export default function App() {
  const [s, setS] = useState(() => localStorage.getItem('spektr-screen') || 'landing');
  useEffect(() => localStorage.setItem('spektr-screen', s), [s]);
  const Cur = SCREENS.find(x => x.id === s).C;
  return (
    <>
      <Cur
        onLogin={() => setS('login')}
        onStudy={() => setS('login')}
        onEnter={() => setS('dash')}
        onBack={() => setS('landing')}
        onStartTest={() => setS('test')}
        onFinish={() => setS('results')}
        onLogout={() => setS('landing')}
        onHome={() => setS('dash')}
        onRetry={() => setS('test')}
      />
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
