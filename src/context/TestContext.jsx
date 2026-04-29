// Сессия теста — общая между Test, Results
import { createContext, useContext, useState } from 'react';
import { buildDailyTest, buildAnnualTest, QUESTIONS } from '../data/questions.js';

const TestContext = createContext(null);

export const TestProvider = ({ children }) => {
  // testType: 'daily' | 'annual' | 'protocol' | 'lesson'
  const [session, setSession] = useState(null);

  // Старт теста — формирует сет вопросов
  const startTest = (type, opts = {}) => {
    let questions = [];
    let title = '';
    let timeLimit = 600; // секунд
    let passPct = 70;
    if (type === 'daily') {
      questions = buildDailyTest();
      title = 'Ежедневная проверка знаний';
      timeLimit = 600;
      passPct = 70;
    } else if (type === 'annual') {
      questions = buildAnnualTest();
      title = 'Ежегодная проверка знаний';
      timeLimit = 3600;
      passPct = 80;
    } else if (type === 'protocol') {
      // 5 случайных вопросов из категории electro/labour
      const cat = opts.category || 'labour';
      questions = QUESTIONS.filter(q => q.category === cat).slice(0, 5);
      title = opts.title || 'Протокол смертельных опасностей';
      timeLimit = 600;
      passPct = 80;
    } else if (type === 'lesson') {
      const cat = opts.category || 'labour';
      questions = QUESTIONS.filter(q => q.category === cat).slice(0, 5);
      title = opts.title || 'Тест по уроку';
      timeLimit = 300;
      passPct = 70;
    }
    setSession({
      type, title, questions, timeLimit, passPct,
      answers: {}, startedAt: Date.now(),
    });
  };

  const updateAnswers = (answers) => {
    setSession(s => s ? { ...s, answers } : s);
  };

  const finishTest = (answers) => {
    setSession(s => {
      if (!s) return s;
      const finalAnswers = answers || s.answers;
      const correctCount = s.questions.reduce((acc, q, i) => acc + (finalAnswers[i] === q.correct ? 1 : 0), 0);
      const total = s.questions.length;
      const pct = Math.round((correctCount / total) * 100);
      const passed = pct >= s.passPct;
      const finishedAt = Date.now();
      const durationSec = Math.round((finishedAt - s.startedAt) / 1000);
      return { ...s, answers: finalAnswers, correctCount, total, pct, passed, finishedAt, durationSec, isFinished: true };
    });
  };

  const reset = () => setSession(null);

  return (
    <TestContext.Provider value={{ session, startTest, updateAnswers, finishTest, reset }}>
      {children}
    </TestContext.Provider>
  );
};

export const useTest = () => {
  const ctx = useContext(TestContext);
  if (!ctx) throw new Error('useTest must be used inside TestProvider');
  return ctx;
};
