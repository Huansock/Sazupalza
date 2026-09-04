export type DayMasterId =
  'GAP' | 'EUL' | 'BYEONG' | 'JEONG' | 'MU' | 'GI' | 'GYEONG' | 'SIN' | 'IM' | 'GYE';

export type FiveElement = 'Holz' | 'Feuer' | 'Erde' | 'Metall' | 'Wasser';
export type YinYang = 'Yang' | 'Yin';
export type DatingContext = 'crush' | 'relationship' | 'bestie' | 'ex';
export type RoastMode = 'soft' | 'honest' | 'savage';

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

export interface CelebrityMatch {
  name: string;
  groupOrRole: string;
  badge: string;
  comment: string;
}

export interface DailySazuEnergy {
  dateFormatted: string;
  energyScore: number; // 0-100%
  vibeTitle: string;
  vibeSummary: string;
  dos: string[];
  donts: string[];
  luckyBooster: string;
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
  titleByGender?: Record<'w' | 'm' | 'd', string>;
  archetypeByGender?: Record<'w' | 'm' | 'd', string>;
  toxicTraitByGender?: Record<'w' | 'm' | 'd', string>;
  whatsAppSignatureByGender?: Record<'w' | 'm' | 'd', string>;
  celebrities?: CelebrityMatch[];
  color: string;
  bgGradient: string;
}

export interface UserSazuInput {
  name: string;
  birthDate: string; // YYYY-MM-DD
  birthTime?: string; // HH:mm
  gender: 'm' | 'w' | 'd';
  roastMode?: RoastMode;
}

export interface ViralCopyMetadata {
  roastMode: RoastMode;
  stableId: string;
  dailyId: string;
}

export interface PersonalViralCopy extends ViralCopyMetadata {
  redFlag: string;
  claim: string;
  actualBehavior: string;
  datingEvidence: string;
  groupChatEvidence: string;
  shareCta: string;
}

export interface UserSazuResult {
  input: UserSazuInput;
  dayMaster: DayMaster;
  auraStar: SajuAuraStar;
  celebrities: CelebrityMatch[];
  dailyEnergy: DailySazuEnergy;
  birthDateFormatted: string;
  calculatedAt: Date;
  roastMode: RoastMode;
  viralCopy: PersonalViralCopy;
}

export interface PartnerCheckInput {
  person1Name: string;
  person1BirthDate: string;
  person2Name: string;
  person2BirthDate: string;
  context?: DatingContext;
  roastMode?: RoastMode;
}

export interface PartnerViralCopy extends ViralCopyMetadata {
  redFlag: string;
  claim: string;
  actualBehavior: string;
  datingEvidence: string;
  groupChatEvidence: string;
  shareCta: string;
  contextHeadline: string;
  contextVerdict: string;
  redFlagLabel: string;
  sharePrompt: string;
  shareAnswer: string;
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
  roastMode: RoastMode;
  viralCopy: PartnerViralCopy;
}
