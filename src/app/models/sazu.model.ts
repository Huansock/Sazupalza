export type DayMasterId =
  | 'GAP'
  | 'EUL'
  | 'BYEONG'
  | 'JEONG'
  | 'MU'
  | 'GI'
  | 'GYEONG'
  | 'SIN'
  | 'IM'
  | 'GYE';

export type FiveElement = 'Holz' | 'Feuer' | 'Erde' | 'Metall' | 'Wasser';
export type YinYang = 'Yang' | 'Yin';
export type DatingContext = 'crush' | 'relationship' | 'bestie' | 'ex';

export type AuraId = 'DOHWA' | 'YEOKMA' | 'HWAGAE';

export interface SajuAuraStar {
  id: AuraId;
  name: string;
  korean: string;
  hanja: string;
  emoji: string;
  title: string;
  headline: string;
  tagline: string;
  description: string;
  datingCallout: string;
}

export interface DayMaster {
  id: DayMasterId;
  index: number; // 0 to 9
  name: string;
  hanja: string;
  korean: string;
  element: FiveElement;
  polarity: YinYang;
  elementEmoji: string;
  symbol: string;
  title: string;
  tagline: string;
  description: string[];
  strengths: string[];
  weaknesses: string[];
  germanArchetype: string;
  luckyItem: string;
  luckyFood: string;
  careerHint: string;
  loveHint: string;
  quote: string;
  toxicTrait: string;
  deluluScore: number; // 0-100%
  whatsAppSignature: string;
  color: string;
  bgGradient: string;
}

export interface UserSazuInput {
  name: string;
  birthDate: string; // YYYY-MM-DD
  birthTime?: string; // HH:mm
  gender: 'm' | 'w' | 'd';
}

export interface UserSazuResult {
  input: UserSazuInput;
  dayMaster: DayMaster;
  auraStar: SajuAuraStar;
  birthDateFormatted: string;
  calculatedAt: Date;
}

export interface PartnerCheckInput {
  person1Name: string;
  person1BirthDate: string;
  person2Name: string;
  person2BirthDate: string;
  context?: DatingContext;
}

export interface CompatibilityResult {
  person1: {
    name: string;
    dayMaster: DayMaster;
  };
  person2: {
    name: string;
    dayMaster: DayMaster;
  };
  score: number;
  badge: string;
  relationshipType: string;
  verdict: string;
  description: string;
  dailyLifeTip: string;
  conflictTrigger: string;
  greenFlag: string;
  redFlag: string;
  flirtScore: number;
  stabilityScore: number;
  toxicScore: number;
  memeVerdict: string;
  context?: DatingContext;
}
