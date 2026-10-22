import React, { useState } from 'react';
import { VERBS_DATA } from '../data/verbs';
import { ADJECTIVES_DATA } from '../data/adjectives';
import { playJapaneseAudio } from '../utils/speech';
import { FuriganaText } from './FuriganaText';
import { Sliders, Volume2, ArrowRight, Sparkles, Check, RefreshCw } from 'lucide-react';

interface ConjugationMachineProps {
  showFurigana: boolean;
  speechRate: number;
}

export const ConjugationMachine: React.FC<ConjugationMachineProps> = ({ showFurigana, speechRate }) => {
  const [wordType, setWordType] = useState<'verb' | 'adjective'>('verb');
  const [selectedVerbId, setSelectedVerbId] = useState<string>('nomu');
  const [selectedAdjId, setSelectedAdjId] = useState<string>('oishii');
  const [selectedForm, setSelectedForm] = useState<string>('te');

  const selectedVerb = VERBS_DATA.find((v) => v.id === selectedVerbId) || VERBS_DATA[0];
  const selectedAdj = ADJECTIVES_DATA.find((a) => a.id === selectedAdjId) || ADJECTIVES_DATA[0];

  const handlePlayAudio = (text: string) => {
    playJapaneseAudio(text, speechRate);
  };

  // Verb forms generator
  const getVerbResult = (form: string) => {
    switch (form) {
      case 'masu':
        return {
          title: '정중형 (~합니다)',
          conjugated: selectedVerb.conjugations.masuForm,
          rule:
            selectedVerb.groupNumber === 2
              ? `어미 'る'를 제거하고 'ます' 결합`
              : selectedVerb.groupNumber === 3
              ? `불규칙 변화 (する->します, 来る->きます)`
              : `어미의 [う단]을 [い단]으로 바꾸고 'ます' 결합`,
          example: `${selectedVerb.conjugations.masuForm}。 (${selectedVerb.koreanMeaning.split('(')[0]}합니다.)`,
        };
      case 'nai':
        return {
          title: '반말 부정형 (~하지 않다)',
          conjugated: selectedVerb.conjugations.naiForm,
          rule:
            selectedVerb.groupNumber === 2
              ? `어미 'る'를 제거하고 'ない' 결합`
              : selectedVerb.groupNumber === 3
              ? `불규칙 변화 (しない, こない)`
              : `어미의 [う단]을 [あ단]으로 바꾸고 'ない' 결합 (う->わ 주의!)`,
          example: `${selectedVerb.conjugations.naiForm}でください。 (${selectedVerb.koreanMeaning.split('(')[0]}하지 마세요.)`,
        };
      case 'te':
        return {
          title: '테형 음편 (~하고, ~해서)',
          conjugated: selectedVerb.conjugations.teForm,
          rule:
            selectedVerb.groupNumber === 2
              ? `어미 'る'를 떼고 바로 'て' 결합`
              : selectedVerb.groupNumber === 3
              ? `불규칙 변화 (して, きて)`
              : `${selectedVerb.subCategory || '5단 음편 규칙 적용'}`,
          example: `${selectedVerb.conjugations.teForm}ください。 (${selectedVerb.koreanMeaning.split('(')[0]}해 주세요.)`,
        };
      case 'ta':
        return {
          title: '과거형 (~했다)',
          conjugated: selectedVerb.conjugations.taForm,
          rule: `테형(て형)과 100% 동일한 음편 규칙으로 'て' 대신 'た' 결합`,
          example: `${selectedVerb.conjugations.taForm}ことがあります。 (${selectedVerb.koreanMeaning.split('(')[0]}한 적이 있습니다.)`,
        };
      case 'tai':
        return {
          title: '욕구/희망형 (~하고 싶다)',
          conjugated: selectedVerb.conjugations.taiForm,
          rule: `ます형의 어간(ます 앞부분)에 'たい' 결합`,
          example: `${selectedVerb.conjugations.taiForm}です。 (${selectedVerb.koreanMeaning.split('(')[0]}하고 싶습니다.)`,
        };
      case 'teMoIi':
        return {
          title: '허가 구하기 (~해도 됩니까?)',
          conjugated: `${selectedVerb.conjugations.teForm}もいいですか`,
          rule: `테형(て) + もいいですか`,
          example: `${selectedVerb.conjugations.teForm}もいいですか？ (${selectedVerb.koreanMeaning.split('(')[0]}해도 될까요?)`,
        };
      default:
        return {
          title: '기본형',
          conjugated: selectedVerb.dictionary,
          rule: '사전형',
          example: selectedVerb.dictionary,
        };
    }
  };

  // Adjective forms generator
  const getAdjResult = (form: string) => {
    const isI = selectedAdj.type === 'i-adjective';
    switch (form) {
      case 'polite':
        return {
          title: '정중형 (~입니다)',
          conjugated: selectedAdj.conjugations.presentPolite,
          rule: isI ? `기본형 뒤에そのまま 'です' 결합` : `어미 'だ' 탈락 후 'です' 결합`,
          example: `${selectedAdj.conjugations.presentPolite}。`,
        };
      case 'negative':
        return {
          title: '정중 부정형 (~지 않습니다)',
          conjugated: selectedAdj.conjugations.negativePolite,
          rule: isI ? `어미 'い' 떼고 -> 'くないです'` : `어미 'だ' 떼고 -> 'じゃないです'`,
          example: `${selectedAdj.conjugations.negativePolite}。`,
        };
      case 'past':
        return {
          title: '정중 과거형 (~었습니다)',
          conjugated: selectedAdj.conjugations.pastPolite,
          rule: isI ? `어미 'い' 떼고 -> 'かったです'` : `어미 'だ' 떼고 -> 'でした'`,
          example: `${selectedAdj.conjugations.pastPolite}。`,
        };
      case 'te':
        return {
          title: '연결형 (~하고, ~해서)',
          conjugated: selectedAdj.conjugations.teForm,
          rule: isI ? `어미 'い' 떼고 -> 'くて'` : `어미 'だ' 떼고 -> 'で'`,
          example: `${selectedAdj.conjugations.teForm}、いいですね。`,
        };
      case 'adverb':
        return {
          title: '부사형 (~하게, ~히)',
          conjugated: selectedAdj.conjugations.adverbForm,
          rule: isI ? `어미 'い' 떼고 -> 'く'` : `어미 'だ' 떼고 -> 'に'`,
          example: `${selectedAdj.conjugations.adverbForm}話してください。`,
        };
      case 'modifier':
        return {
          title: '명사 수식형 (~한 [명사])',
          conjugated: selectedAdj.conjugations.nounModifier,
          rule: isI ? `기본형 그대로 명사 연결` : `어미 'だ' 대신 'な' 결합 후 명사 수식`,
          example: `${selectedAdj.conjugations.nounModifier}。`,
        };
      default:
        return {
          title: '기본형',
          conjugated: selectedAdj.kanji,
          rule: '사전형',
          example: selectedAdj.kanji,
        };
    }
  };

  const verbResult = getVerbResult(selectedForm);
  const adjResult = getAdjResult(selectedForm);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title */}
      <div>
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 mb-2">
          <Sliders className="w-3.5 h-3.5 text-rose-500" />
          <span>실시간 변형 시뮬레이터 (Conjugation Machine)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          단어 선택 &amp; 어미 분해 시각화 계산기
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          원하는 동사나 형용사를 클릭하고 목표 형태를 누르면, 어간과 어미가 어떻게 변하는지 공식과 발음으로 즉각 보여줍니다.
        </p>
      </div>

      {/* Mode Switcher: Verb vs Adjective */}
      <div className="flex rounded-2xl bg-gray-100 p-1.5 max-w-md mx-auto">
        <button
          onClick={() => {
            setWordType('verb');
            setSelectedForm('te');
          }}
          className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            wordType === 'verb'
              ? 'bg-rose-500 text-white shadow-md shadow-rose-200'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          동사(動詞) 변형기
        </button>
        <button
          onClick={() => {
            setWordType('adjective');
            setSelectedForm('negative');
          }}
          className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            wordType === 'adjective'
              ? 'bg-amber-500 text-white shadow-md shadow-amber-200'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          형용사(形容詞) 변형기
        </button>
      </div>

      {/* Main Interactive Workstation */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-md p-6 sm:p-8 space-y-6">
        {/* Step 1: Word Selection Chips */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            1단계: 연습할 단어 선택하기
          </label>

          {wordType === 'verb' ? (
            <div className="flex flex-wrap gap-2">
              {VERBS_DATA.map((v) => {
                const isSelected = v.id === selectedVerbId;
                return (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVerbId(v.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-rose-500 text-white border-rose-600 shadow-xs'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <span>{v.dictionary}</span>
                    <span className={`ml-1 text-[10px] ${isSelected ? 'text-rose-100' : 'text-gray-400'}`}>
                      ({v.koreanMeaning.split('(')[0].trim()})
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {ADJECTIVES_DATA.map((a) => {
                const isSelected = a.id === selectedAdjId;
                return (
                  <button
                    key={a.id}
                    onClick={() => setSelectedAdjId(a.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <span>{a.kanji}</span>
                    <span className={`ml-1 text-[10px] ${isSelected ? 'text-amber-100' : 'text-gray-400'}`}>
                      ({a.koreanMeaning.split('(')[0].trim()})
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Step 2: Target Conjugation Selection */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            2단계: 변형시킬 목표 문형 선택하기
          </label>

          {wordType === 'verb' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {[
                { id: 'te', label: 'て형 (음편)' },
                { id: 'masu', label: 'ます형 (정중)' },
                { id: 'nai', label: 'ない형 (부정)' },
                { id: 'ta', label: 'た형 (과거)' },
                { id: 'tai', label: '~たい (희망)' },
                { id: 'teMoIi', label: '~てもいいですか (허가)' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setSelectedForm(btn.id)}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                    selectedForm === btn.id
                      ? 'bg-rose-50 text-rose-700 border-rose-300 ring-2 ring-rose-200'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {[
                { id: 'negative', label: '부정형 (~지 않다)' },
                { id: 'polite', label: '정중형 (~입니다)' },
                { id: 'past', label: '과거형 (~었습니다)' },
                { id: 'te', label: '연결형 (~하고/해서)' },
                { id: 'adverb', label: '부사형 (~하게/히)' },
                { id: 'modifier', label: '명사수식형' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setSelectedForm(btn.id)}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                    selectedForm === btn.id
                      ? 'bg-amber-50 text-amber-800 border-amber-300 ring-2 ring-amber-200'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Step 3: Interactive Visual Transformation Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: Original Root */}
            <div className="text-center md:text-left">
              <span className="text-[11px] font-bold uppercase text-gray-400 bg-gray-800 px-2 py-0.5 rounded">
                사전 기본형
              </span>
              <div className="text-3xl sm:text-4xl font-black mt-2 text-white">
                <FuriganaText
                  text={wordType === 'verb' ? selectedVerb.dictionary : selectedAdj.kanji}
                  reading={wordType === 'verb' ? selectedVerb.furigana : selectedAdj.furigana}
                  showFurigana={showFurigana}
                  rtClassName="text-rose-300 font-normal text-xs"
                />
              </div>
              {!showFurigana && (
                <div className="text-xs text-rose-300 font-mono mt-1">
                  {wordType === 'verb' ? selectedVerb.furigana : selectedAdj.furigana}
                </div>
              )}
              <div className="text-sm text-gray-300 mt-1">
                {wordType === 'verb' ? selectedVerb.koreanMeaning : selectedAdj.koreanMeaning}
              </div>
              <button
                onClick={() => handlePlayAudio(wordType === 'verb' ? selectedVerb.dictionary : selectedAdj.kanji)}
                className="mt-3 inline-flex items-center gap-1 text-xs text-rose-400 hover:text-white"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>원형 듣기</span>
              </button>
            </div>

            {/* Middle: Transformation Arrow */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-rose-400 border border-white/20">
                <ArrowRight className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-gray-400 mt-1">변형 공식 적용</span>
            </div>

            {/* Right: Conjugated Output */}
            <div className="text-center md:text-right">
              <span className="text-[11px] font-bold uppercase text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                {wordType === 'verb' ? verbResult.title : adjResult.title}
              </span>
              <div className="text-3xl sm:text-5xl font-black mt-2 text-amber-300">
                {wordType === 'verb' ? verbResult.conjugated : adjResult.conjugated}
              </div>
              <button
                onClick={() => handlePlayAudio(wordType === 'verb' ? verbResult.conjugated : adjResult.conjugated)}
                className="mt-3 inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-md shadow-rose-900/40"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>변형형 발음 듣기</span>
              </button>
            </div>
          </div>

          {/* Rule Breakdown Box */}
          <div className="mt-6 pt-5 border-t border-white/15 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
              <span className="text-rose-300 font-bold block mb-1">💡 적용된 문법 규칙:</span>
              <p className="text-gray-200 leading-relaxed">
                {wordType === 'verb' ? verbResult.rule : adjResult.rule}
              </p>
            </div>

            <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
              <span className="text-amber-300 font-bold block mb-1">🗣️ 실제 회화 문장:</span>
              <p className="text-gray-200 font-medium">
                {wordType === 'verb' ? verbResult.example : adjResult.example}
              </p>
              <button
                onClick={() => handlePlayAudio(wordType === 'verb' ? verbResult.example : adjResult.example)}
                className="mt-2 text-[11px] text-gray-400 hover:text-white flex items-center gap-1"
              >
                <Volume2 className="w-3 h-3" />
                <span>문장 전체 듣기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
