import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ThemeMode, THEME_CONFIGS } from '../types/theme';
import { BookOpen, Sparkles, Compass, ChevronRight, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export const ThemeShowcaseBanner: React.FC = () => {
  const { theme, setTheme, isTextbook, isKyoto, isDark } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const themeList: {
    id: ThemeMode;
    label: string;
    sub: string;
    icon: React.ReactNode;
    badge: string;
    highlights: string[];
    bgPreview: string;
    borderPreview: string;
  }[] = [
    {
      id: 'textbook',
      label: '클래식 교재·워크북',
      sub: '教科書・問題集スタイル',
      icon: <BookOpen className="w-4 h-4 text-amber-800" />,
      badge: '추천 교재풍',
      highlights: ['미색 화지(和紙) 질감 배경', '주홍색 직인 스탬프 (重要/合格)', '교재 괘선 노트 & 형광펜 효과'],
      bgPreview: 'bg-[#FAF6EE] text-[#2D2825]',
      borderPreview: 'border-[#E6DACB]',
    },
    {
      id: 'kyoto',
      label: '교토 에디토리얼',
      sub: '京都エディトリアル',
      icon: <Compass className="w-4 h-4 text-emerald-800" />,
      badge: '와비사비 말차',
      highlights: ['자연스러운 스톤 그레이 톤', '차분한 말차 그린(#285238) 포인트', '절제된 미니멀 일본 잡지 감성'],
      bgPreview: 'bg-[#F4F4F0] text-[#222B25]',
      borderPreview: 'border-[#DEDDD6]',
    },
    {
      id: 'modern',
      label: '모던 스터디 스튜디오',
      sub: 'モダン・スタジオ',
      icon: <Sparkles className="w-4 h-4 text-indigo-600" />,
      badge: '스마트 SaaS',
      highlights: ['선명한 인디고 & 로즈 팔레트', '경쾌한 Ed-Tech 대시보드', '직관적인 인터랙티브 카드'],
      bgPreview: 'bg-white text-slate-900',
      borderPreview: 'border-slate-200',
    },
  ];

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 overflow-hidden mb-6 shadow-xs ${
        isTextbook
          ? 'bg-[#FFFDF8] border-[#E8DFC8] shadow-amber-950/5'
          : isKyoto
          ? 'bg-[#FBFBFA] border-[#DEDDD6]'
          : isDark
          ? 'bg-[#161B22] border-slate-700/80 text-gray-100'
          : 'bg-white border-slate-200'
      }`}
    >
      {/* Top Banner Row */}
      <div className="px-4 py-3 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              isTextbook
                ? 'bg-amber-100 text-amber-900'
                : isKyoto
                ? 'bg-emerald-100 text-emerald-900'
                : isDark
                ? 'bg-slate-800 text-rose-400'
                : 'bg-indigo-50 text-indigo-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm">
                디자인 스타일 제안 &amp; 테마 전환
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/80">
                현재 적용: {THEME_CONFIGS[theme].name}
              </span>
            </div>
            <p className="text-xs text-gray-500 hidden sm:block mt-0.5">
              요청하신 <strong>텍스트북(교재) 형식</strong>을 기본 적용하였으며, 취향에 따라 3가지 테마를 실시간 전환할 수 있습니다.
            </p>
          </div>
        </div>

        {/* Quick Theme Switch Buttons */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          {themeList.map((t) => {
            const isCurrent = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                  isCurrent
                    ? isTextbook
                      ? 'bg-amber-700 text-white border-amber-800 shadow-xs'
                      : isKyoto
                      ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                      : isDark
                      ? 'bg-rose-600 text-white border-rose-700 shadow-xs'
                      : 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                    : isDark
                    ? 'bg-slate-800 text-gray-300 border-slate-700 hover:bg-slate-700'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {t.icon}
                <span>{t.label}</span>
                {isCurrent && <CheckCircle2 className="w-3.5 h-3.5 ml-0.5" />}
              </button>
            );
          })}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            title="테마별 디자인 특징 자세히 보기"
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors ml-1"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Comparison Cards */}
      {isExpanded && (
        <div
          className={`px-4 sm:px-6 py-4 border-t transition-all ${
            isDark ? 'border-slate-800 bg-[#12161F]' : 'border-stone-100 bg-stone-50/60'
          }`}
        >
          <div className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">
            제안된 4대 디자인 컨셉 비교 및 특징
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {themeList.map((t) => {
              const isCurrent = theme === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isCurrent
                      ? 'ring-2 ring-amber-500/30 border-amber-500 bg-white shadow-xs'
                      : isDark
                      ? 'border-slate-700 bg-slate-800/60 hover:border-slate-600'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs flex items-center gap-1.5">
                      {t.icon}
                      {t.label}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-stone-100 text-stone-700 font-medium">
                      {t.badge}
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-400 font-serif-jp mb-2">
                    {t.sub}
                  </div>
                  <ul className="text-[11px] space-y-1 text-gray-600 dark:text-gray-400">
                    {t.highlights.map((h, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="text-amber-500 shrink-0">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 pt-2 border-t border-stone-100 dark:border-slate-700 flex items-center justify-between text-[10px]">
                    <span className={isCurrent ? 'font-bold text-amber-700' : 'text-gray-400'}>
                      {isCurrent ? '현재 활성화됨' : '클릭하여 적용'}
                    </span>
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
