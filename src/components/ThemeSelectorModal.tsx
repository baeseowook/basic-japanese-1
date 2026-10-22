import React from 'react';
import { THEME_CONFIGS, ThemeMode } from '../types/theme';
import { Check, Palette, Sparkles, BookOpen, Compass, X } from 'lucide-react';

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ThemeMode;
  onSelectTheme: (theme: ThemeMode) => void;
}

export const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
}) => {
  if (!isOpen) return null;

  const themes: ThemeMode[] = ['textbook', 'kyoto', 'modern'];

  const getThemeIcon = (theme: ThemeMode) => {
    switch (theme) {
      case 'textbook':
        return <BookOpen className="w-5 h-5 text-amber-700" />;
      case 'kyoto':
        return <Compass className="w-5 h-5 text-emerald-800" />;
      case 'modern':
        return <Sparkles className="w-5 h-5 text-indigo-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-stone-200 overflow-hidden text-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                학습 화면 디자인 테마 선택
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                  3종 스타일
                </span>
              </h3>
              <p className="text-xs text-gray-500">
                실제 일본어 교재 감성의 워크북부터 모던 대시보드까지 원하는 분위기로 공부하세요.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme Options Grid */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {themes.map((themeId) => {
            const config = THEME_CONFIGS[themeId];
            const isSelected = currentTheme === themeId;

            return (
              <button
                key={themeId}
                onClick={() => {
                  onSelectTheme(themeId);
                }}
                className={`relative flex flex-col text-left p-4 rounded-xl border-2 transition-all duration-200 group ${
                  isSelected
                    ? 'border-amber-600 bg-amber-50/40 shadow-md ring-2 ring-amber-500/20'
                    : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/60'
                }`}
              >
                {/* Header of Card */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-lg bg-stone-100 group-hover:scale-105 transition-transform">
                      {getThemeIcon(themeId)}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                        {config.name}
                        {themeId === 'textbook' && (
                          <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-red-100 text-red-700 border border-red-300">
                            교재 추천
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-gray-500 font-serif-jp">
                        {config.jpName}
                      </div>
                    </div>
                  </div>

                  {isSelected ? (
                    <div className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-stone-300" />
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 leading-relaxed mt-1 mb-3">
                  {config.description}
                </p>

                {/* Visual Sample Bar */}
                <div className="mt-auto pt-2 border-t border-stone-200/70 flex items-center justify-between text-[11px]">
                  <span className="text-gray-500">{config.badge}</span>
                  <div className="flex items-center space-x-1.5">
                    {themeId === 'textbook' && (
                      <span className="hanko-stamp px-1.5 py-0.5 text-[10px] scale-90">
                        合格
                      </span>
                    )}
                    {themeId === 'kyoto' && (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-medium">
                        抹茶
                      </span>
                    )}
                    {themeId === 'modern' && (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-100 text-indigo-700 font-medium">
                        Studio
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            현재 적용 테마: <strong>{THEME_CONFIGS[currentTheme].name}</strong> ({THEME_CONFIGS[currentTheme].jpName})
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
          >
            선택 완료
          </button>
        </div>
      </div>
    </div>
  );
};
