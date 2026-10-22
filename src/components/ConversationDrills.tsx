import React, { useState } from 'react';
import { DIALOGUE_SCENARIOS } from '../data/dialogues';
import { DialogueScenario, DialogueLine } from '../types';
import { playJapaneseAudio } from '../utils/speech';
import { FuriganaText } from './FuriganaText';
import { useTheme } from '../context/ThemeContext';
import {
  MessageSquare,
  Volume2,
  Sparkles,
  Users,
  Target,
  CheckCircle,
  Eye,
  EyeOff,
  Flame,
  HelpCircle,
  RotateCcw,
} from 'lucide-react';

interface ConversationDrillsProps {
  showFurigana: boolean;
  speechRate: number;
}

interface PingPongDrill {
  id: string;
  category: string;
  koreanPrompt: string;
  tutorHint: string;
  japaneseAnswer: string;
  furigana: string;
  keyRule: string;
}

const PING_PONG_DRILLS: PingPongDrill[] = [
  {
    id: 'pp-1',
    category: '형용사 정중 부정',
    koreanPrompt: '"이 라멘은 맵지 않습니다."',
    tutorHint: '辛い(からい)의 부정형',
    japaneseAnswer: 'このラーメンは辛くないです。',
    furigana: 'このラーメンはからくないです。',
    keyRule: '辛い (い형용사) -> 辛くないです',
  },
  {
    id: 'pp-2',
    category: '형용사 과거형',
    koreanPrompt: '"어제 날씨는 정말 좋았습니다."',
    tutorHint: 'いい(좋다)의 특수 과거형 よかった',
    japaneseAnswer: '昨日は天気が本当によかったです。',
    furigana: 'きのうはてんきがほんとうによかったです。',
    keyRule: 'いい -> よかったです (★いかった X)',
  },
  {
    id: 'pp-3',
    category: '형용사 연결형',
    koreanPrompt: '"이 가게는 싸고 맛있습니다."',
    tutorHint: '安い(싸다) + 美味しい(맛있다) 연결',
    japaneseAnswer: 'この店は安くて美味しいです。',
    furigana: 'このみせはやすくておいしいです。',
    keyRule: '安い -> 安くて (연결형)',
  },
  {
    id: 'pp-4',
    category: 'な형용사 부정형',
    koreanPrompt: '"저는 매운 음식을 좋아하지 않습니다."',
    tutorHint: '好きだ(な형용사) + 조사 が',
    japaneseAnswer: '私は辛い料理が好きじゃないです。',
    furigana: 'わたしはからいりょうりがすきじゃないです。',
    keyRule: '好きだ -> 好きじゃないです / 조사 が',
  },
  {
    id: 'pp-5',
    category: 'な형용사 과거형',
    koreanPrompt: '"교토의 단풍은 정말 예뻤습니다."',
    tutorHint: '綺麗だ(な형용사)의 과거',
    japaneseAnswer: '京都の紅葉は本当に綺麗でした。',
    furigana: 'きょうとのこうようはほんとうにきれいでした。',
    keyRule: '綺麗だ -> 綺麗でした (★綺麗かった X)',
  },
  {
    id: 'pp-6',
    category: '동사 て형 부탁',
    koreanPrompt: '"잠시만 기다려 주세요."',
    tutorHint: '待つ(まつ)의 5단 촉음편 (구어: ちょっと待ってください)',
    japaneseAnswer: '少々お待ちください。',
    furigana: 'しょうしょうおまちください。',
    keyRule: '待つ -> 待って (つ->って) / お+동사ます+ください',
  },
  {
    id: 'pp-7',
    category: '동사 て형 비음편',
    koreanPrompt: '"따뜻한 차를 마시고 푹 쉽시다."',
    tutorHint: '飲む(のむ)의 비음편 탁점',
    japaneseAnswer: '温かいお茶を飲んで、ゆっくり休みましょう。',
    furigana: 'あたたかいおちゃをのんで、ゆっくりやすみましょう。',
    keyRule: '飲む -> 飲んで (む->んで 탁점)',
  },
  {
    id: 'pp-8',
    category: '동사 특수 촉음편',
    koreanPrompt: '"어제 친구와 도쿄 타워에 갔습니다."',
    tutorHint: '行く(いく)의 특수 촉음편 과거',
    japaneseAnswer: '昨日友達と東京タワーへ行きました。',
    furigana: 'きのうともだちととうきょうタワーへいきました。',
    keyRule: '行く -> 行って / 行った (★いいて X)',
  },
  {
    id: 'pp-9',
    category: '★예외 5단 동사',
    koreanPrompt: '"오늘은 일찍 집에 돌아가고 싶습니다."',
    tutorHint: '帰る(かえる)의 5단 활용 + ~たい',
    japaneseAnswer: '今日は早く家に帰りたいです。',
    furigana: 'きょうははやくいえにかえりたいです。',
    keyRule: '帰る -> 帰りたい (★かえたい X)',
  },
  {
    id: 'pp-10',
    category: '허가 구하기 (~てもいい)',
    koreanPrompt: '"여기서 사진을 찍어도 될까요?"',
    tutorHint: '撮る(とる)의 촉음편 + ~てもいいですか',
    japaneseAnswer: 'ここで写真を撮ってもいいですか？',
    furigana: 'ここでしゃしんをとってもいいですか？',
    keyRule: '撮る -> 撮って -> 撮ってもいいですか',
  },
  {
    id: 'pp-11',
    category: '경험 묻기 (~たことがある)',
    koreanPrompt: '"일본 온천에 들어가 본 적이 있습니까?"',
    tutorHint: '入る(はいる, 예외 5단)의 과거형 + ことがありますか',
    japaneseAnswer: '日本の温泉に入ったことがありますか？',
    furigana: 'にほんのおんせんにはいったことがありますか？',
    keyRule: '入る -> 入った (★はいった)',
  },
  {
    id: 'pp-12',
    category: '금지/주의 (~ないでください)',
    koreanPrompt: '"소중한 여권을 잊지 마세요."',
    tutorHint: '忘れる(わすれる, 1단)의 부정 + でください',
    japaneseAnswer: '大切なパスポートを忘れないでください。',
    furigana: 'たいせつなパスポートをわすれないでください。',
    keyRule: '忘れる -> 忘れない -> 忘れないでください',
  },
];

export const ConversationDrills: React.FC<ConversationDrillsProps> = ({ showFurigana, speechRate }) => {
  const { theme, isTextbook, isKyoto, isDark } = useTheme();

  const [subTab, setSubTab] = useState<'drills' | 'roleplay'>('drills');
  const [drillIndex, setDrillIndex] = useState<number>(0);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('izakaya');
  const [myRole, setMyRole] = useState<'Student' | 'Tutor'>('Student');
  const [completedDrills, setCompletedDrills] = useState<Record<string, boolean>>({});

  const currentDrill = PING_PONG_DRILLS[drillIndex];
  const currentScenario = DIALOGUE_SCENARIOS.find((s) => s.id === selectedScenarioId) || DIALOGUE_SCENARIOS[0];

  const handlePlayAudio = (text: string) => {
    playJapaneseAudio(text, speechRate);
  };

  const markDrillCompleted = (id: string) => {
    setCompletedDrills((prev) => ({ ...prev, [id]: true }));
    if (drillIndex < PING_PONG_DRILLS.length - 1) {
      setDrillIndex(drillIndex + 1);
      setIsAnswerRevealed(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title */}
      <div>
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2 border">
          {isTextbook ? (
            <span className="hanko-stamp text-[9px] px-2 py-0.5">
              会話編
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-rose-700">
              <MessageSquare className="w-3.5 h-3.5 text-rose-500" />
              <span>[4교시 20분 집중] 1:1 과외 전용 실전 회화 훈련소</span>
            </span>
          )}
          <span className="text-[11px] text-gray-500">
            {isTextbook ? '場面別実戦会話' : '1:1 핑퐁 발화 트레이닝'}
          </span>
        </div>

        <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
          isTextbook ? 'font-serif-jp text-[#2A2421]' : isKyoto ? 'font-serif-jp text-[#1F2923]' : 'text-gray-900'
        }`}>
          말문이 1초 만에 터지는 핑퐁 드릴 &amp; 롤플레잉
        </h2>
        <p className={`text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          과외 선생님과 학생이 호흡을 맞추며 한국어 상황을 즉각 일본어 문장으로 발화하고, 실전 시나리오를 연기하듯 연습합니다.
        </p>
      </div>

      {/* Sub Tabs Switcher */}
      <div className={`flex rounded-2xl p-1.5 max-w-md mx-auto ${
        isDark ? 'bg-slate-800' : isTextbook ? 'bg-[#F2E8DC]' : 'bg-gray-100'
      }`}>
        <button
          onClick={() => setSubTab('drills')}
          className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            subTab === 'drills'
              ? isTextbook
                ? 'bg-[#C2410C] text-white shadow-xs font-serif-jp'
                : 'bg-rose-500 text-white shadow-md shadow-rose-200'
              : isDark ? 'text-gray-400' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          ⚡ 즉문즉답 핑퐁 드릴 (12제)
        </button>
        <button
          onClick={() => setSubTab('roleplay')}
          className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            subTab === 'roleplay'
              ? isTextbook
                ? 'bg-[#92400E] text-white shadow-xs font-serif-jp'
                : 'bg-amber-500 text-white shadow-md shadow-amber-200'
              : isDark ? 'text-gray-400' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          🎭 5대 상황별 롤플레이
        </button>
      </div>

      {/* Mode 1: Rapid-fire Ping-pong speaking drill */}
      {subTab === 'drills' && (
        <div className={`rounded-3xl border shadow-md p-6 sm:p-8 space-y-6 ${
          isTextbook
            ? 'bg-[#FFFDF9] border-[#EADBCC]'
            : isKyoto
            ? 'bg-[#FCFCF9] border-[#DEDDD6]'
            : isDark
            ? 'bg-[#181D26] border-slate-700/80 text-gray-100'
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                isTextbook
                  ? 'bg-[#FAF3E7] text-[#92400E] border-[#E2D5C3] font-serif-jp'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}>
                문항 {drillIndex + 1} / {PING_PONG_DRILLS.length}
              </span>
              <span className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                [{currentDrill.category}]
              </span>
            </div>

            <div className="text-xs text-gray-400">
              완료: {Object.keys(completedDrills).length} / {PING_PONG_DRILLS.length}
            </div>
          </div>

          {/* Prompt Box */}
          <div className="bg-gradient-to-br from-rose-50 to-amber-50 rounded-2xl p-6 border border-rose-100 text-center space-y-3">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">
              🗣️ 과외 선생님의 한국어 제시어 (1초 안에 일본어로 말하세요!)
            </span>
            <div className="text-xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {currentDrill.koreanPrompt}
            </div>
            <div className="text-xs text-gray-500">
              💡 힌트: {currentDrill.tutorHint}
            </div>
          </div>

          {/* Interactive Reveal Area */}
          <div className="space-y-4">
            {!isAnswerRevealed ? (
              <button
                onClick={() => {
                  setIsAnswerRevealed(true);
                  handlePlayAudio(currentDrill.japaneseAnswer);
                }}
                className="w-full py-4 rounded-2xl bg-gray-900 hover:bg-rose-600 text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center space-x-2 shadow-md"
              >
                <Eye className="w-5 h-5" />
                <span>정답 확인 및 일본어 발음 듣기</span>
              </button>
            ) : (
              <div className="bg-gray-900 rounded-2xl p-6 text-white space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-amber-300 font-bold bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                    모범 정답
                  </span>
                  <button
                    onClick={() => handlePlayAudio(currentDrill.japaneseAnswer)}
                    className="flex items-center space-x-1 text-xs text-rose-300 hover:text-white"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>다시 듣기</span>
                  </button>
                </div>

                <div className="text-2xl sm:text-3xl font-black text-amber-300">
                  <FuriganaText
                    text={currentDrill.japaneseAnswer}
                    reading={currentDrill.furigana}
                    showFurigana={showFurigana}
                    rtClassName="text-rose-400 text-xs font-normal"
                  />
                </div>

                <div className="pt-3 border-t border-white/10 text-xs text-gray-300">
                  <strong className="text-rose-400">문법 핵심 포인트:</strong> {currentDrill.keyRule}
                </div>

                {/* Tutor Assessment Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setIsAnswerRevealed(false)}
                    className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
                  >
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>정답 가리기</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => markDrillCompleted(currentDrill.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>성공! 다음 문제로</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Drill Question Number Pagination Dots */}
          <div className="flex items-center justify-center space-x-1.5 pt-4">
            {PING_PONG_DRILLS.map((d, idx) => {
              const isCurrent = idx === drillIndex;
              const isDone = completedDrills[d.id];
              return (
                <button
                  key={d.id}
                  onClick={() => {
                    setDrillIndex(idx);
                    setIsAnswerRevealed(false);
                  }}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-rose-500 text-white scale-110 shadow-xs'
                      : isDone
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Mode 2: Real-Life Roleplay Scenarios */}
      {subTab === 'roleplay' && (
        <div className="space-y-6">
          {/* Scenario Selector Chips */}
          <div className="flex flex-wrap gap-2">
            {DIALOGUE_SCENARIOS.map((sc) => (
              <button
                key={sc.id}
                onClick={() => setSelectedScenarioId(sc.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                  selectedScenarioId === sc.id
                    ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span>{sc.title}</span>
              </button>
            ))}
          </div>

          {/* Scenario Detail Card */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-md p-6 sm:p-8 space-y-6">
            {/* Situation Banner */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
                <span>📍 장소: {currentScenario.locationTag}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-gray-900">
                {currentScenario.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                {currentScenario.situation}
              </p>

              <div className="mt-3 pt-3 border-t border-amber-200/60 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-amber-900">🎯 스피킹 미션:</span>
                <span className="text-xs text-amber-800 font-medium">
                  {currentScenario.speakingMission}
                </span>
              </div>
            </div>

            {/* Roleplay Chat Stream */}
            <div className="space-y-4">
              {currentScenario.dialogue.map((line, idx) => {
                const isCustomer = line.speakerRole === 'Customer' || line.speakerRole === 'Student';
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all ${
                      isCustomer
                        ? 'bg-rose-50/40 border-rose-200 ml-0 sm:ml-6'
                        : 'bg-gray-50/80 border-gray-200 mr-0 sm:mr-6'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                            isCustomer
                              ? 'bg-rose-500 text-white'
                              : 'bg-gray-800 text-white'
                          }`}
                        >
                          {line.speaker}
                        </span>
                        {line.keyGrammarFocus && (
                          <span className="text-[11px] text-gray-500 font-medium">
                            [{line.keyGrammarFocus}]
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-base sm:text-lg font-bold text-gray-900">
                      <FuriganaText
                        text={line.japanese}
                        reading={line.furigana}
                        showFurigana={showFurigana}
                        rtClassName="text-rose-600 text-xs font-normal"
                      />
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {line.korean}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
