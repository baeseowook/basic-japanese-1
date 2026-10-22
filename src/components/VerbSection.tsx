import React, { useState } from 'react';
import { VERBS_DATA } from '../data/verbs';
import { VerbItem, VerbType } from '../types';
import { getVerbExampleSentences } from '../utils/conjugationExamples';
import { FuriganaText } from './FuriganaText';
import {
  Layers,
  Sparkles,
  Search,
  AlertOctagon,
  Flame,
  CheckCircle2,
  MessageCircle,
  HelpCircle,
  Zap,
} from 'lucide-react';

interface VerbSectionProps {
  showFurigana: boolean;
  speechRate?: number;
}

export const VerbSection: React.FC<VerbSectionProps> = ({ showFurigana }) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredVerbs = VERBS_DATA.filter((verb) => {
    const matchesGroup =
      selectedGroup === 'all' ||
      (selectedGroup === '1' && verb.groupNumber === 1 && verb.type !== 'exception-5-dan') ||
      (selectedGroup === '2' && verb.groupNumber === 2) ||
      (selectedGroup === '3' && verb.groupNumber === 3) ||
      (selectedGroup === 'exception' && verb.type === 'exception-5-dan');

    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      verb.dictionary.toLowerCase().includes(q) ||
      verb.furigana.toLowerCase().includes(q) ||
      verb.koreanMeaning.toLowerCase().includes(q) ||
      verb.romaji.toLowerCase().includes(q);

    return matchesGroup && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Title Header */}
      <div>
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 mb-2">
          <Zap className="w-3.5 h-3.5 text-rose-500" />
          <span>[2교시 &amp; 3교시 55분 집중] 동사 활용의 마의 장벽 극복</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          동사 3대 그룹 분류 &amp; 테형(て형) 음편 완벽 마스터
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          일본어 동사는 3가지 그룹으로 나뉘며, 테형(て형)과 타형(た형)을 정복하는 순간 일본어 회화 표현의 80%가 열립니다.
        </p>
      </div>

      {/* 3 Verb Groups Classification Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Group 3 */}
        <div className="bg-white rounded-2xl border-2 border-purple-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                3그룹 (불규칙 변격)
              </span>
              <span className="text-xs text-purple-600 font-bold">오직 2개뿐!</span>
            </div>
            <h3 className="text-lg font-black text-gray-900">する (하다) &amp; 来る (오다)</h3>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              규칙 없이 소리가 완전히 바뀝니다. 특히 来る는 형태에 따라 독음이 완전히 달라지므로 집중 암기합니다.
            </p>
            <div className="mt-3 space-y-1 text-xs bg-purple-50/50 p-2.5 rounded-xl border border-purple-100">
              <div>• する → します / して / しない / したい</div>
              <div>• 来る(くる) → <strong className="text-purple-700">来ます(きます)</strong> / <strong className="text-rose-600">来ない(こない)</strong></div>
            </div>
          </div>
        </div>

        {/* Group 2 */}
        <div className="bg-white rounded-2xl border-2 border-emerald-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                2그룹 (1단 동사)
              </span>
              <span className="text-xs text-emerald-600 font-bold">가장 쉬운 그룹</span>
            </div>
            <h3 className="text-lg font-black text-gray-900">어미 [る] 탈락 후 결합</h3>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              <strong>판별법:</strong> 마지막 글자가 <strong>「る」</strong>로 끝나면서, 바로 앞 글자의 모음이 <strong>[い단]</strong> 또는 <strong>[え단]</strong>!
            </p>
            <div className="mt-3 space-y-1 text-xs bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
              <div>• 食<span className="text-emerald-700 font-bold">べ</span>る (え단) → 食べます / 食べて / 食べない</div>
              <div>• <span className="text-emerald-700 font-bold">見</span>る (い단) → 見ます / 見て / 見ない</div>
            </div>
          </div>
        </div>

        {/* Group 1 */}
        <div className="bg-white rounded-2xl border-2 border-rose-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                1그룹 (5단 동사)
              </span>
              <span className="text-xs text-rose-600 font-bold">가장 많은 동사</span>
            </div>
            <h3 className="text-lg font-black text-gray-900">5단 모음 이동 &amp; 음편 현상</h3>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              <strong>판별법:</strong> 어미가 「る」가 아니거나, 「る」로 끝나도 앞 글자가 [あ・う・お단]인 나머지 모든 동사!
            </p>
            <div className="mt-3 space-y-1 text-xs bg-rose-50/50 p-2.5 rounded-xl border border-rose-100">
              <div>• 書く (쿠) → 書きます / 書いて / 書かない</div>
              <div>• 飲む (무) → 飲みます / 飲んで / 飲まない</div>
            </div>
          </div>
        </div>
      </div>

      {/* The Master Te-form Rhythm Chart (테형 음편 대백과) */}
      <div className="bg-gradient-to-br from-amber-500 via-rose-500 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-rose-200/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-white/20 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              <span>5단 동사 테형(て형) 음편 4대 리듬 공식</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              노래처럼 외우는 테형 음편 공식 (우·츠·루 → って / 무·부·누 → んで)
            </h3>
          </div>

          <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-xl border border-white/25 text-xs text-amber-100 max-w-xs">
            💡 타형(た형, 과거)도 테형과 100% 동일한 규칙으로「て → た」로만 바꾸면 됩니다!
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-gray-900">
          {/* 촉음편 */}
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <span className="text-[11px] font-bold uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
              촉음편 (促音便)
            </span>
            <div className="mt-2 text-xl font-black text-rose-600">
              う · つ · る → <span className="bg-rose-100 px-1 rounded">って</span>
            </div>
            <p className="text-xs text-gray-600 mt-1.5">
              작은 'っ'으로 뚝 끊기며 발음
            </p>
            <div className="mt-3 pt-2 border-t border-gray-100 text-xs space-y-1">
              <div>• 買う (사다) → <strong className="text-rose-600">買って</strong></div>
              <div>• 待つ (기다리다) → <strong className="text-rose-600">待って</strong></div>
              <div>• 撮る (찍다) → <strong className="text-rose-600">撮って</strong></div>
            </div>
          </div>

          {/* 비음편 */}
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <span className="text-[11px] font-bold uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              비음편 (撥音便)
            </span>
            <div className="mt-2 text-xl font-black text-blue-700">
              む · ぶ · ぬ → <span className="bg-blue-100 px-1 rounded">んで</span>
            </div>
            <p className="text-xs text-gray-600 mt-1.5">
              ★ 반드시 <strong>탁점(゛)</strong>이 붙음!
            </p>
            <div className="mt-3 pt-2 border-t border-gray-100 text-xs space-y-1">
              <div>• 飲む (마시다) → <strong className="text-blue-700">飲んで</strong></div>
              <div>• 遊ぶ (놀다) → <strong className="text-blue-700">遊んで</strong></div>
              <div>• 死ぬ (죽다) → <strong className="text-blue-700">死んで</strong></div>
            </div>
          </div>

          {/* 이음편 */}
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <span className="text-[11px] font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              이음편 (イ音便)
            </span>
            <div className="mt-2 text-xl font-black text-emerald-700">
              く → <span className="bg-emerald-100 px-1 rounded">いて</span> / ぐ → <span className="bg-emerald-100 px-1 rounded">いで</span>
            </div>
            <p className="text-xs text-gray-600 mt-1.5">
              'い'로 부드럽게 이어짐
            </p>
            <div className="mt-3 pt-2 border-t border-gray-100 text-xs space-y-1">
              <div>• 書く (쓰다) → <strong className="text-emerald-700">書いて</strong></div>
              <div>• 泳ぐ (수영하다) → <strong className="text-emerald-700">泳いで</strong></div>
              <div className="text-rose-600 font-bold">★ 行く → 行って (특수 예외)</div>
            </div>
          </div>

          {/* 사행 */}
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <span className="text-[11px] font-bold uppercase text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
              사행 (サ行)
            </span>
            <div className="mt-2 text-xl font-black text-purple-700">
              す → <span className="bg-purple-100 px-1 rounded">して</span>
            </div>
            <p className="text-xs text-gray-600 mt-1.5">
              그대로 'して'로 자연스럽게
            </p>
            <div className="mt-3 pt-2 border-t border-gray-100 text-xs space-y-1">
              <div>• 話す (말하다) → <strong className="text-purple-700">話して</strong></div>
              <div>• 出す (꺼내다) → <strong className="text-purple-700">出して</strong></div>
              <div>• 直す (고치다) → <strong className="text-purple-700">直して</strong></div>
            </div>
          </div>
        </div>
      </div>

      {/* Exception 5-dan Verbs Alert (예외 5단 6대장) */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-amber-500 text-white rounded-xl shrink-0 mt-0.5">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h4 className="text-base sm:text-lg font-black text-amber-950">
              ★ 과외 필수 지도: 형태는 1단처럼 생겼지만 5단 동사인 「예외 5단 6대장」!
            </h4>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              어미가 る로 끝나고 앞 모음이 い단/え단이어서 1단 동사 같지만, 실제로는 <strong>5단 동사의 촉음편(って)과 ます형(ります)</strong>으로 활용합니다.
              회화 시험과 실전 대화에서 가장 많이 틀리는 핵심 함정입니다.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-amber-200 text-center">
                <span className="font-bold text-gray-900 block text-sm">帰る (かえる)</span>
                <span className="text-amber-800 text-[11px]">돌아가다</span>
                <span className="text-rose-600 font-bold block text-[10px] mt-1">帰ります / 帰って</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-amber-200 text-center">
                <span className="font-bold text-gray-900 block text-sm">走る (はしる)</span>
                <span className="text-amber-800 text-[11px]">달리다</span>
                <span className="text-rose-600 font-bold block text-[10px] mt-1">走ります / 走って</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-amber-200 text-center">
                <span className="font-bold text-gray-900 block text-sm">入る (はいる)</span>
                <span className="text-amber-800 text-[11px]">들어가다</span>
                <span className="text-rose-600 font-bold block text-[10px] mt-1">入ります / 入って</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-amber-200 text-center">
                <span className="font-bold text-gray-900 block text-sm">知る (しる)</span>
                <span className="text-amber-800 text-[11px]">알다</span>
                <span className="text-rose-600 font-bold block text-[10px] mt-1">知ります / 知って</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-amber-200 text-center">
                <span className="font-bold text-gray-900 block text-sm">切る (きる)</span>
                <span className="text-amber-800 text-[11px]">자르다</span>
                <span className="text-rose-600 font-bold block text-[10px] mt-1">切ります / 切って</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-amber-200 text-center">
                <span className="font-bold text-gray-900 block text-sm">しゃべる</span>
                <span className="text-amber-800 text-[11px]">수다떨다</span>
                <span className="text-rose-600 font-bold block text-[10px] mt-1">しゃべります / しゃべって</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Major Conversational Patterns Cheat Sheet */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs">
        <h4 className="text-base font-bold text-gray-900 flex items-center gap-2 mb-3">
          <MessageCircle className="w-4 h-4 text-rose-500" />
          <span>동사 변형으로 바로 만드는 5대 실전 회화 공식</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div className="bg-rose-50/50 p-3 rounded-xl border border-rose-100">
            <strong className="text-rose-700 block text-sm">1. ~てください</strong>
            <span className="text-gray-500 text-[10px]">て형 + ください</span>
            <p className="text-gray-800 font-medium mt-1">~해 주세요 (정중한 부탁)</p>
            <div className="text-[11px] text-gray-600 mt-2 font-mono">待ってください</div>
          </div>

          <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">
            <strong className="text-blue-700 block text-sm">2. ~ています</strong>
            <span className="text-gray-500 text-[10px]">て형 + います</span>
            <p className="text-gray-800 font-medium mt-1">~하고 있습니다 (진행/상태)</p>
            <div className="text-[11px] text-gray-600 mt-2 font-mono">飲んでいます</div>
          </div>

          <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
            <strong className="text-emerald-700 block text-sm">3. ~てもいいですか</strong>
            <span className="text-gray-500 text-[10px]">て형 + もいいですか</span>
            <p className="text-gray-800 font-medium mt-1">~해도 됩니까? (허가 구하기)</p>
            <div className="text-[11px] text-gray-600 mt-2 font-mono">写真を撮ってもいいですか</div>
          </div>

          <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-100">
            <strong className="text-amber-800 block text-sm">4. ~たことがあります</strong>
            <span className="text-gray-500 text-[10px]">た형 + ことがあります</span>
            <p className="text-gray-800 font-medium mt-1">~한 적이 있습니다 (경험)</p>
            <div className="text-[11px] text-gray-600 mt-2 font-mono">行ったことがあります</div>
          </div>

          <div className="bg-purple-50/50 p-3 rounded-xl border border-purple-100">
            <strong className="text-purple-700 block text-sm">5. ~ないでください</strong>
            <span className="text-gray-500 text-[10px]">ない형 + でください</span>
            <p className="text-gray-800 font-medium mt-1">~하지 마세요 (금지/주의)</p>
            <div className="text-[11px] text-gray-600 mt-2 font-mono">忘れないでください</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="동사 검색 (예: 먹다, 飲む, kaeru, 行く...)"
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-rose-500"
            />
          </div>

          {/* Group Filter */}
          <div className="flex items-center space-x-1 overflow-x-auto">
            <button
              onClick={() => setSelectedGroup('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedGroup === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              전체 그룹
            </button>
            <button
              onClick={() => setSelectedGroup('2')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedGroup === '2' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              2그룹 (1단)
            </button>
            <button
              onClick={() => setSelectedGroup('1')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedGroup === '1' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
              }`}
            >
              1그룹 (5단)
            </button>
            <button
              onClick={() => setSelectedGroup('3')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedGroup === '3' ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
              }`}
            >
              3그룹 (불규칙)
            </button>
            <button
              onClick={() => setSelectedGroup('exception')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedGroup === 'exception' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
              }`}
            >
              ★예외 5단
            </button>
          </div>
        </div>
      </div>

      {/* Verbs List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredVerbs.map((verb) => {
          const isException = verb.type === 'exception-5-dan';

          return (
            <div
              key={verb.id}
              className={`bg-white rounded-2xl border transition-all p-5 shadow-xs flex flex-col justify-between ${
                isException ? 'border-amber-300 ring-2 ring-amber-100' : 'border-gray-200 hover:border-rose-300'
              }`}
            >
              <div>
                {/* Header: Verb & Group Badge */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                          verb.groupNumber === 3
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : verb.groupNumber === 2
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : isException
                            ? 'bg-amber-100 text-amber-800 border border-amber-300 font-extrabold'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {isException ? '★예외 5단' : `${verb.groupNumber}그룹 동사`}
                      </span>
                      {verb.subCategory && (
                        <span className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                          {verb.subCategory}
                        </span>
                      )}
                    </div>

                    <div className="mt-1 flex items-baseline space-x-2">
                      <div className="text-2xl font-black text-gray-900">
                        <FuriganaText
                          text={verb.dictionary}
                          reading={verb.furigana}
                          showFurigana={showFurigana}
                          rtClassName="text-rose-600 font-normal text-xs"
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-700">({verb.koreanMeaning})</span>
                    </div>
                  </div>
                </div>

                {/* 5 Core Conjugations Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 text-xs">
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                    <span className="text-[10px] text-gray-400 block">ます형 (정중)</span>
                    <strong className="text-gray-900">{verb.conjugations.masuForm}</strong>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                    <span className="text-[10px] text-gray-400 block">ない형 (부정)</span>
                    <strong className="text-rose-600">{verb.conjugations.naiForm}</strong>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                    <span className="text-[10px] text-gray-400 block">て형 (음편)</span>
                    <strong className="text-amber-700">{verb.conjugations.teForm}</strong>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                    <span className="text-[10px] text-gray-400 block">た형 (과거)</span>
                    <strong className="text-blue-700">{verb.conjugations.taForm}</strong>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                    <span className="text-[10px] text-gray-400 block">~たい형 (희망)</span>
                    <strong className="text-emerald-700">{verb.conjugations.taiForm}</strong>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                    <span className="text-[10px] text-gray-400 block">가능형 (가능)</span>
                    <strong className="text-purple-700">{verb.conjugations.potentialForm || '-'}</strong>
                  </div>
                </div>

                {/* Key Conversational Patterns */}
                <div className="mt-3.5 bg-gray-50 rounded-xl p-3 border border-gray-100 text-xs space-y-1.5">
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    회화 패턴 적용
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                    <div className="text-gray-700">
                      <span className="text-rose-600 font-bold">• ~てください: </span>
                      {verb.conversationPatterns.teKudasai}
                    </div>
                    <div className="text-gray-700">
                      <span className="text-blue-600 font-bold">• ~ています: </span>
                      {verb.conversationPatterns.teImasu}
                    </div>
                    <div className="text-gray-700">
                      <span className="text-emerald-600 font-bold">• ~てもいいですか: </span>
                      {verb.conversationPatterns.teMoIiDesuka}
                    </div>
                    <div className="text-gray-700">
                      <span className="text-amber-700 font-bold">• ~たことがあります: </span>
                      {verb.conversationPatterns.taKotoGaArimasu}
                    </div>
                  </div>
                </div>

                {/* Multiple Practical Conversation Example Sentences */}
                <div className="mt-4 bg-rose-50/40 border border-rose-100 rounded-xl p-3.5 text-xs">
                  <div className="flex items-center justify-between text-[11px] font-bold text-rose-800 mb-2">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5 text-rose-600" />
                      <span>동사 활용 형태별 회화 예문 (반복 훈련)</span>
                    </span>
                    <span className="text-[10px] text-gray-500 font-normal">탭을 눌러 형태별 예문을 전환하세요</span>
                  </div>

                  <VerbCardExamples
                    verb={verb}
                    showFurigana={showFurigana}
                  />
                </div>
              </div>

              {/* Tutor Tip */}
              {verb.conversationExample.tutorTip && (
                <div className="mt-3 pt-2.5 border-t border-gray-100 text-[11px] text-amber-900 flex items-start gap-1.5">
                  <span className="font-bold text-amber-600 shrink-0">💡 과외 팁:</span>
                  <span className="leading-snug">{verb.conversationExample.tutorTip}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface VerbCardExamplesProps {
  verb: VerbItem;
  showFurigana: boolean;
  speechRate?: number;
}

const VerbCardExamples: React.FC<VerbCardExamplesProps> = ({ verb, showFurigana }) => {
  const sentences = getVerbExampleSentences(verb);
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
