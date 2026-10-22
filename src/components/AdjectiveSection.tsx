import React, { useState } from 'react';
import { ADJECTIVES_DATA } from '../data/adjectives';
import { AdjectiveItem, AdjectiveType } from '../types';
import { getAdjectiveExampleSentences } from '../utils/conjugationExamples';
import { FuriganaText } from './FuriganaText';
import { Sparkles, AlertTriangle, BookOpen, MessageCircle } from 'lucide-react';

interface AdjectiveSectionProps {
  showFurigana: boolean;
  speechRate: number;
}

export const AdjectiveSection: React.FC<AdjectiveSectionProps> = ({ showFurigana }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredAdjectives = ADJECTIVES_DATA.filter((adj) => {
    const matchesCategory = selectedCategory === 'all' || adj.category === selectedCategory;
    const matchesType = selectedType === 'all' || adj.type === selectedType;
    return matchesCategory && matchesType;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Title & Section Header */}
      <div>
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>[1교시 25분 집중] 형용사의 모든 것</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          い형용사 &amp; な형용사 8대 핵심 활용 공식
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          일본어 형용사는 오직 2가지(い형용사와 な형용사)뿐입니다.
          어미 변형 규칙을 마스터하면 30여 개 필수 일상 어휘로 즉시 감정과 상태를 표현할 수 있습니다.
        </p>
      </div>

      {/* Comparison Master Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-rose-500 to-amber-500 p-4 sm:p-5 text-white">
          <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            <span>い형용사 vs な형용사 8대 기본 활용 비교 총정리</span>
          </h3>
          <p className="text-xs text-rose-100 mt-1">
            어간과 어미가 어떻게 떨어지고 바뀌는지 빨간색 표시를 주의 깊게 확인하세요!
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 font-semibold">
              <tr>
                <th className="p-3 sm:p-4">활용 형태 (의미)</th>
                <th className="p-3 sm:p-4 bg-rose-50/50 text-rose-900">
                  い형용사 규칙 (예: 美味しい)
                </th>
                <th className="p-3 sm:p-4 bg-amber-50/50 text-amber-900">
                  な형용사 규칙 (예: 綺麗だ)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-800">
              <tr>
                <td className="p-3 sm:p-4 font-semibold text-gray-900">기본형 (반말 긍정)</td>
                <td className="p-3 sm:p-4 bg-rose-50/20">
                  <span className="font-bold">美味しい</span> (맛있다)
                  <div className="text-xs text-gray-500">어미 [い]로 끝남</div>
                </td>
                <td className="p-3 sm:p-4 bg-amber-50/20">
                  <span className="font-bold">綺麗だ</span> (예쁘다)
                  <div className="text-xs text-gray-500">어미 [だ]로 끝남</div>
                </td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-semibold text-gray-900">정중형 (~입니다)</td>
                <td className="p-3 sm:p-4 bg-rose-50/20">
                  美味し<strong className="text-rose-600">いです</strong>
                  <div className="text-xs text-gray-500">기본형 뒤에 그냥 [です]</div>
                </td>
                <td className="p-3 sm:p-4 bg-amber-50/20">
                  綺麗<strong className="text-amber-600">です</strong>
                  <div className="text-xs text-gray-500">だ를 떼고 바로 [です]</div>
                </td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-semibold text-gray-900">정중 부정 (~지 않습니다)</td>
                <td className="p-3 sm:p-4 bg-rose-50/20">
                  美味し<strong className="text-rose-600">くないです</strong>
                  <div className="text-xs text-gray-500">い 떼고 → [くないです]</div>
                </td>
                <td className="p-3 sm:p-4 bg-amber-50/20">
                  綺麗<strong className="text-amber-600">じゃないです</strong> (ではありません)
                  <div className="text-xs text-gray-500">だ 떼고 → [じゃないです]</div>
                </td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-semibold text-gray-900">정중 과거 (~었습니다)</td>
                <td className="p-3 sm:p-4 bg-rose-50/20">
                  美味し<strong className="text-rose-600">かったです</strong>
                  <div className="text-xs text-gray-500">い 떼고 → [かったです]</div>
                </td>
                <td className="p-3 sm:p-4 bg-amber-50/20">
                  綺麗<strong className="text-amber-600">でした</strong>
                  <div className="text-xs text-gray-500">だ 떼고 → [でした]</div>
                </td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-semibold text-gray-900">정중 과거부정 (~지 않았습니다)</td>
                <td className="p-3 sm:p-4 bg-rose-50/20">
                  美味し<strong className="text-rose-600">くなかったです</strong>
                </td>
                <td className="p-3 sm:p-4 bg-amber-50/20">
                  綺麗<strong className="text-amber-600">じゃありませんでした</strong>
                </td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-semibold text-gray-900">연결형 (~하고, ~해서)</td>
                <td className="p-3 sm:p-4 bg-rose-50/20">
                  美味し<strong className="text-rose-600">くて</strong> (맛있고/맛있어서)
                  <div className="text-xs text-rose-700 font-medium">★ 安くて美味しい (싸고 맛있다)</div>
                </td>
                <td className="p-3 sm:p-4 bg-amber-50/20">
                  綺麗<strong className="text-amber-600">で</strong> (예쁘고/예뻐서)
                  <div className="text-xs text-amber-700 font-medium">★ 静かで便利だ (조용하고 편리하다)</div>
                </td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-semibold text-gray-900">부사형 (~하게, ~히)</td>
                <td className="p-3 sm:p-4 bg-rose-50/20">
                  美味し<strong className="text-rose-600">く</strong> / 早<strong className="text-rose-600">く</strong> (빨리)
                </td>
                <td className="p-3 sm:p-4 bg-amber-50/20">
                  綺麗<strong className="text-amber-600">に</strong> / 静か<strong className="text-amber-600">に</strong> (조용히)
                </td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-semibold text-gray-900">명사 수식형 (~한 [명사])</td>
                <td className="p-3 sm:p-4 bg-rose-50/20">
                  美味しい<strong className="text-rose-600">料理</strong> (맛있는 요리)
                </td>
                <td className="p-3 sm:p-4 bg-amber-50/20">
                  綺麗<strong className="text-amber-600">な花</strong> (★だ 대신 [な] 결합!)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Irregular Adjective Callout: いい (좋다) */}
      <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-rose-500 text-white rounded-xl shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h4 className="text-base sm:text-lg font-black text-rose-950 flex items-center gap-2">
              ★ 과외 시험 100% 출제 함정: 「いい / よい (좋다)」의 특수 불규칙 변형!
            </h4>
            <p className="text-xs sm:text-sm text-rose-900 leading-relaxed">
              기본형일 때만 <strong className="text-rose-700">いい</strong>를 쓸 수 있으며,
              부정이나 과거형으로 변형할 때는 원래의 옛말인 <strong className="text-rose-700">「よい(요이)」</strong>의 어간 <strong>「よ」</strong>를 기준으로 변형합니다!
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-rose-200 text-center">
                <span className="text-gray-400 block text-[10px]">현재 긍정</span>
                <strong className="text-gray-900 text-sm">いいです</strong>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-rose-200 text-center">
                <span className="text-gray-400 block text-[10px]">부정형 (いくない X)</span>
                <strong className="text-rose-600 text-sm">よくないです</strong>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-rose-200 text-center">
                <span className="text-gray-400 block text-[10px]">과거형 (いかった X)</span>
                <strong className="text-rose-600 text-sm">よかったです</strong>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-rose-200 text-center">
                <span className="text-gray-400 block text-[10px]">연결형 (いくて X)</span>
                <strong className="text-rose-600 text-sm">よくて</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar: Type Filter & Category Filter Chips */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-1.5">
            <span>품사 및 주제별 보기:</span>
          </div>

          {/* Type Filter */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedType === 'all' ? 'bg-gray-900 text-white shadow-xs' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              전체 품사 ({ADJECTIVES_DATA.length})
            </button>
            <button
              onClick={() => setSelectedType('i-adjective')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedType === 'i-adjective' ? 'bg-rose-500 text-white shadow-xs' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
              }`}
            >
              い형용사 ({ADJECTIVES_DATA.filter(a => a.type === 'i-adjective').length})
            </button>
            <button
              onClick={() => setSelectedType('na-adjective')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedType === 'na-adjective' ? 'bg-amber-500 text-white shadow-xs' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
              }`}
            >
              な형용사 ({ADJECTIVES_DATA.filter(a => a.type === 'na-adjective').length})
            </button>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1 text-xs">
          {[
            { id: 'all', label: '전체 카테고리' },
            { id: 'taste', label: '🍜 음식 & 미식' },
            { id: 'emotion', label: '😊 감정 & 기분' },
            { id: 'weather_price', label: '☀️ 날씨 & 가격' },
            { id: 'state', label: '💼 일상 상태' },
            { id: 'appearance', label: '✨ 외모 & 풍경' },
            { id: 'personality', label: '🤝 성격 & 태도' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                selectedCategory === cat.id
                  ? 'bg-rose-100 text-rose-800 font-bold border border-rose-300'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredAdjectives.map((item) => {
          const isIAdj = item.type === 'i-adjective';

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200 hover:border-rose-300 transition-all p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Header: Word & Furigana + Meaning */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                          isIAdj ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {isIAdj ? 'い형용사' : 'な형용사'}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">{item.romaji}</span>
                    </div>

                    <div className="mt-1 flex items-baseline space-x-2">
                      <div className="text-2xl font-black text-gray-900">
                        <FuriganaText
                          text={item.kanji}
                          reading={item.furigana}
                          showFurigana={showFurigana}
                          rtClassName="text-rose-600 font-normal text-xs"
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-700">({item.koreanMeaning})</span>
                    </div>
                  </div>
                </div>

                {/* 8-Form Conjugation Quick Matrix */}
                <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                    <span className="text-[10px] text-gray-400 block">정중형 (입니다)</span>
                    <strong className="text-gray-900">{item.conjugations.presentPolite}</strong>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                    <span className="text-[10px] text-gray-400 block">정중 부정 (않습니다)</span>
                    <strong className="text-rose-600">{item.conjugations.negativePolite}</strong>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                    <span className="text-[10px] text-gray-400 block">정중 과거 (었습니다)</span>
                    <strong className="text-gray-900">{item.conjugations.pastPolite}</strong>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                    <span className="text-[10px] text-gray-400 block">연결형 (하고/해서)</span>
                    <strong className="text-amber-700">{item.conjugations.teForm}</strong>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                    <span className="text-[10px] text-gray-400 block">부사형 (~하게)</span>
                    <strong className="text-blue-700">{item.conjugations.adverbForm}</strong>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                    <span className="text-[10px] text-gray-400 block">명사 수식형 (~한 [명사])</span>
                    <strong className="text-emerald-700">{item.conjugations.nounModifier}</strong>
                  </div>
                </div>

                {/* Multiple Practical Conversation Example Sentences */}
                <div className="mt-4 bg-rose-50/40 border border-rose-100 rounded-xl p-3.5 text-xs">
                  <div className="flex items-center justify-between text-[11px] font-bold text-rose-800 mb-2">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5 text-rose-600" />
                      <span>활용 형태별 회화 예문 (반복 훈련)</span>
                    </span>
                    <span className="text-[10px] text-gray-500 font-normal">탭을 눌러 형태별 예문을 전환하세요</span>
                  </div>

                  <AdjectiveCardExamples
                    item={item}
                    showFurigana={showFurigana}
                  />
                </div>
              </div>

              {/* Tutor Tip / Speaking Challenge */}
              {item.conversationExample.tutorTip && (
                <div className="mt-3 pt-2.5 border-t border-gray-100 text-[11px] text-amber-900 flex items-start gap-1.5">
                  <span className="font-bold text-amber-600 shrink-0">💡 과외 팁:</span>
                  <span className="leading-snug">{item.conversationExample.tutorTip}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface AdjectiveCardExamplesProps {
  item: AdjectiveItem;
  showFurigana: boolean;
  speechRate?: number;
}

const AdjectiveCardExamples: React.FC<AdjectiveCardExamplesProps> = ({ item, showFurigana }) => {
  const sentences = getAdjectiveExampleSentences(item);
  const [activeFormIndex, setActiveFormIndex] = useState<number>(0);

  const currentSentence = sentences[activeFormIndex] || sentences[0];

  return (
    <div className="space-y-2.5">
      {/* Form Pills Selector */}
      <div className="flex flex-wrap gap-1">
        {sentences.map((s, idx) => (
          <button
            key={s.formType}
            onClick={() => setActiveFormIndex(idx)}
            className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all border ${
              activeFormIndex === idx
                ? 'bg-rose-500 text-white border-rose-600 shadow-2xs'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {s.formName}
          </button>
        ))}
      </div>

      {/* Selected Example Sentence Box */}
      <div className="bg-white p-3 rounded-xl border border-rose-200/80 shadow-2xs space-y-1.5">
        <div className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
          <FuriganaText
            text={currentSentence.japanese}
            reading={currentSentence.furigana}
            showFurigana={showFurigana}
            rtClassName="text-rose-600 text-[10px]"
          />
        </div>

        <div className="text-[11px] text-gray-600 font-medium">
          {currentSentence.korean}
        </div>

        {currentSentence.situation && (
          <div className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded inline-block">
            📍 상황: {currentSentence.situation}
          </div>
        )}
      </div>
    </div>
  );
};
