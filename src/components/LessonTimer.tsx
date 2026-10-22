import React from 'react';
import { Play, Pause, RotateCcw, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { TUTORING_CURRICULUM } from '../data/curriculum';

interface LessonTimerProps {
  currentStageIndex: number;
  setCurrentStageIndex: (index: number) => void;
  timerMinutes: number;
  timerSeconds: number;
  isTimerRunning: boolean;
  toggleTimer: () => void;
  resetTimer: () => void;
  onNavigateTab: (tabId: string) => void;
}

export const LessonTimer: React.FC<LessonTimerProps> = ({
  currentStageIndex,
  setCurrentStageIndex,
  timerMinutes,
  timerSeconds,
  isTimerRunning,
  toggleTimer,
  resetTimer,
  onNavigateTab,
}) => {
  const currentStage = TUTORING_CURRICULUM[currentStageIndex] || TUTORING_CURRICULUM[0];
  const totalElapsedMinutes = timerMinutes;
  const progressPercent = Math.min(100, Math.round((totalElapsedMinutes / 120) * 100));

  // Stage tab mapping
  const stageToTab = (stageIdx: number) => {
    switch (stageIdx) {
      case 0: return 'curriculum';
      case 1: return 'adjectives';
      case 2: return 'verbs';
      case 3: return 'verbs';
      case 4: return 'conversation';
      case 5: return 'quiz';
      default: return 'curriculum';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-4 sm:p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left: Current Active Stage */}
        <div className="flex-1">
          <div className="flex items-center space-x-2 text-rose-600 text-xs font-bold uppercase tracking-wider mb-1">
            <span className="flex h-2 w-2 relative">
              {isTimerRunning && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              )}
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span>과외 진행 스테이지 {currentStage.stepNumber} / 5</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-500">{currentStage.timeRange}</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            {currentStage.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            {currentStage.subtitle}
          </p>
        </div>

        {/* Right: Digital Timer Controls */}
        <div className="flex items-center space-x-4 bg-rose-50/70 border border-rose-100 rounded-xl px-4 py-2.5 self-start lg:self-auto">
          <div className="text-center">
            <div className="text-xs text-rose-500 font-semibold">진행 시간</div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-gray-900 tracking-tight">
              {String(timerMinutes).padStart(2, '0')}:{String(timerSeconds).padStart(2, '0')}
              <span className="text-xs text-gray-400 font-normal ml-1">/ 120:00</span>
            </div>
          </div>

          <div className="flex items-center space-x-1 pl-2 border-l border-rose-200">
            <button
              onClick={toggleTimer}
              className={`p-2 rounded-lg font-bold transition-all shadow-xs ${
                isTimerRunning
                  ? 'bg-amber-500 text-white hover:bg-amber-600'
                  : 'bg-rose-500 text-white hover:bg-rose-600'
              }`}
              title={isTimerRunning ? '일시정지' : '수업 시작'}
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            </button>
            <button
              onClick={resetTimer}
              className="p-2 rounded-lg text-gray-600 hover:bg-white hover:text-gray-900 transition-colors"
              title="타이머 리셋"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1.5 font-medium">
          <span>2시간 과외 달성률: {progressPercent}%</span>
          <span>남은 시간: {Math.max(0, 120 - totalElapsedMinutes)}분</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Interactive Stage Step Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-4 pt-3 border-t border-gray-100">
        {TUTORING_CURRICULUM.map((stage, idx) => {
          const isSelected = idx === currentStageIndex;
          const isPast = totalElapsedMinutes >= (stage.stepNumber * 20);
          return (
            <button
              key={stage.id}
              onClick={() => {
                setCurrentStageIndex(idx);
                onNavigateTab(stageToTab(idx));
              }}
              className={`p-2 text-left rounded-xl border transition-all text-xs flex flex-col justify-between ${
                isSelected
                  ? 'bg-rose-500 text-white border-rose-600 shadow-sm ring-2 ring-rose-200'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between font-bold mb-1">
                <span>단계 {stage.stepNumber}</span>
                <span className={`text-[10px] px-1 rounded ${isSelected ? 'bg-white/20 text-white' : 'text-gray-400'}`}>
                  {stage.durationMinutes}분
                </span>
              </div>
              <div className={`line-clamp-1 font-medium ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                {stage.title}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
