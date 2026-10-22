import React, { useState } from 'react';
import {
  Clock,
  BookOpen,
  Volume2,
  Printer,
  Sparkles,
  Layers,
  MessageSquare,
  CheckCircle2,
  Sliders,
  Type,
  Repeat,
  Palette
} from 'lucide-react';
import { ThemeMode, THEME_CONFIGS } from '../types/theme';
import { ThemeSelectorModal } from './ThemeSelectorModal';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showFurigana: boolean;
  setShowFurigana: (show: boolean) => void;
  speechRate: number;
  setSpeechRate: (rate: number) => void;
  timerMinutes: number;
  timerSeconds: number;
  isTimerRunning: boolean;
  toggleTimer: () => void;
  currentTheme: ThemeMode;
  onSelectTheme: (theme: ThemeMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  showFurigana,
  setShowFurigana,
  speechRate,
  setSpeechRate,
  timerMinutes,
  timerSeconds,
  isTimerRunning,
  toggleTimer,
  currentTheme,
  onSelectTheme,
}) => {
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const theme = THEME_CONFIGS[currentTheme];

  const navItems = [
    { id: 'curriculum', label: '120분 과외 안내', icon: Clock, jpUnit: '案内' },
    { id: 'adjectives', label: '형용사 8대 활용', icon: Sparkles, jpUnit: '第1課' },
    { id: 'verbs', label: '동사 & 테형(て) 정복', icon: Layers, jpUnit: '第2課' },
    { id: 'drills', label: '대량 예문 반복 훈련', icon: Repeat, jpUnit: '練習' },
    { id: 'simulator', label: '변형 계산기', icon: Sliders, jpUnit: 'ツール' },
    { id: 'conversation', label: '1:1 회화 롤플레잉', icon: MessageSquare, jpUnit: '会話' },
    { id: 'quiz', label: '스피드 퀴즈', icon: CheckCircle2, jpUnit: 'テスト' },
    { id: 'print', label: '과외 학습지 출력', icon: Printer, jpUnit: '印刷' },
  ];

  // Theme-specific styles
  const isDark = false;
  const isTextbook = currentTheme === 'textbook';
  const isKyoto = currentTheme === 'kyoto';

  const headerClass = isDark
    ? 'bg-[#181D26]/95 border-[#283141] text-gray-100'
    : isTextbook
    ? 'bg-[#FFFDF9]/95 border-[#E2D5C3] text-[#2D2825] shadow-xs'
    : isKyoto
    ? 'bg-[#FCFCF9]/95 border-[#D8D7CE] text-[#222B25] shadow-xs'
    : 'bg-white/95 border-rose-100 text-gray-900 shadow-xs';

  const activeTabClass = isDark
    ? 'bg-rose-600 text-white shadow-sm shadow-rose-900/40'
    : isTextbook
    ? 'bg-[#C2410C] text-white shadow-sm shadow-amber-900/20 font-bold'
    : isKyoto
    ? 'bg-[#285238] text-white shadow-sm shadow-emerald-900/20 font-medium'
    : 'bg-rose-500 text-white shadow-sm shadow-rose-200';

  const inactiveTabClass = isDark
    ? 'text-gray-400 hover:text-gray-200 hover:bg-slate-800/60'
    : isTextbook
    ? 'text-[#5C5346] hover:text-[#2D2825] hover:bg-[#F3ECE0]'
    : isKyoto
    ? 'text-[#525E56] hover:text-[#222B25] hover:bg-[#ECEBE4]'
    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100';

  return (
    <>
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-200 print:hidden ${headerClass}`}>
        {/* Textbook chapter ribbon accent line */}
        {isTextbook && (
          <div className="h-1 bg-gradient-to-r from-amber-600 via-red-600 to-amber-700 w-full" />
        )}
        {isKyoto && (
          <div className="h-0.5 bg-gradient-to-r from-[#285238] via-[#4D7C5D] to-[#285238] w-full opacity-60" />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Main Title */}
            <div 
              className="flex items-center space-x-3 cursor-pointer group" 
              onClick={() => setActiveTab('curriculum')}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105 ${
                isTextbook
                  ? 'bg-gradient-to-br from-amber-700 to-red-700 shadow-amber-900/20 font-serif-jp'
                  : isKyoto
                  ? 'bg-gradient-to-br from-emerald-800 to-teal-900 shadow-emerald-950/20 font-serif-jp'
                  : isDark
                  ? 'bg-gradient-to-br from-rose-600 to-purple-700 shadow-rose-950/40'
                  : 'bg-gradient-to-tr from-rose-500 to-amber-500 shadow-rose-200'
              }`}>
                <span className="font-bold text-lg tracking-tight">日語</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className={`font-extrabold text-base sm:text-lg tracking-tight ${
                    isTextbook ? 'font-serif-jp text-[#2A2421]' : isKyoto ? 'font-serif-jp text-[#1F2923]' : ''
                  }`}>
                    일본어 형용사·동사 활용 마스터
                  </h1>
                  
                  {isTextbook ? (
                    <span className="hanko-stamp text-[10px] px-2 py-0.5 leading-none">
                      教科書版
                    </span>
                  ) : (
                    <span className={`hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${
                      isDark 
                        ? 'bg-rose-950/50 text-rose-300 border-rose-800/60' 
                        : isKyoto
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      2시간 과외 전용
                    </span>
                  )}
                </div>
                <p className={`text-xs hidden md:block ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {isTextbook 
                    ? '일본어 정규 교재 워크북 & 실전 회화 집중 훈련' 
                    : '회화 집중 1:1 트레이닝 & 인터랙티브 학습지'}
                </p>
              </div>
            </div>

            {/* Quick Controls: Theme Switcher + Timer + Furigana + Audio Speed */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Theme Switcher Button */}
              <button
                onClick={() => setIsThemeModalOpen(true)}
                title="디자인 테마 변경 (교재풍/교토/모던)"
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all shadow-xs ${
                  isTextbook
                    ? 'bg-[#FAF3E7] hover:bg-[#F2E8D5] text-[#854D0E] border-[#E2D5C3]'
                    : isDark
                    ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700'
                    : isKyoto
                    ? 'bg-[#EDF5F0] hover:bg-[#DFEDE4] text-[#285238] border-[#CCE0D3]'
                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span className="font-semibold hidden sm:inline">테마:</span>
                <span className="font-bold">{theme.name.split(' ')[0]}</span>
              </button>

              {/* Furigana Toggle */}
              <button
                onClick={() => setShowFurigana(!showFurigana)}
                title="한자 독음(후리가나) 켜기 / 끄기"
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  showFurigana
                    ? isDark
                      ? 'bg-amber-950/60 text-amber-300 border-amber-800'
                      : isTextbook
                      ? 'bg-[#FEF3C7] text-[#92400E] border-[#FCD34D]'
                      : 'bg-amber-50 text-amber-800 border-amber-300'
                    : isDark
                    ? 'bg-slate-800 text-slate-400 border-slate-700'
                    : isTextbook
                    ? 'bg-[#F5ECE0] text-[#7A6F62] border-[#DDCFBF]'
                    : 'bg-gray-50 text-gray-500 border-gray-200 hover:text-gray-800'
                }`}
              >
                <Type className="w-3.5 h-3.5" />
                <span>후리가나 {showFurigana ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <nav className={`flex space-x-1 overflow-x-auto pb-2 scrollbar-none border-t pt-1 text-sm font-medium ${
            isDark ? 'border-slate-800' : isTextbook ? 'border-[#EADBCC]' : 'border-gray-100'
          }`}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap text-xs sm:text-sm transition-all ${
                    isActive ? activeTabClass : inactiveTabClass
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                  {isTextbook && (
                    <span className="text-[10px] px-1 py-0.2 rounded bg-black/10 font-serif-jp opacity-90 hidden xl:inline">
                      {item.jpUnit}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Theme Selector Modal */}
      <ThemeSelectorModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentTheme={currentTheme}
        onSelectTheme={(selectedTheme) => {
          onSelectTheme(selectedTheme);
          setIsThemeModalOpen(false);
        }}
      />
    </>
  );
};
