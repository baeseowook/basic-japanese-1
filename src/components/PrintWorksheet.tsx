import React, { useState } from 'react';
import { Printer, CheckSquare, FileText, Sparkles, BookOpen, User } from 'lucide-react';
import { ADJECTIVES_DATA } from '../data/adjectives';
import { VERBS_DATA } from '../data/verbs';

export const PrintWorksheet: React.FC = () => {
  const [worksheetMode, setWorksheetMode] = useState<'student' | 'teacher'>('student');

  const handlePrint = () => {
    window.print();
  };

  const sampleAdjectives = ADJECTIVES_DATA.slice(0, 10);
  const sampleVerbs = VERBS_DATA.slice(0, 12);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Control Banner (Hidden during print) */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Printer className="w-5 h-5 text-rose-500" />
            <span>1:1 개인 과외용 A4 인쇄 / PDF 출력 센터</span>
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            수업용 시험지나 복습 숙제로 바로 출력할 수 있도록 A4 규격에 맞추어 레이아웃되어 있습니다.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Mode Switcher */}
          <div className="flex rounded-xl bg-gray-100 p-1 text-xs font-semibold">
            <button
              onClick={() => setWorksheetMode('student')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                worksheetMode === 'student'
                  ? 'bg-white text-rose-600 shadow-xs font-bold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              학생용 빈칸 테스트지
            </button>
            <button
              onClick={() => setWorksheetMode('teacher')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                worksheetMode === 'teacher'
                  ? 'bg-rose-500 text-white shadow-xs font-bold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              선생님용 정답·지도안
            </button>
          </div>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-gray-900 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>인쇄 / PDF 저장</span>
          </button>
        </div>
      </div>

      {/* Printable Paper Canvas */}
      <div className="bg-white rounded-2xl border border-gray-300 shadow-lg p-8 sm:p-12 print:border-none print:shadow-none print:p-0 text-gray-900 font-sans">
        {/* Document Header */}
        <div className="border-b-2 border-gray-900 pb-4 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold tracking-wider text-rose-600 uppercase">
                2시간 완성 일본어 회화 집중 과외 학습지
              </span>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
                형용사·동사 핵심 활용 마스터 워크시트
              </h1>
            </div>
            <div className="border border-gray-400 rounded-lg p-2 text-xs text-right space-y-1">
              <div>수업 일자: 202____년 ___월 ___일</div>
              <div>학생 이름: ____________ (인)</div>
              <div>담당 교사: ____________ (인)</div>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-600 flex justify-between">
            <span>목표: 기본형을 보고 1초 만에 [부정/과거/테형]으로 변환하여 말하고 쓰기</span>
            <span className="font-bold text-rose-700">
              {worksheetMode === 'student' ? '【 학생용 실전 테스트 】' : '【 교사용 모범 정답 및 지도 가이드 】'}
            </span>
          </div>
        </div>

        {/* Section 1: 형용사 변형 표 */}
        <div className="mb-8">
          <h2 className="text-base font-black border-l-4 border-rose-500 pl-2.5 mb-3">
            제 1 부. 형용사 4대 활용 완성하기 (い형용사 &amp; な형용사)
          </h2>
          <p className="text-xs text-gray-600 mb-2">
            ※ 기본형을 보고 정중형(~입니다), 정중 부정형(~지 않습니다), 정중 과거형(~었습니다), 연결형(~하고/해서)을 적으세요.
          </p>

          <table className="w-full text-left text-xs border-collapse border border-gray-300">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="border border-gray-300 p-2">기본형 (의미)</th>
                <th className="border border-gray-300 p-2">품사 구분</th>
                <th className="border border-gray-300 p-2">정중형 (~입니다)</th>
                <th className="border border-gray-300 p-2">정중 부정 (~않습니다)</th>
                <th className="border border-gray-300 p-2">정중 과거 (~었습니다)</th>
                <th className="border border-gray-300 p-2">연결형 (~하고/해서)</th>
              </tr>
            </thead>
            <tbody>
              {sampleAdjectives.map((adj) => (
                <tr key={adj.id} className="border-b border-gray-200">
                  <td className="border border-gray-300 p-2 font-bold">
                    {adj.kanji} ({adj.koreanMeaning.split('(')[0]})
                  </td>
                  <td className="border border-gray-300 p-2 text-gray-500">
                    {adj.type === 'i-adjective' ? 'い형용사' : 'な형용사'}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {worksheetMode === 'teacher' ? (
                      <span className="text-rose-600 font-bold">{adj.conjugations.presentPolite}</span>
                    ) : (
                      <span className="text-gray-300 font-mono">________________</span>
                    )}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {worksheetMode === 'teacher' ? (
                      <span className="text-rose-600 font-bold">{adj.conjugations.negativePolite.split('/')[0]}</span>
                    ) : (
                      <span className="text-gray-300 font-mono">________________</span>
                    )}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {worksheetMode === 'teacher' ? (
                      <span className="text-rose-600 font-bold">{adj.conjugations.pastPolite}</span>
                    ) : (
                      <span className="text-gray-300 font-mono">________________</span>
                    )}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {worksheetMode === 'teacher' ? (
                      <span className="text-rose-600 font-bold">{adj.conjugations.teForm.split('(')[0]}</span>
                    ) : (
                      <span className="text-gray-300 font-mono">________________</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 2: 동사 4대 활용 & 테형 음편 */}
        <div className="mb-8">
          <h2 className="text-base font-black border-l-4 border-amber-500 pl-2.5 mb-3">
            제 2 부. 동사 그룹 판별 및 4대 활용표 완성하기 (테형 음편 필수)
          </h2>
          <p className="text-xs text-gray-600 mb-2">
            ※ 1단/5단/예외5단/불규칙 그룹을 구분하고, ます형, ない형, て형(음편), た형(과거), ~たい형(희망)을 적으세요.
          </p>

          <table className="w-full text-left text-xs border-collapse border border-gray-300">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="border border-gray-300 p-2">사전형 (의미)</th>
                <th className="border border-gray-300 p-2">그룹 구분</th>
                <th className="border border-gray-300 p-2">ます형 (정중)</th>
                <th className="border border-gray-300 p-2">ない형 (부정)</th>
                <th className="border border-gray-300 p-2">て형 (음편)</th>
                <th className="border border-gray-300 p-2">た형 (과거)</th>
                <th className="border border-gray-300 p-2">~たい형 (희망)</th>
              </tr>
            </thead>
            <tbody>
              {sampleVerbs.map((verb) => (
                <tr key={verb.id} className="border-b border-gray-200">
                  <td className="border border-gray-300 p-2 font-bold">
                    {verb.dictionary} ({verb.koreanMeaning.split('(')[0]})
                  </td>
                  <td className="border border-gray-300 p-2 text-gray-500">
                    {verb.type === 'exception-5-dan'
                      ? '★예외 5단'
                      : verb.groupNumber === 1
                      ? '1그룹 (5단)'
                      : verb.groupNumber === 2
                      ? '2그룹 (1단)'
                      : '3그룹 (불규칙)'}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {worksheetMode === 'teacher' ? (
                      <span className="text-rose-600 font-bold">{verb.conjugations.masuForm.split('(')[0]}</span>
                    ) : (
                      <span className="text-gray-300 font-mono">____________</span>
                    )}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {worksheetMode === 'teacher' ? (
                      <span className="text-rose-600 font-bold">{verb.conjugations.naiForm.split('(')[0]}</span>
                    ) : (
                      <span className="text-gray-300 font-mono">____________</span>
                    )}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {worksheetMode === 'teacher' ? (
                      <span className="text-rose-600 font-bold">{verb.conjugations.teForm.split('(')[0]}</span>
                    ) : (
                      <span className="text-gray-300 font-mono">____________</span>
                    )}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {worksheetMode === 'teacher' ? (
                      <span className="text-rose-600 font-bold">{verb.conjugations.taForm.split('(')[0]}</span>
                    ) : (
                      <span className="text-gray-300 font-mono">____________</span>
                    )}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {worksheetMode === 'teacher' ? (
                      <span className="text-rose-600 font-bold">{verb.conjugations.taiForm.split('(')[0]}</span>
                    ) : (
                      <span className="text-gray-300 font-mono">____________</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 3: 회화 완성 작문 과제 (품사별 대량 반복 영작 훈련) */}
        <div className="mb-8">
          <h2 className="text-base font-black border-l-4 border-blue-500 pl-2.5 mb-3">
            제 3 부. 품사별 활용 공식 대량 반복 연습 (Speaking &amp; Writing Drills)
          </h2>
          <p className="text-xs text-gray-600 mb-3">
            ※ 괄호 안의 제시어를 문맥에 맞게 정확히 활용하여 일본어 문장을 완성하세요. (선생님과 1초 구두 테스트 병행)
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
            <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
              <strong>1. [い형용사 부정]</strong> "이 카레는 전혀 맵지 않습니다."
              <div className="mt-1 font-mono text-gray-800">
                このカレーは全然【{' '}
                {worksheetMode === 'teacher' ? (
                  <span className="text-rose-600 font-bold">辛くないです</span>
                ) : (
                  '____________________'
                )}{' '}
                】。(辛い)
              </div>
            </div>

            <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
              <strong>2. [い형용사 과거]</strong> "어제는 날씨가 정말 좋았습니다."
              <div className="mt-1 font-mono text-gray-800">
                昨日は天気が本当に【{' '}
                {worksheetMode === 'teacher' ? (
                  <span className="text-rose-600 font-bold">よかったです</span>
                ) : (
                  '____________________'
                )}{' '}
                】。(いい ★불규칙 주의!)
              </div>
            </div>

            <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
              <strong>3. [い형용사 연결]</strong> "이 라멘은 국물이 따뜻하고 매우 맛있습니다."
              <div className="mt-1 font-mono text-gray-800">
                このラーメンはスープが【{' '}
                {worksheetMode === 'teacher' ? (
                  <span className="text-rose-600 font-bold">温かくて</span>
                ) : (
                  '____________________'
                )}{' '}
                】、美味しいです。(温かい)
              </div>
            </div>

            <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
              <strong>4. [い형용사 부사]</strong> "아침 일찍 출발하니까 일찍 잡시다."
              <div className="mt-1 font-mono text-gray-800">
                明日は朝【{' '}
                {worksheetMode === 'teacher' ? (
                  <span className="text-rose-600 font-bold">早く</span>
                ) : (
                  '____________________'
                )}{' '}
                】出発しますから、早く寝ましょう。(早い)
              </div>
            </div>

            <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
              <strong>5. [な형용사 부정]</strong> "방 청소를 안 해서 깨끗하지 않아요."
              <div className="mt-1 font-mono text-gray-800">
                掃除をしなかったので、部屋は【{' '}
                {worksheetMode === 'teacher' ? (
                  <span className="text-rose-600 font-bold">綺麗じゃないです</span>
                ) : (
                  '____________________'
                )}{' '}
                】。(綺麗だ)
              </div>
            </div>

            <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
              <strong>6. [な형용사 연결]</strong> "도서관은 조용하고 공부하기 좋습니다."
              <div className="mt-1 font-mono text-gray-800">
                図書館は【{' '}
                {worksheetMode === 'teacher' ? (
                  <span className="text-rose-600 font-bold">静かで</span>
                ) : (
                  '____________________'
                )}{' '}
                】、勉強しやすいです。(静かだ)
              </div>
            </div>

            <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
              <strong>7. [동사 ます형 정중]</strong> "오늘은 5시에 집에 돌아갑니다."
              <div className="mt-1 font-mono text-gray-800">
                今日は用事があるので5時に【{' '}
                {worksheetMode === 'teacher' ? (
                  <span className="text-rose-600 font-bold">帰ります</span>
                ) : (
                  '____________________'
                )}{' '}
                】。(帰る ★예외5단 주의!)
              </div>
            </div>

            <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
              <strong>8. [동사 て형 부탁]</strong> "죄송하지만, 역까지 가는 길을 알려주세요."
              <div className="mt-1 font-mono text-gray-800">
                すみません、駅までの道を【{' '}
                {worksheetMode === 'teacher' ? (
                  <span className="text-rose-600 font-bold">教えてください</span>
                ) : (
                  '____________________'
                )}{' '}
                】。(教える)
              </div>
            </div>

            <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
              <strong>9. [동사 て형 비음편]</strong> "감기약이니까 식후에 꼭 드세요."
              <div className="mt-1 font-mono text-gray-800">
                お薬ですから、食後に必ず【{' '}
                {worksheetMode === 'teacher' ? (
                  <span className="text-rose-600 font-bold">飲んでください</span>
                ) : (
                  '____________________'
                )}{' '}
                】。(飲む ★비음편 탁점)
              </div>
            </div>

            <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
              <strong>10. [동사 허가구하기]</strong> "여기서 사진을 한 장 찍어도 될까요?"
              <div className="mt-1 font-mono text-gray-800">
                ここで写真を一枚【{' '}
                {worksheetMode === 'teacher' ? (
                  <span className="text-rose-600 font-bold">撮ってもいいですか</span>
                ) : (
                  '____________________'
                )}{' '}
                】？(撮る)
              </div>
            </div>

            <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
              <strong>11. [동사 경험표현]</strong> "일본 온천에 들어가 본 적이 있습니까?"
              <div className="mt-1 font-mono text-gray-800">
                日本の温泉に【{' '}
                {worksheetMode === 'teacher' ? (
                  <span className="text-rose-600 font-bold">入ったことがありますか</span>
                ) : (
                  '____________________'
                )}{' '}
                】？(入る ★예외5단 주의!)
              </div>
            </div>

            <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
              <strong>12. [동사 금지당부]</strong> "위험하니까 복도에서 달리지 마세요!"
              <div className="mt-1 font-mono text-gray-800">
                危ないですから、廊下を【{' '}
                {worksheetMode === 'teacher' ? (
                  <span className="text-rose-600 font-bold">走らないでください</span>
                ) : (
                  '____________________'
                )}{' '}
                】！(走る ★예외5단 주의!)
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Homework & Teacher Evaluation Footer */}
        <div className="border-t-2 border-gray-900 pt-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong className="text-gray-900 block mb-1">📝 다음 시간까지 과외 숙제 (Homework):</strong>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>오늘 배운 예외 5단 동사 6개(帰る, 走る, 入る, 知る, 切る, しゃべる) 3회 쓰기</li>
                <li>식당/길찾기 롤플레잉 대본 소리 내어 5회 섀도잉 녹음 후 선생님께 카톡 전송</li>
                <li>좋아하는 일본 음식 3가지를 형용사 연결형(~くて/~で)으로 문장 만들어 오기</li>
              </ul>
            </div>
            <div className="border border-gray-300 p-3 rounded-lg">
              <strong className="text-gray-900 block mb-1">선생님 총평 및 성취도:</strong>
              <div className="text-gray-400 mt-2">
                [ ] 최우수 (원활한 발화) &nbsp; [ ] 우수 &nbsp; [ ] 보통 &nbsp; [ ] 추가 복습 필요
              </div>
              <div className="mt-3 text-gray-400">
                피드백: _________________________________________________
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
