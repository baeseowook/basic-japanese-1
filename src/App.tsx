/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CurriculumView } from './components/CurriculumView';
import { AdjectiveSection } from './components/AdjectiveSection';
import { VerbSection } from './components/VerbSection';
import { ConjugationMachine } from './components/ConjugationMachine';
import { ConversationDrills } from './components/ConversationDrills';
import { QuizSection } from './components/QuizSection';
import { PrintWorksheet } from './components/PrintWorksheet';
import { RepetitivePatternDrills } from './components/RepetitivePatternDrills';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ThemeShowcaseBanner } from './components/ThemeShowcaseBanner';

function MainApp() {
  const [activeTab, setActiveTab] = useState<string>('curriculum');
  const [showFurigana, setShowFurigana] = useState<boolean>(true);
  const [speechRate, setSpeechRate] = useState<number>(1.0);

  const { theme, setTheme, config, isTextbook, isKyoto, isDark } = useTheme();

  // Lesson timer state (0 ~ 120 minutes)
  const [timerMinutes, setTimerMinutes] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);

  // Interval for tutoring timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prevSec) => {
          if (prevSec >= 59) {
            setTimerMinutes((prevMin) => {
              const newMin = prevMin + 1;
              // Auto-advance stage based on timeline
              if (newMin >= 110) setCurrentStageIndex(5);
              else if (newMin >= 95) setCurrentStageIndex(4);
              else if (newMin >= 75) setCurrentStageIndex(3);
              else if (newMin >= 40) setCurrentStageIndex(2);
              else if (newMin >= 15) setCurrentStageIndex(1);
              else setCurrentStageIndex(0);
              return newMin;
            });
            return 0;
          }
          return prevSec + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerMinutes(0);
    setTimerSeconds(0);
    setCurrentStageIndex(0);
  };

  const handleStartStage = (stageIdx: number, tabId: string) => {
    setCurrentStageIndex(stageIdx);
    setActiveTab(tabId);
    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine root container background and text color based on active theme
  const containerClass = isTextbook
    ? 'bg-textbook-paper text-[#2A2421]'
    : isKyoto
    ? 'bg-[#F4F4F0] text-[#222B25]'
    : isDark
    ? 'bg-[#0F1218] text-[#F0F2F7]'
    : 'bg-stone-50/70 text-gray-900';

  return (
    <div className={`min-h-screen ${containerClass} font-sans selection:bg-amber-200/60 selection:text-amber-950 flex flex-col transition-colors duration-200`}>
      {/* Top Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showFurigana={showFurigana}
        setShowFurigana={setShowFurigana}
        speechRate={speechRate}
        setSpeechRate={setSpeechRate}
        timerMinutes={timerMinutes}
        timerSeconds={timerSeconds}
        isTimerRunning={isTimerRunning}
        toggleTimer={toggleTimer}
        currentTheme={theme}
        onSelectTheme={setTheme}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Interactive Theme Proposal & Switcher Banner */}
        {activeTab !== 'print' && <ThemeShowcaseBanner />}

        {/* Tab Content Panels */}
        {activeTab === 'curriculum' && (
          <CurriculumView onStartStage={handleStartStage} />
        )}

        {activeTab === 'adjectives' && (
          <AdjectiveSection showFurigana={showFurigana} speechRate={speechRate} />
        )}

        {activeTab === 'verbs' && (
          <VerbSection showFurigana={showFurigana} speechRate={speechRate} />
        )}

        {activeTab === 'drills' && (
          <RepetitivePatternDrills showFurigana={showFurigana} speechRate={speechRate} />
        )}

        {activeTab === 'simulator' && (
          <ConjugationMachine showFurigana={showFurigana} speechRate={speechRate} />
        )}

        {activeTab === 'conversation' && (
          <ConversationDrills showFurigana={showFurigana} speechRate={speechRate} />
        )}

        {activeTab === 'quiz' && (
          <QuizSection speechRate={speechRate} />
        )}

        {activeTab === 'print' && (
          <PrintWorksheet />
        )}
      </main>

      {/* Footer */}
      <footer className={`mt-12 py-8 border-t text-xs print:hidden transition-colors ${
        isTextbook
          ? 'bg-[#FFFDF9] border-[#E8DFC8] text-[#7A6F62]'
          : isKyoto
          ? 'bg-[#FCFCF9] border-[#DEDDD6] text-[#637269]'
          : isDark
          ? 'bg-[#141820] border-slate-800 text-slate-400'
          : 'bg-white border-gray-200/80 text-gray-500'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className={`w-6 h-6 rounded-lg text-white flex items-center justify-center font-bold text-xs ${
              isTextbook
                ? 'bg-amber-700 font-serif-jp'
                : isKyoto
                ? 'bg-[#285238] font-serif-jp'
                : isDark
                ? 'bg-rose-600'
                : 'bg-rose-500'
            }`}>
              日
            </span>
            <span className="font-bold">
              일본어 형용사·동사 활용 마스터 (회화 집중 2시간 과외 커리큘럼)
            </span>
            {isTextbook && (
              <span className="hanko-stamp text-[9px] px-1.5 py-0.2 scale-90">
                教科書
              </span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <span>개인 과외 맞춤 교재 (110~120분)</span>
            <span>•</span>
            <button
              onClick={() => setActiveTab('print')}
              className="text-amber-700 hover:underline font-semibold"
            >
              학습지 A4 인쇄 모드
            </button>
            <span>•</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:underline font-medium"
            >
              맨 위로 ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
