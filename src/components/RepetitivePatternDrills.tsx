import React, { useState } from 'react';
import { PATTERN_DRILL_CATEGORIES } from '../data/patternDrills';
import { PatternDrillSentence } from '../types';
import { FuriganaText } from './FuriganaText';
import { useTheme } from '../context/ThemeContext';
import {
  Eye,
  EyeOff,
} from 'lucide-react';

interface RepetitivePatternDrillsProps {
  showFurigana: boolean;
  speechRate?: number;
}

export const RepetitivePatternDrills: React.FC<RepetitivePatternDrillsProps> = ({
  showFurigana,
}) => {
  const { isTextbook, isKyoto, isDark } = useTheme();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('i-adj-neg');
  const [drillMode, setDrillMode] = useState<'study' | 'shadowing' | 'cloze'>('study');
  const [revealedSentences, setRevealedSentences] = useState<Record<string, boolean>>({});

  const currentCategory =
    PATTERN_DRILL_CATEGORIES.find((c) => c.id === selectedCategoryId) ||
    PATTERN_DRILL_CATEGORIES[0];

  const toggleReveal = (id: string) => {
    setRevealedSentences((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const revealAll = () => {
    const allRevealed: Record<string, boolean> = {};
    currentCategory.sentences.forEach((s: PatternDrillSentence) => {
      allRevealed[s.id] = true;
    });
    setRevealedSentences(allRevealed);
  };

  const hideAll = () => {
    setRevealedSentences({});
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* 1. Header & Pattern Selector */}
      <div className={`rounded-3xl border p-5 sm:p-7 shadow-xs transition-all ${
        isTextbook
          ? 'bg-[#FFFDF9] border-[#EADBCC]'
          : isKyoto
          ? 'bg-[#FCFCF9] border-[#DEDDD6]'
          : isDark
          ? 'bg-[#181D26] border-slate-700/80 text-gray-100'
          : 'bg-white border-rose-100'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2 border">
              {isTextbook ? (
                <span className="hanko-stamp text-[9px] px-2 py-0.5">
                  文型ドリル
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-amber-700">
                  <RepeatIcon className="w-3.5 h-3.5" />
                  <span>[과외 특화 훈련소] 귀와 입으로 뚫는 반복 드릴</span>
                </span>
              )}
              <span className="text-[11px] text-gray-500">
                {isTextbook ? '教科書 反復ドリル' : `${PATTERN_DRILL_CATEGORIES.length}개 테마 핵심 집중 회화`}
              </span>
            </div>

            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              isTextbook ? 'font-serif-jp text-[#2A2421]' : isKyoto ? 'font-serif-jp text-[#1F2923]' : ''
            }`}>
              대량 예문 핑퐁 스피킹 훈련소
            </h2>
            <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              문법 변형을 머리로 계산하지 않고, 입에서 즉시 튀어나오도록 연속으로 말해보는 집중 훈련입니다.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <span className={`text-xs px-3 py-1.5 rounded-xl font-bold border ${
              isTextbook
                ? 'bg-[#FAF3E7] text-[#92400E] border-[#E2D5C3]'
                : isKyoto
                ? 'bg-[#EDF5F0] text-[#285238] border-[#CCE0D3]'
                : isDark
                ? 'bg-slate-800 text-rose-300 border-slate-700'
                : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}>
              총 {PATTERN_DRILL_CATEGORIES.reduce((sum, c) => sum + c.sentences.length, 0)}개 회화 문장 탑재
            </span>
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="space-y-3 pt-3 border-t border-stone-100 dark:border-slate-800">
          {/* Adjectives */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`text-[11px] font-bold px-2 py-1 rounded-md shrink-0 ${
              isTextbook
                ? 'bg-amber-100 text-amber-900 font-serif-jp'
                : 'bg-rose-50 text-rose-600'
            }`}>
              형용사 활용:
            </span>
            {PATTERN_DRILL_CATEGORIES.filter((c) => c.partOfSpeech.includes('adj')).map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategoryId(cat.id);
                  setRevealedSentences({});
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  selectedCategoryId === cat.id
                    ? isTextbook
                      ? 'bg-amber-800 text-white border-amber-900 shadow-xs'
                      : isKyoto
                      ? 'bg-[#285238] text-white border-[#1E3E2A] shadow-xs'
                      : isDark
                      ? 'bg-rose-600 text-white border-rose-700 shadow-xs'
                      : 'bg-rose-500 text-white border-rose-600 shadow-xs'
                    : isDark
                    ? 'bg-slate-800 text-gray-300 border-slate-700 hover:bg-slate-700'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {cat.title.split('(')[0].trim()}
              </button>
            ))}
          </div>

          {/* Verbs */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className={`text-[11px] font-bold px-2 py-1 rounded-md shrink-0 ${
              isTextbook
                ? 'bg-amber-100 text-amber-900 font-serif-jp'
                : 'bg-amber-50 text-amber-600'
            }`}>
              동사 활용:
            </span>
            {PATTERN_DRILL_CATEGORIES.filter((c) => !c.partOfSpeech.includes('adj')).map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategoryId(cat.id);
                  setRevealedSentences({});
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  selectedCategoryId === cat.id
                    ? isTextbook
                      ? 'bg-[#C2410C] text-white border-orange-800 shadow-xs'
                      : isKyoto
                      ? 'bg-[#285238] text-white border-[#1E3E2A] shadow-xs'
                      : isDark
                      ? 'bg-rose-600 text-white border-rose-700 shadow-xs'
                      : 'bg-amber-500 text-white border-amber-600 shadow-xs'
                    : isDark
                    ? 'bg-slate-800 text-gray-300 border-slate-700 hover:bg-slate-700'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {cat.title.split('(')[0].trim()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Rule & Formula Banner */}
      <div className={`rounded-3xl p-6 text-white shadow-lg relative overflow-hidden ${
        isTextbook
          ? 'bg-gradient-to-r from-[#9A3412] to-[#B45309] border-2 border-amber-500/30 shadow-amber-950/20'
          : isKyoto
          ? 'bg-gradient-to-r from-[#1E3A2B] to-[#2D5A43] border border-emerald-700/40'
          : isDark
          ? 'bg-gradient-to-r from-[#1A202C] to-[#2D3748] border border-slate-700'
          : 'bg-gradient-to-r from-rose-500 via-rose-600 to-amber-600 shadow-rose-200/50'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] uppercase font-bold text-amber-200 bg-white/20 px-2.5 py-0.5 rounded-full">
              현재 트레이닝 패턴
            </span>
            <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${isTextbook ? 'font-serif-jp' : ''}`}>
              {currentCategory.title}
            </h3>
            <p className="text-xs sm:text-sm text-amber-100 mt-1 opacity-90">
              {currentCategory.grammarRule}
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-xs shrink-0 max-w-sm">
            <div className="text-amber-200 font-bold block mb-1">📐 활용 공식:</div>
            <div className="text-white font-mono text-sm font-extrabold bg-black/20 px-2.5 py-1 rounded-lg">
              {currentCategory.conjugationFormula}
            </div>
            <div className="mt-2 text-amber-100 text-[11px]">
              💡 <strong>지도 팁:</strong> {currentCategory.tutorPoint}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Mode Switcher */}
      <div className={`rounded-2xl border p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 ${
        isTextbook
          ? 'bg-[#FFFDF9] border-[#EADBCC]'
          : isKyoto
          ? 'bg-[#FCFCF9] border-[#DEDDD6]'
          : isDark
          ? 'bg-[#181D26] border-slate-700/80 text-gray-100'
          : 'bg-white border-gray-200'
      }`}>
        {/* Practice Mode Chips */}
        <div className={`flex rounded-xl p-1 text-xs font-semibold w-full sm:w-auto ${
          isDark ? 'bg-slate-800' : isTextbook ? 'bg-[#F4ECE1]' : 'bg-gray-100'
        }`}>
          <button
            onClick={() => setDrillMode('study')}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg transition-all ${
              drillMode === 'study'
                ? isTextbook
                  ? 'bg-white text-amber-900 shadow-xs font-bold'
                  : 'bg-white text-rose-600 shadow-xs font-bold'
                : isDark ? 'text-gray-400' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            모드 1: 전체 예문 연속 학습
          </button>
          <button
            onClick={() => {
              setDrillMode('cloze');
              hideAll();
            }}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg transition-all ${
              drillMode === 'cloze'
                ? isTextbook
                  ? 'bg-[#C2410C] text-white shadow-xs font-bold'
                  : 'bg-rose-500 text-white shadow-xs font-bold'
                : isDark ? 'text-gray-400' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            모드 2: 빈칸 가리기 자가 테스트
          </button>
          <button
            onClick={() => setDrillMode('shadowing')}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg transition-all ${
              drillMode === 'shadowing'
                ? isTextbook
                  ? 'bg-[#92400E] text-white shadow-xs font-bold'
                  : 'bg-amber-500 text-white shadow-xs font-bold'
                : isDark ? 'text-gray-400' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            모드 3: 1초 스피킹 섀도잉
          </button>
        </div>

        {/* Action Buttons */}
        {drillMode === 'cloze' && (
          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <div className="flex space-x-1">
              <button
                onClick={revealAll}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold ${
                  isDark ? 'bg-slate-800 hover:bg-slate-700 text-gray-200' : 'bg-stone-100 hover:bg-stone-200 text-gray-700'
                }`}
              >
                전체 정답 보기
              </button>
              <button
                onClick={hideAll}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold ${
                  isDark ? 'bg-slate-800 hover:bg-slate-700 text-gray-200' : 'bg-stone-100 hover:bg-stone-200 text-gray-700'
                }`}
              >
                다시 가리기
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 4. Sentence Practice Cards List */}
      <div className="space-y-4">
        {currentCategory.sentences.map((item: PatternDrillSentence, idx: number) => {
          const isRevealed = revealedSentences[item.id] || drillMode === 'study';

          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isTextbook
                  ? 'bg-[#FFFDF9] border-[#EADBCC] hover:border-amber-400'
                  : isKyoto
                  ? 'bg-[#FCFCF9] border-[#DEDDD6] hover:border-[#285238]'
                  : isDark
                  ? 'bg-[#181D26] border-slate-700/80 hover:border-slate-600 text-gray-100'
                  : 'bg-white border-gray-200 hover:border-rose-300'
              }`}
            >
              {/* Left Content */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-0.5 rounded-md text-xs font-extrabold flex items-center justify-center border ${
                    isTextbook
                      ? 'bg-[#FAF3E7] text-[#92400E] border-[#E2D5C3] font-serif-jp'
                      : isKyoto
                      ? 'bg-[#EDF5F0] text-[#285238] border-[#CCE0D3]'
                      : isDark
                      ? 'bg-slate-800 text-rose-300 border-slate-700'
                      : 'bg-rose-50 text-rose-600 border-rose-100'
                  }`}>
                    {isTextbook ? `例 ${idx + 1}` : idx + 1}
                  </span>

                  <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                    isDark ? 'bg-slate-800 text-gray-200' : 'bg-gray-100 text-gray-900'
                  }`}>
                    원형: {item.rootWord}
                  </span>

                  <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${
                    isTextbook
                      ? 'bg-amber-50 text-amber-900 border-amber-300 textbook-marker'
                      : isDark
                      ? 'bg-rose-950/60 text-rose-300 border-rose-800'
                      : 'bg-rose-50 text-rose-600 border-rose-200'
                  }`}>
                    변형: {item.conjugatedWord}
                  </span>

                  <span className={`text-[11px] hidden md:inline ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
                    • {item.situation}
                  </span>
                </div>

                {/* Japanese Sentence Display with Furigana */}
                <div className={`text-lg sm:text-xl font-bold leading-relaxed ${
                  isTextbook ? 'font-serif-jp text-[#2A2421]' : isKyoto ? 'font-serif-jp text-[#1F2923]' : 'text-gray-900'
                }`}>
                  {drillMode === 'cloze' && !isRevealed ? (
                    // Masked View in Cloze Test Mode
                    <div className="flex items-center flex-wrap gap-2">
                      <span>{item.japanese.split(item.targetPart)[0]}</span>
                      <button
                        onClick={() => toggleReveal(item.id)}
                        className={`px-3 py-1 border-2 border-dashed rounded-lg font-mono font-black text-sm tracking-widest cursor-pointer ${
                          isTextbook
                            ? 'bg-[#FEF3C7] hover:bg-[#FDE68A] border-amber-500 text-amber-900'
                            : 'bg-amber-100 hover:bg-amber-200 border-amber-400 text-amber-900'
                        }`}
                        title="클릭하여 빈칸 정답 확인"
                      >
                        [ ? 클릭하여 정답 확인 ]
                      </button>
                      <span>{item.japanese.split(item.targetPart)[1]}</span>
                    </div>
                  ) : (
                    // Full Revealed View
                    <div>
                      <FuriganaText
                        text={item.japanese}
                        reading={item.furigana}
                        showFurigana={showFurigana}
                        rtClassName={
                          isTextbook
                            ? 'text-[#C2410C] text-xs font-semibold'
                            : isDark
                            ? 'text-rose-400 text-xs font-normal'
                            : 'text-rose-600 text-xs font-normal'
                        }
                      />
                    </div>
                  )}
                </div>

                {/* Korean Translation */}
                <div className={`text-xs sm:text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {item.korean}
                </div>
              </div>

              {/* Right Controls: Cloze Reveal */}
              {drillMode === 'cloze' && (
                <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto">
                  <button
                    onClick={() => toggleReveal(item.id)}
                    className={`p-2 rounded-xl border text-xs flex items-center gap-1 font-semibold ${
                      isDark
                        ? 'border-slate-700 hover:bg-slate-800 text-gray-300'
                        : 'border-stone-200 hover:bg-stone-50 text-gray-600'
                    }`}
                  >
                    {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{isRevealed ? '가리기' : '정답'}</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

function RepeatIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </svg>
  );
}
