import React from 'react';
import { TUTORING_CURRICULUM } from '../data/curriculum';
import { Clock, BookCheck, ArrowRight, UserCheck, Sparkles, CheckCircle2, BookOpen, Bookmark, FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface CurriculumViewProps {
  onStartStage: (stageIndex: number, tabId: string) => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({ onStartStage }) => {
  const { theme, isTextbook, isKyoto, isDark } = useTheme();

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

  const getStageJpUnit = (stageIdx: number) => {
    switch (stageIdx) {
      case 0: return '導入・文法基礎';
      case 1: return '第1課 形容詞活用';
      case 2: return '第2課 動詞グループ';
      case 3: return '第3課 て形完全攻略';
      case 4: return '第4課 場面別会話';
      case 5: return '修了 総合テスト';
      default: return `第${stageIdx + 1}課`;
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Hero Banner: Styled specifically according to active theme */}
      <div
        className={`rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden transition-all ${
          isTextbook
            ? 'bg-gradient-to-br from-[#7C2D12] via-[#9A3412] to-[#B45309] border-2 border-[#D97706]/40 shadow-amber-950/20'
            : isKyoto
            ? 'bg-gradient-to-br from-[#1E3A2B] via-[#2D5A43] to-[#3B6E52] border border-[#528769]/30 shadow-emerald-950/20'
            : isDark
            ? 'bg-gradient-to-br from-[#1E2433] via-[#242C3E] to-[#161B26] border border-slate-700 shadow-slate-950/40'
            : 'bg-gradient-to-br from-rose-500 via-rose-600 to-amber-600 shadow-rose-200/50'
        }`}
      >
        {/* Textbook decorative corner ribbon */}
        {isTextbook && (
          <div className="absolute top-0 right-0 overflow-hidden w-36 h-36 pointer-events-none">
            <div className="bg-[#B91C1C] text-[#FEF3C7] text-[10px] font-bold py-1 w-48 text-center rotate-45 translate-x-10 translate-y-7 shadow-md tracking-wider font-serif-jp">
              文部科学省認可風
            </div>
          </div>
        )}

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>1:1 개인 과외 집중 지도 교안 (110분 ~ 120분)</span>
            {isTextbook && <span className="font-serif-jp ml-1">【教科書版】</span>}
          </div>

          <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight ${
            isTextbook ? 'font-serif-jp tracking-wide' : isKyoto ? 'font-serif-jp' : ''
          }`}>
            일본어 형용사·동사 활용 마스터
          </h2>

          <p className="mt-3 text-amber-50 text-sm sm:text-base leading-relaxed opacity-95">
            문법 규칙을 눈으로만 보는 수업은 끝났습니다.
            본 교재는 <span className="text-white font-bold underline decoration-amber-300">1초 만에 일본어로 말할 수 있도록</span> 설계된
            2시간 완성 1:1 회화 집중 트레이닝 워크북입니다.
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <div className="bg-white/15 backdrop-blur-xs rounded-xl px-4 py-2 border border-white/20 text-xs sm:text-sm">
              <span className="block text-amber-200 text-xs">수업 권장 시간</span>
              <strong className="text-white text-base">110 ~ 120분</strong>
            </div>
            <div className="bg-white/15 backdrop-blur-xs rounded-xl px-4 py-2 border border-white/20 text-xs sm:text-sm">
              <span className="block text-amber-200 text-xs">활용별 반복 예문</span>
              <strong className="text-white text-base">80+ 집중 회화 문장</strong>
            </div>
            <div className="bg-white/15 backdrop-blur-xs rounded-xl px-4 py-2 border border-white/20 text-xs sm:text-sm">
              <span className="block text-amber-200 text-xs">3대 훈련 모드</span>
              <strong className="text-white text-base">연속듣기 / 섀도잉 / 빈칸</strong>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/20 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onStartStage(1, 'drills')}
              className={`px-4 py-2 rounded-xl font-extrabold text-xs sm:text-sm transition-all shadow-md flex items-center space-x-1.5 ${
                isTextbook
                  ? 'bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#78350F]'
                  : isKyoto
                  ? 'bg-[#E6F4EA] hover:bg-[#CEEAD6] text-[#137333]'
                  : 'bg-amber-400 hover:bg-amber-300 text-gray-900'
              }`}
            >
              <span>⚡ 활용 형태별 대량 예문 반복 훈련소 바로가기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-amber-100 opacity-90">
              ※ 각 품사별로 많은 예문을 반복하여 소리 내어 말하는 과외 특화 모드입니다.
            </span>
          </div>
        </div>
      </div>

      {/* Stage 0 Foundation: 조사 8대 핵심 & 존재동사 */}
      <div
        className={`rounded-2xl p-6 transition-all ${
          isTextbook
            ? 'bg-[#FFFDF9] border-2 border-[#D8C7B2] shadow-sm'
            : isKyoto
            ? 'bg-[#FCFCF9] border border-[#CCD7CD]'
            : isDark
            ? 'bg-[#181D26] border border-slate-700 text-gray-100'
            : 'bg-amber-50/70 border border-amber-300'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2.5 font-extrabold text-lg">
            <BookCheck className={`w-5 h-5 ${isTextbook ? 'text-amber-800' : isKyoto ? 'text-emerald-800' : 'text-amber-700'}`} />
            <span className={isTextbook ? 'font-serif-jp text-[#1F1610]' : isDark ? 'text-white' : 'text-stone-950'}>
              [수업 전 5분 점검] 일본어 문장의 뼈대: 필수 조사 8종 &amp; 존재 동사
            </span>
          </div>
          {isTextbook && (
            <span className="hanko-stamp text-[10px] px-2 py-0.5">
              基礎確認
            </span>
          )}
        </div>

        <p className={`text-xs sm:text-sm mb-4 leading-relaxed font-semibold ${isDark ? 'text-slate-200' : 'text-stone-900'}`}>
          형용사와 동사를 결합하기 전, 한국인이 가장 많이 틀리는 특수 조사 패턴과 존재동사 뉘앙스를 먼저 빠르게 짚고 시작합니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className={`p-3.5 rounded-xl border ${
            isTextbook 
              ? 'bg-[#FAF6EE] border-[#D8C7B2]' 
              : isDark
              ? 'bg-slate-800/90 border-slate-700'
              : 'bg-white border-amber-300 shadow-xs'
          }`}>
            <div className={`font-extrabold text-sm mb-1.5 ${isTextbook ? 'text-[#78350F] font-serif-jp' : isDark ? 'text-amber-300' : 'text-amber-950'}`}>
              は (wa) vs が (ga)
            </div>
            <p className={`leading-relaxed font-medium ${isDark ? 'text-slate-100' : 'text-stone-900'}`}>
              <strong className={isDark ? 'text-white font-bold' : 'text-stone-950 font-bold'}>は:</strong> 화제/대조 (~은/는)<br />
              <strong className={isDark ? 'text-white font-bold' : 'text-stone-950 font-bold'}>が:</strong> 주어/감정·능력 대상 (~이/가)<br />
              <span className="text-red-700 dark:text-red-400 font-bold">★ ~が好きです, ~が上手です</span>
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${
            isTextbook 
              ? 'bg-[#FAF6EE] border-[#D8C7B2]' 
              : isDark
              ? 'bg-slate-800/90 border-slate-700'
              : 'bg-white border-amber-300 shadow-xs'
          }`}>
            <div className={`font-extrabold text-sm mb-1.5 ${isTextbook ? 'text-[#78350F] font-serif-jp' : isDark ? 'text-amber-300' : 'text-amber-950'}`}>
              を (o) vs に (ni)
            </div>
            <p className={`leading-relaxed font-medium ${isDark ? 'text-slate-100' : 'text-stone-900'}`}>
              <strong className={isDark ? 'text-white font-bold' : 'text-stone-950 font-bold'}>を:</strong> 타동사의 목적어 (~을/를)<br />
              <strong className={isDark ? 'text-white font-bold' : 'text-stone-950 font-bold'}>に:</strong> 시간/도달점/만나는 대상<br />
              <span className="text-red-700 dark:text-red-400 font-bold">★ 友達に会う (친구를 만나다)</span>
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${
            isTextbook 
              ? 'bg-[#FAF6EE] border-[#D8C7B2]' 
              : isDark
              ? 'bg-slate-800/90 border-slate-700'
              : 'bg-white border-amber-300 shadow-xs'
          }`}>
            <div className={`font-extrabold text-sm mb-1.5 ${isTextbook ? 'text-[#78350F] font-serif-jp' : isDark ? 'text-amber-300' : 'text-amber-950'}`}>
              で (de) vs へ (e)
            </div>
            <p className={`leading-relaxed font-medium ${isDark ? 'text-slate-100' : 'text-stone-900'}`}>
              <strong className={isDark ? 'text-white font-bold' : 'text-stone-950 font-bold'}>で:</strong> 장소(에서)/수단(도구·교통)<br />
              <strong className={isDark ? 'text-white font-bold' : 'text-stone-950 font-bold'}>へ:</strong> 이동 방향 (~(으)로 향하다)<br />
              <span className="text-stone-950 dark:text-amber-200 font-bold">★ 電車で行く, 日本へ行く</span>
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${
            isTextbook 
              ? 'bg-[#FAF6EE] border-[#D8C7B2]' 
              : isDark
              ? 'bg-slate-800/90 border-slate-700'
              : 'bg-white border-amber-300 shadow-xs'
          }`}>
            <div className={`font-extrabold text-sm mb-1.5 ${isTextbook ? 'text-[#78350F] font-serif-jp' : isDark ? 'text-amber-300' : 'text-amber-950'}`}>
              ある (aru) vs いる (iru)
            </div>
            <p className={`leading-relaxed font-medium ${isDark ? 'text-slate-100' : 'text-stone-900'}`}>
              <strong className={isDark ? 'text-white font-bold' : 'text-stone-950 font-bold'}>ある/あります:</strong> 무생물·식물 (책, 돈)<br />
              <strong className={isDark ? 'text-white font-bold' : 'text-stone-950 font-bold'}>いる/います:</strong> 사람·동물 (친구, 고양이)<br />
              <span className="text-red-700 dark:text-red-400 font-bold">★ 生物 / 無生物 엄격 구분!</span>
            </p>
          </div>
        </div>
      </div>

      {/* 120-Minute Detailed Lesson Stages */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className={`text-xl font-extrabold flex items-center gap-2 ${
              isTextbook ? 'font-serif-jp text-[#1F1610]' : isKyoto ? 'font-serif-jp text-[#142318]' : isDark ? 'text-white' : 'text-stone-950'
            }`}>
              {isTextbook ? '📖 第1課~第5課 体系的 カリキュラム ロードマップ' : '2시간 과외 단계별 커리큘럼 로드맵'}
            </h3>
            <p className={`text-xs sm:text-sm font-semibold mt-1 ${isDark ? 'text-slate-200' : 'text-stone-800'}`}>
              {isTextbook ? '일본어 정규 교재 진도표 및 과외 실전 핑퐁 회화 매뉴얼' : '시간 관리와 핑퐁 말하기 연습을 위한 과외 지도 매뉴얼'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {TUTORING_CURRICULUM.map((stage, idx) => (
            <div
              key={stage.id}
              className={`rounded-2xl border transition-all p-5 sm:p-6 shadow-xs group ${
                isTextbook
                  ? 'bg-[#FFFDF9] border-[#D8C7B2] hover:border-amber-600 hover:shadow-md'
                  : isKyoto
                  ? 'bg-[#FCFCF9] border-[#CCD7CD] hover:border-[#285238]'
                  : isDark
                  ? 'bg-[#181D26] border-slate-700/80 hover:border-slate-600 text-gray-100'
                  : 'bg-white border-stone-200 hover:border-rose-300'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-bold shrink-0 border ${
                    isTextbook
                      ? 'bg-[#FAF3E7] text-[#78350F] border-[#D8C7B2] font-serif-jp'
                      : isKyoto
                      ? 'bg-[#EDF5F0] text-[#1E3E2A] border-[#CCE0D3]'
                      : isDark
                      ? 'bg-slate-800 text-rose-300 border-slate-700'
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}>
                    <span className="text-[10px] uppercase font-black">
                      {isTextbook ? '課' : '단계'}
                    </span>
                    <span className="text-lg leading-none font-black">{stage.stepNumber}</span>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 text-xs font-bold mb-1">
                      <Clock className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                      <span className={isTextbook ? 'text-[#854D0E] font-extrabold' : isDark ? 'text-amber-300 font-extrabold' : 'text-rose-700 font-extrabold'}>
                        {stage.timeRange}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isDark ? 'bg-slate-800 text-slate-100 border border-slate-700' : 'bg-stone-100 text-stone-900 border border-stone-300'
                      }`}>
                        {stage.durationMinutes}분 집중
                      </span>
                      {isTextbook && (
                        <span className="hanko-stamp text-[9px] px-1.5 py-0.2 scale-90">
                          {getStageJpUnit(idx)}
                        </span>
                      )}
                    </div>

                    <h4 className={`text-lg font-extrabold transition-colors ${
                      isTextbook
                        ? 'font-serif-jp text-[#1F1610] group-hover:text-amber-900'
                        : isKyoto
                        ? 'font-serif-jp text-[#142318] group-hover:text-[#1E3E2A]'
                        : isDark
                        ? 'text-white group-hover:text-rose-300'
                        : 'text-stone-950 group-hover:text-rose-700'
                    }`}>
                      {stage.title}
                    </h4>
                    <p className={`text-xs sm:text-sm mt-1 font-semibold leading-relaxed ${isDark ? 'text-slate-200' : 'text-stone-800'}`}>
                      {stage.subtitle}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onStartStage(idx, stageToTab(idx))}
                  className={`inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-white text-xs sm:text-sm font-bold transition-all self-start lg:self-auto shrink-0 shadow-sm ${
                    isTextbook
                      ? 'bg-[#C2410C] hover:bg-[#9A3412]'
                      : isKyoto
                      ? 'bg-[#285238] hover:bg-[#1E3E2A]'
                      : isDark
                      ? 'bg-rose-600 hover:bg-rose-500'
                      : 'bg-stone-900 hover:bg-rose-600'
                  }`}
                >
                  <span>이 단계 학습하기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Stage Detail Grid: Goals + Tutor Guide + Student Checklist */}
              <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 pt-4 border-t text-xs ${
                isDark ? 'border-slate-800' : 'border-stone-200'
              }`}>
                {/* Goals */}
                <div className={`p-4 rounded-xl border ${
                  isTextbook
                    ? 'bg-[#FAF6EE] border-[#D8C7B2]'
                    : isDark
                    ? 'bg-slate-800/90 border-slate-700'
                    : 'bg-stone-50 border-stone-200 shadow-2xs'
                }`}>
                  <div className={`font-extrabold flex items-center space-x-1.5 mb-2.5 ${isDark ? 'text-amber-300' : 'text-stone-950'}`}>
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span className="text-xs font-bold">핵심 학습 목표</span>
                  </div>
                  <ul className={`space-y-2 text-xs font-semibold ${isDark ? 'text-slate-100' : 'text-stone-900'}`}>
                    {stage.keyGoals.map((goal, gIdx) => (
                      <li key={gIdx} className="flex items-start space-x-2">
                        <span className="text-amber-700 dark:text-amber-400 font-black">•</span>
                        <span className="leading-relaxed">{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tutor Guide */}
                <div className={`p-4 rounded-xl border ${
                  isTextbook
                    ? 'bg-[#FEF3C7]/60 border-[#FCD34D]'
                    : isDark
                    ? 'bg-amber-950/40 border-amber-800/60'
                    : 'bg-amber-50/90 border-amber-200 shadow-2xs'
                }`}>
                  <div className={`font-extrabold flex items-center space-x-1.5 mb-2.5 ${isDark ? 'text-amber-200' : 'text-amber-950'}`}>
                    <UserCheck className="w-3.5 h-3.5 text-amber-800 dark:text-amber-400" />
                    <span className="text-xs font-bold">과외 선생님 지도 가이드 (Tutor Tip)</span>
                  </div>
                  <p className={`leading-relaxed text-xs font-semibold ${isDark ? 'text-slate-100' : 'text-stone-950'}`}>
                    {stage.tutorGuide}
                  </p>
                </div>

                {/* Student Checklist */}
                <div className={`p-4 rounded-xl border ${
                  isTextbook
                    ? 'bg-[#ECFDF5]/80 border-[#6EE7B7]'
                    : isDark
                    ? 'bg-emerald-950/40 border-emerald-800/60'
                    : 'bg-emerald-50/90 border-emerald-200 shadow-2xs'
                }`}>
                  <div className={`font-extrabold flex items-center space-x-1.5 mb-2.5 ${isDark ? 'text-emerald-300' : 'text-emerald-950'}`}>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                    <span className="text-xs font-bold">학생 자가 점검 체크리스트</span>
                  </div>
                  <ul className={`space-y-2 text-xs font-semibold ${isDark ? 'text-emerald-100' : 'text-stone-950'}`}>
                    {stage.studentChecklist.map((item, cIdx) => (
                      <li key={cIdx} className="flex items-start space-x-2">
                        <span className="text-emerald-700 dark:text-emerald-400 font-black">✓</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
