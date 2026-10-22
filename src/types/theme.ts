export type ThemeMode = 'textbook' | 'kyoto' | 'modern';

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  jpName: string;
  badge: string;
  description: string;
  containerBg: string;
  cardBg: string;
  cardBorder: string;
  primaryColor: string;
  accentBadge: string;
  fontClass: string;
  headerBg: string;
  footerBg: string;
  textColor: string;
  textMuted: string;
}

export const THEME_CONFIGS: Record<ThemeMode, ThemeConfig> = {
  textbook: {
    id: 'textbook',
    name: '클래식 교재·워크북',
    jpName: '教科書・問題集スタイル',
    badge: '추천 교재풍',
    description: '일본어 정규 교재(민나노/겐키) 감성의 미색 화지 배경, 주홍색 스탬프 직인, 괘선 노트 및 형광펜 포인트',
    containerBg: 'bg-[#FAF6EE]',
    cardBg: 'bg-[#FFFDF9]',
    cardBorder: 'border-[#E6DACB]',
    primaryColor: 'text-[#B91C1C]',
    accentBadge: 'bg-[#FEF2F2] text-[#B91C1C] border-[#FCA5A5]',
    fontClass: 'font-serif-jp',
    headerBg: 'bg-[#FFFDF9]/95 border-[#E6DACB]',
    footerBg: 'bg-[#FAF6EE] border-[#E6DACB]',
    textColor: 'text-[#2D2825]',
    textMuted: 'text-[#786F66]',
  },
  kyoto: {
    id: 'kyoto',
    name: '교토 에디토리얼',
    jpName: '京都エディトリアル',
    badge: '와비사비 말차풍',
    description: '단아한 말차(抹茶) 그린과 고요한 스톤 그레이 톤, 넓은 여백과 절제된 미니멀 일본 잡지 레이아웃',
    containerBg: 'bg-[#F4F4F0]',
    cardBg: 'bg-[#FCFCF9]',
    cardBorder: 'border-[#DEDDD6]',
    primaryColor: 'text-[#285238]',
    accentBadge: 'bg-[#EDF5F0] text-[#285238] border-[#B7D7C2]',
    fontClass: 'font-sans',
    headerBg: 'bg-[#FCFCF9]/95 border-[#DEDDD6]',
    footerBg: 'bg-[#F4F4F0] border-[#DEDDD6]',
    textColor: 'text-[#222B25]',
    textMuted: 'text-[#647269]',
  },
  modern: {
    id: 'modern',
    name: '모던 스터디 스튜디오',
    jpName: 'モダン・スタジオ',
    badge: '인터랙티브 SaaS',
    description: '선명하고 세련된 인디고·로즈 컬러 팔레트, 높은 대비감과 경쾌한 Ed-Tech 대시보드',
    containerBg: 'bg-slate-50',
    cardBg: 'bg-white',
    cardBorder: 'border-slate-200',
    primaryColor: 'text-indigo-600',
    accentBadge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    fontClass: 'font-gothic',
    headerBg: 'bg-white/95 border-slate-200',
    footerBg: 'bg-white border-slate-200',
    textColor: 'text-slate-900',
    textMuted: 'text-slate-500',
  },
};
