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
import HistoryScreen from './screens/History.jsx';
import ProfileScreen from './screens/Profile.jsx';
import VideoCatalogScreen from './screens/VideoCatalog.jsx';
import VideoPlayerScreen from './screens/VideoPlayer.jsx';
import SafetyScreen from './screens/Safety.jsx';
import SafetyProtocolScreen from './screens/SafetyProtocol.jsx';
import MechanismsScreen from './screens/Mechanisms.jsx';
import MasterDashboardScreen from './screens/MasterDashboard.jsx';
import StudentDashboardScreen from './screens/StudentDashboard.jsx';
import AdminOverviewScreen from './screens/admin/AdminOverview.jsx';
import AdminUsersScreen from './screens/admin/AdminUsers.jsx';
import AdminQuestionsScreen from './screens/admin/AdminQuestions.jsx';
import AdminLessonsScreen from './screens/admin/AdminLessons.jsx';
import AdminReportsScreen from './screens/admin/AdminReports.jsx';
import AdminAlertsScreen from './screens/admin/AdminAlerts.jsx';
import AdminSettingsScreen from './screens/admin/AdminSettings.jsx';
import AdminAuditScreen from './screens/admin/AdminAudit.jsx';
import { useAuth } from './context/AuthContext.jsx';
import { useTest } from './context/TestContext.jsx';

const SCREENS = [
  // Public
  { id: 'landing',  l: 'Лендинг'      },
  { id: 'about',    l: 'О системе'    },
  { id: 'center',   l: 'Уч. центр'    },
  { id: 'catalog',  l: 'Каталог'      },
  { id: 'docs',     l: 'Документы'    },
  // Auth
  { id: 'login',    l: 'Вход'         },
  { id: 'register', l: 'Регистрация'  },
  { id: 'forgot',   l: 'Пароль'       },
  // Employee
  { id: 'dash',     l: 'Кабинет'      },
  { id: 'daily',    l: 'Ежедневная'   },
  { id: 'annual',   l: 'Ежегодная'    },
  { id: 'test',     l: 'Тест'         },
  { id: 'results',  l: 'Результаты'   },
  { id: 'history',  l: 'История'      },
  { id: 'profile',  l: 'Профиль'      },
  { id: 'video',    l: 'Видео'        },
  { id: 'video1',   l: '· урок'       },
  { id: 'safe',     l: 'Безопасность' },
  { id: 'safe1',    l: '· протокол'   },
  { id: 'exam',     l: 'Экзамен'      },
  // Master
  { id: 'master',   l: 'Мастер'       },
  // Student
  { id: 'student',  l: 'Слушатель'    },
  // Admin
  { id: 'a-over',   l: 'А: Обзор'     },
  { id: 'a-users',  l: 'А: Польз.'    },
  { id: 'a-quest',  l: 'А: Вопросы'   },
  { id: 'a-less',   l: 'А: Уроки'     },
  { id: 'a-rep',    l: 'А: Отчёты'    },
  { id: 'a-alt',    l: 'А: Опов.'     },
  { id: 'a-set',    l: 'А: Настр.'    },
  { id: 'a-aud',    l: 'А: Аудит'     },
];

export default function App() {
  const { user, logout } = useAuth();
  const { startTest } = useTest();
  const [s, setS] = useState(() => {
    const saved = localStorage.getItem('spektr-screen');
    return SCREENS.find(x => x.id === saved) ? saved : 'landing';
  });
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedProtocol, setSelectedProtocol] = useState(null);

  useEffect(() => { localStorage.setItem('spektr-screen', s); }, [s]);

  const goto = (id) => setS(id);

  // Главная навигация в кабинете — учитывает роль
  const onNav = (target) => {
    if (target === 'home') {
      // role-aware home
      if (user?.role === 'master') return setS('master');
      if (user?.role === 'admin')  return setS('a-over');
      if (user?.role === 'student') return setS('student');
      return setS('dash');
    }
    if (target === 'daily' || target === 'daily-start')   return setS('daily');
    if (target === 'annual-start')                         return setS('annual');
    if (target === 'history' || target === 'results')      return setS('history');
    if (target === 'profile')                              return setS('profile');
    if (target === 'video')                                return setS('video');
    if (target === 'safe')                                 return setS('safe');
    if (target === 'exam')                                 return setS('exam');
    // Admin nav
    if (target === 'overview')  return setS('a-over');
    if (target === 'users')     return setS('a-users');
    if (target === 'questions') return setS('a-quest');
    if (target === 'lessons')   return setS('a-less');
    if (target === 'reports')   return setS('a-rep');
    if (target === 'alerts')    return setS('a-alt');
    if (target === 'settings')  return setS('a-set');
    if (target === 'audit')     return setS('a-aud');
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

  // После входа — направляем по роли
  const handleEnter = () => {
    if (user?.role === 'master')  return goto('master');
    if (user?.role === 'admin')   return goto('a-over');
    if (user?.role === 'student') return goto('student');
    goto('dash');
  };

  let CurEl = null;
  switch (s) {
    case 'landing':  CurEl = <LandingScreen     {...pubProps} />; break;
    case 'about':    CurEl = <AboutScreen       {...pubProps} />; break;
    case 'center':   CurEl = <StudyCenterScreen {...pubProps} />; break;
    case 'catalog':  CurEl = <CourseCatalogScreen {...pubProps} />; break;
    case 'docs':     CurEl = <DocumentsScreen   {...pubProps} />; break;
    case 'login':    CurEl = <LoginScreen       onEnter={handleEnter} onBack={() => goto('landing')} />; break;
    case 'register': CurEl = <RegisterScreen    onLogin={() => goto('login')} onHome={() => goto('landing')} onEnter={handleEnter} />; break;
    case 'forgot':   CurEl = <ForgotPasswordScreen onLogin={() => goto('login')} onHome={() => goto('landing')} />; break;
    // Employee
    case 'dash':     CurEl = <DashboardScreen    onStartTest={() => { startTest('annual'); goto('test'); }} onLogout={onLogoutClick} onNav={onNav} />; break;
    case 'daily':    CurEl = <DailyStartScreen   onStart={() => { startTest('daily'); goto('test'); }} onBack={() => goto('dash')} onNav={onNav} onLogout={onLogoutClick} />; break;
    case 'annual':   CurEl = <AnnualStartScreen  onStart={() => { startTest('annual'); goto('test'); }} onBack={() => goto('dash')} onNav={onNav} onLogout={onLogoutClick} />; break;
    case 'test':     CurEl = <TestScreen         onFinish={() => goto('results')} onBack={() => goto('dash')} />; break;
    case 'results':  CurEl = <ResultsScreen      onHome={() => goto('dash')} onRetry={() => goto('test')} />; break;
    case 'history':  CurEl = <HistoryScreen      onBack={() => goto('dash')} onNav={onNav} onLogout={onLogoutClick} />; break;
    case 'profile':  CurEl = <ProfileScreen      onBack={() => goto('dash')} onNav={onNav} onLogout={onLogoutClick} />; break;
    case 'video':    CurEl = <VideoCatalogScreen onOpenLesson={(l) => { setSelectedLesson(l); goto('video1'); }} onBack={() => goto('dash')} onNav={onNav} onLogout={onLogoutClick} />; break;
    case 'video1':   CurEl = <VideoPlayerScreen  lesson={selectedLesson} onSwitchLesson={(l) => setSelectedLesson(l)} onBack={() => goto('video')} onStartTest={(l) => { startTest('lesson', { category: l.category, title: 'Тест по уроку' }); goto('test'); }} onNav={onNav} onLogout={onLogoutClick} />; break;
    case 'safe':     CurEl = <SafetyScreen       onOpenProtocol={(p) => { setSelectedProtocol(p); goto('safe1'); }} onBack={() => goto('dash')} onNav={onNav} onLogout={onLogoutClick} />; break;
    case 'safe1':    CurEl = <SafetyProtocolScreen protocol={selectedProtocol} onBack={() => goto('safe')} onStartTest={(p) => { startTest('protocol', { category: 'labour', title: p.title }); goto('test'); }} onNav={onNav} onLogout={onLogoutClick} />; break;
    case 'exam':     CurEl = <MechanismsScreen   onBack={() => goto('dash')} onNav={onNav} onLogout={onLogoutClick} />; break;
    // Master
    case 'master':   CurEl = <MasterDashboardScreen onLogout={onLogoutClick} onNav={onNav} />; break;
    // Student
    case 'student':  CurEl = <StudentDashboardScreen onLogout={onLogoutClick} onNav={onNav} />; break;
    // Admin
    case 'a-over':   CurEl = <AdminOverviewScreen  onNav={onNav} onLogout={onLogoutClick} />; break;
    case 'a-users':  CurEl = <AdminUsersScreen     onNav={onNav} onLogout={onLogoutClick} />; break;
    case 'a-quest':  CurEl = <AdminQuestionsScreen onNav={onNav} onLogout={onLogoutClick} />; break;
    case 'a-less':   CurEl = <AdminLessonsScreen   onNav={onNav} onLogout={onLogoutClick} />; break;
    case 'a-rep':    CurEl = <AdminReportsScreen   onNav={onNav} onLogout={onLogoutClick} />; break;
    case 'a-alt':    CurEl = <AdminAlertsScreen    onNav={onNav} onLogout={onLogoutClick} />; break;
    case 'a-set':    CurEl = <AdminSettingsScreen  onNav={onNav} onLogout={onLogoutClick} />; break;
    case 'a-aud':    CurEl = <AdminAuditScreen     onNav={onNav} onLogout={onLogoutClick} />; break;
    default:         CurEl = <LandingScreen       {...pubProps} />;
  }

  return CurEl;
}
