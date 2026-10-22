export type VerbType = '1-dan' | '5-dan' | 'irregular' | 'exception-5-dan';
export type AdjectiveType = 'i-adjective' | 'na-adjective';

export interface ConjugationSentence {
  formType: string;
  formName: string;
  japanese: string;
  furigana: string;
  korean: string;
  conjugatedPart: string;
  situation?: string;
}

export interface PatternDrillSentence {
  id: string;
  rootWord: string;
  rootMeaning: string;
  conjugatedWord: string;
  japanese: string;
  furigana: string;
  korean: string;
  targetPart: string;
  situation: string;
}

export interface PatternDrillCategory {
  id: string;
  title: string;
  partOfSpeech: 'i-adj' | 'na-adj' | 'verb-masu' | 'verb-nai' | 'verb-te' | 'verb-ta' | 'verb-patterns';
  grammarRule: string;
  conjugationFormula: string;
  tutorPoint: string;
  sentences: PatternDrillSentence[];
}

export interface AdjectiveConjugation {
  presentAffirmative: string; // 美味しい / 綺麗だ
  presentPolite: string;      // 美味しいです / 綺麗です
  negativePlain: string;      // 美味しくない / 綺麗じゃない
  negativePolite: string;     // 美味しくないです (美味しくありません) / 綺麗じゃないです (綺麗ではありません)
  pastPlain: string;          // 美味しかった / 綺麗だった
  pastPolite: string;         // 美味しかったです / 綺麗でした
  pastNegativePlain: string;  // 美味しくなかった / 綺麗じゃなかった
  pastNegativePolite: string; // 美味しくなかったです / 綺麗じゃありませんでした
  teForm: string;             // 美味しくて / 綺麗で (연결, 이유)
  adverbForm: string;         // 美味しく / 綺麗に (~하게)
  nounModifier: string;       // 美味しい [명사] / 綺麗な [명사]
}

export interface AdjectiveItem {
  id: string;
  kanji: string;
  furigana: string;
  romaji: string;
  koreanMeaning: string;
  category: 'taste' | 'emotion' | 'state' | 'personality' | 'appearance' | 'weather_price';
  type: AdjectiveType;
  stem: string;
  conjugations: AdjectiveConjugation;
  conversationExample: {
    japanese: string;
    furigana: string;
    korean: string;
    tutorTip?: string;
  };
}

export interface VerbConjugation {
  masuForm: string;           // 食べます / 書きます (정중형)
  masuNegative: string;       // 食べません / 書きません
  masuPast: string;           // 食べました / 書きました
  masuPastNegative: string;   // 食べませんでした / 書きませんでした
  naiForm: string;            // 食べない / 書かない (반말 부정)
  teForm: string;             // 食べて / 書いて (연결, 부탁, 진행)
  taForm: string;             // 食べた / 書いた (과거)
  potentialForm?: string;     // 食べられる / 書ける (가능)
  volitionalForm?: string;    // 食べよう / 書こう (의지/권유)
  taiForm: string;            // 食べたい / 書きたい (~하고 싶다)
}

export interface VerbItem {
  id: string;
  dictionary: string;
  furigana: string;
  romaji: string;
  koreanMeaning: string;
  type: VerbType;
  groupNumber: 1 | 2 | 3; // 1: 5단, 2: 1단, 3: 변격
  subCategory?: string; // e.g. "う/つ/る (촉음편)", "む/ぶ/ぬ (비음편)", "く/ぐ (이음편)", "す"
  stem: string;
  conjugations: VerbConjugation;
  conversationPatterns: {
    teKudasai: string;        // ~てください (~해 주세요)
    teImasu: string;          // ~ています (~하고 있습니다)
    teMoIiDesuka: string;     // ~てもいいですか (~해도 됩니까)
    taKotoGaArimasu: string;  // ~たことがあります (~한 적이 있습니다)
    naiDeKudasai: string;     // ~ないでください (~하지 마세요)
  };
  conversationExample: {
    japanese: string;
    furigana: string;
    korean: string;
    tutorTip?: string;
  };
}

export interface LessonStage {
  id: string;
  stepNumber: number;
  timeRange: string; // e.g. "00:00 ~ 00:15 (15분)"
  durationMinutes: number;
  title: string;
  subtitle: string;
  keyGoals: string[];
  tutorGuide: string;
  studentChecklist: string[];
}

export interface DialogueLine {
  speaker: string;
  speakerRole: 'Tutor' | 'Student' | 'Clerk' | 'Customer' | 'FriendA' | 'FriendB';
  japanese: string;
  furigana: string;
  korean: string;
  keyGrammarFocus?: string;
}

export interface DialogueScenario {
  id: string;
  title: string;
  situation: string;
  locationTag: string;
  grammarFocus: string[];
  dialogue: DialogueLine[];
  speakingMission: string;
}

export interface QuizQuestion {
  id: string;
  category: 'adj-conjugation' | 'verb-group' | 'verb-te-form' | 'verb-pattern' | 'conversation-cloze';
  title: string;
  question: string;
  furiganaHint?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  speakingChallenge?: string;
}
