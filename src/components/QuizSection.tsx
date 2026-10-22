import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizzes';
import { playJapaneseAudio } from '../utils/speech';
import { CheckCircle2, XCircle, RotateCcw, Volume2, Award, ArrowRight, HelpCircle } from 'lucide-react';

interface QuizSectionProps {
  speechRate: number;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ speechRate }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];
  const totalCount = QUIZ_QUESTIONS.length;
  const isAnswered = selectedAnswers[currentQ.id] !== undefined;

  const handleSelectOption = (optIdx: number) => {
    if (isAnswered) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: optIdx }));
  };

  const calculateScore = () => {
    let correct = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setShowResult(false);
  };

  const score = calculateScore();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Title */}
      <div>
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 mb-2">
          <Award className="w-3.5 h-3.5 text-rose-500" />
          <span>[5교시 마무리 점검] 10문항 스피드 총정리 퀴즈</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          형용사 &amp; 동사 활용 핵심 진단 테스트
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          2시간 동안 학습한 규칙들을 실전 문제로 검증하고, 자신이 취약한 음편과 변형을 확인합니다.
        </p>
      </div>

      {!showResult ? (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-md p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              문제 {currentIdx + 1} / {totalCount}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              카테고리: {currentQ.title}
            </span>
          </div>

          {/* Question Text */}
          <div className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
            {currentQ.question}
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = selectedAnswers[currentQ.id] === optIdx;
              const isCorrect = currentQ.correctAnswer === optIdx;

              let btnStyle = 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold ring-2 ring-emerald-200';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-50 border-rose-400 text-rose-900 font-bold';
                } else {
                  btnStyle = 'bg-gray-50 border-gray-200 text-gray-400 opacity-60';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between text-sm sm:text-base ${btnStyle}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-full bg-white border flex items-center justify-center font-bold text-xs shrink-0">
                      {optIdx + 1}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswered && (
                    <div>
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-rose-600" />
                      ) : null}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box when Answered */}
          {isAnswered && (
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 text-xs sm:text-sm space-y-3 animate-in fade-in duration-200">
              <div className="font-bold text-gray-900 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-rose-500" />
                <span>선생님 해설 및 문법 포인트:</span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {currentQ.explanation}
              </p>

              {currentQ.speakingChallenge && (
                <div className="mt-3 pt-3 border-t border-gray-200/80 flex items-center justify-between">
                  <div className="text-rose-800 font-semibold text-xs">
                    📢 {currentQ.speakingChallenge}
                  </div>
                  <button
                    onClick={() => playJapaneseAudio(currentQ.speakingChallenge!.replace(/소리 내어 말해보세요: |"/g, ''), speechRate)}
                    className="text-rose-600 hover:text-rose-800 flex items-center gap-1 text-xs font-bold"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>발음 듣기</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button
              onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
              disabled={currentIdx === 0}
              className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none"
            >
              이전 문제
            </button>

            {currentIdx < totalCount - 1 ? (
              <button
                onClick={() => setCurrentIdx(currentIdx + 1)}
                disabled={!isAnswered}
                className="px-5 py-2.5 rounded-xl bg-gray-900 hover:bg-rose-600 text-white text-xs font-bold transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center space-x-1"
              >
                <span>다음 문제</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setShowResult(true)}
                disabled={!isAnswered}
                className="px-6 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition-all disabled:opacity-40 shadow-sm"
              >
                최종 결과 확인하기
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Final Score Card */
        <div className="bg-white rounded-3xl border border-gray-200 shadow-md p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-500 border border-rose-200 shadow-inner">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
              테스트 완료! 당신의 점수는?
            </h3>
            <div className="text-4xl sm:text-6xl font-black text-rose-600 tracking-tight">
              {score * 10}점
              <span className="text-lg text-gray-400 font-normal ml-2">/ 100점</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              총 {totalCount}문제 중 {score}문제를 맞히셨습니다.
            </p>
          </div>

          <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-5 max-w-md mx-auto text-xs text-rose-950 leading-relaxed text-left">
            <strong>💡 과외 선생님의 종합 피드백:</strong><br />
            {score >= 8 ? (
              '대단합니다! 형용사와 동사의 기본 활용 규칙을 완벽하게 체화하셨습니다. 이제 1:1 회화 롤플레잉에서 실제 원어민처럼 감정을 실어 말해보세요!'
            ) : score >= 6 ? (
              '좋은 성적입니다! 특히 예외 5단 동사(帰る, 走る)나 비음편(飲んで)의 탁점 표기 등 헷갈리기 쉬운 부분만 조금 더 복습하면 완벽해집니다.'
            ) : (
              '아직은 규칙이 낯설 수 있습니다. 상단의 [변형 계산기]와 [1:1 핑퐁 드릴]을 통해 소리 내어 반복 연습해보는 것을 추천합니다.'
            )}
          </div>

          <button
            onClick={handleReset}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-gray-900 hover:bg-rose-600 text-white font-bold text-sm transition-all shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
            <span>처음부터 다시 풀기</span>
          </button>
        </div>
      )}
    </div>
  );
};
