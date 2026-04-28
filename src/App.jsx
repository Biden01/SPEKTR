import { useState, useEffect } from 'react';
import LandingScreen from './screens/Landing.jsx';
import LoginScreen from './screens/Login.jsx';
import DashboardScreen from './screens/Dashboard.jsx';
import TestScreen from './screens/Test.jsx';
import ResultsScreen from './screens/Results.jsx';
import AboutScreen from './screens/About.jsx';
import StudyCenterScreen from './screens/StudyCenter.jsx';
import CourseCatalogScreen from './screens/CourseCatalog.jsx';
import DocumentsScreen from './screens/Documents.jsx';
import RegisterScreen from './screens/Register.jsx';
import ForgotPasswordScreen from './screens/ForgotPassword.jsx';
import DailyStartScreen from './screens/DailyStart.jsx';
import AnnualStartScreen from './screens/AnnualStart.jsx';
import { useAuth } from './context/AuthContext.jsx';

const SCREENS = [
  { id: 'landing',  l: 'Лендинг'      },
  { id: 'about',    l: 'О системе'    },
  { id: 'center',   l: 'Уч. центр'    },
  { id: 'catalog',  l: 'Каталог'      },
  { id: 'docs',     l: 'Документы'    },
  { id: 'login',    l: 'Вход'         },
  { id: 'register', l: 'Регистрация'  },
  { id: 'forgot',   l: 'Пароль'       },
  { id: 'dash',     l: 'Кабинет'      },
  { id: 'daily',    l: 'Ежедневная'   },
  { id: 'annual',   l: 'Ежегодная'    },
  { id: 'test',     l: 'Тест'         },
  { id: 'results',  l: 'Результаты'   },
];

export default function App() {
  const { logout } = useAuth();
  const [s, setS] = useState(() => {
    const saved = localStorage.getItem('spektr-screen');
    return SCREENS.find(x => x.id === saved) ? saved : 'landing';
  });
  useEffect(() => { localStorage.setItem('spektr-screen', s); }, [s]);

  const goto = (id) => setS(id);

  const onNav = (target) => {
    if (target === 'home')         return setS('dash');
    if (target === 'daily')        return setS('daily');
    if (target === 'daily-start')  return setS('daily');
    if (target === 'annual-start') return setS('annual');
    if (target === 'history' || target === 'results') return setS('results');
    setS('dash');
  };

  const onLogoutClick = () => { logout(); setS('landing'); };

  const pubProps = {
    onLogin:   () => goto('login'),
    onStudy:   () => goto('register'),
    onAbout:   () => goto('about'),
    onCenter:  () => goto('center'),
    onCatalog: () => goto('catalog'),
    onDocs:    () => goto('docs'),
    onHome:    () => goto('landing'),
  };

  let CurEl = null;
  switch (s) {
    case 'landing':  CurEl = <LandingScreen     {...pubProps} />; break;
    case 'about':    CurEl = <AboutScreen       {...pubProps} />; break;
    case 'center':   CurEl = <StudyCenterScreen {...pubProps} />; break;
    case 'catalog':  CurEl = <CourseCatalogScreen {...pubProps} />; break;
    case 'docs':     CurEl = <DocumentsScreen   {...pubProps} />; break;
    case 'login':    CurEl = <LoginScreen       onEnter={() => goto('dash')} onBack={() => goto('landing')} />; break;
    case 'register': CurEl = <RegisterScreen    onLogin={() => goto('login')} onHome={() => goto('landing')} onEnter={() => goto('dash')} />; break;
    case 'forgot':   CurEl = <ForgotPasswordScreen onLogin={() => goto('login')} onHome={() => goto('landing')} />; break;
    case 'dash':     CurEl = <DashboardScreen    onStartTest={() => goto('test')} onLogout={onLogoutClick} onNav={onNav} />; break;
    case 'daily':    CurEl = <DailyStartScreen   onStart={() => goto('test')} onBack={() => goto('dash')} onNav={onNav} onLogout={onLogoutClick} />; break;
    case 'annual':   CurEl = <AnnualStartScreen  onStart={() => goto('test')} onBack={() => goto('dash')} onNav={onNav} onLogout={onLogoutClick} />; break;
    case 'test':     CurEl = <TestScreen         onFinish={() => goto('results')} onBack={() => goto('dash')} />; break;
    case 'results':  CurEl = <ResultsScreen      onHome={() => goto('dash')} onRetry={() => goto('test')} />; break;
    default:         CurEl = <LandingScreen     {...pubProps} />;
  }

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
