import { Injectable } from '@angular/core';
import {
  CompatibilityResult,
  DatingContext,
  DayMaster,
  PartnerCheckInput,
  PartnerViralCopy,
  PersonalViralCopy,
  RoastMode,
  SajuAuraStar,
  UserSazuInput,
} from '../models/sazu.model';
import {
  AURA_DATING_EVIDENCE,
  CONTEXT_ROASTS,
  DAY_MASTER_ROASTS,
  SHARE_CTA,
} from '../data/viral-copy-data';

@Injectable({ providedIn: 'root' })
export class ViralCopyService {
  normalizeMode(mode?: RoastMode): RoastMode {
    return mode === 'soft' || mode === 'savage' ? mode : 'honest';
  }

  buildPersonalCopy(
    input: UserSazuInput,
    dayMaster: DayMaster,
    auraStar: SajuAuraStar,
    now = new Date(),
  ): PersonalViralCopy {
    const roastMode = this.normalizeMode(input.roastMode);
    const profile = DAY_MASTER_ROASTS[dayMaster.id];
    const stableSeed = this.hash(
      [input.birthDate, input.birthTime || 'unknown', input.gender, dayMaster.id, auraStar.id].join(
        '|',
      ),
    );
    const stableIndex = stableSeed % 3;
    const dailyOffset = stableSeed % 7;
    const dailyIndex = (dailyOffset + this.localDayOrdinal(now)) % 7;
    const chatIndex = (stableSeed + this.localDayOrdinal(now)) % 3;

    return {
      roastMode,
      stableId: `personal:${dayMaster.id}:${roastMode}:${stableIndex}`,
      dailyId: `personal:${auraStar.id}:${roastMode}:${this.localDateKey(now)}:${dailyIndex}:${chatIndex}`,
      redFlag: profile.redFlags[roastMode][stableIndex],
      claim: profile.claims[stableIndex],
      actualBehavior: profile.actuals[stableIndex],
      datingEvidence: AURA_DATING_EVIDENCE[auraStar.id][roastMode][dailyIndex],
      groupChatEvidence: profile.groupChats[roastMode][chatIndex],
      shareCta: SHARE_CTA[roastMode][stableIndex],
    };
  }

  buildPartnerCopy(
    input: PartnerCheckInput,
    result: Omit<CompatibilityResult, 'roastMode' | 'viralCopy'>,
    now = new Date(),
  ): PartnerViralCopy {
    const roastMode = this.normalizeMode(input.roastMode);
    const context: DatingContext = input.context || 'crush';
    const profile = CONTEXT_ROASTS[context];
    const sortedBirthDates = [input.person1BirthDate, input.person2BirthDate].sort();
    const stableSeed = this.hash([...sortedBirthDates, context].join('|'));
    const stableIndex = stableSeed % 3;
    const dailyIndex = ((stableSeed % 7) + this.localDayOrdinal(now)) % 7;
    const groupChatIndex = (dailyIndex + 3) % 7;

    return {
      roastMode,
      stableId: `partner:${context}:${roastMode}:${stableIndex}`,
      dailyId: `partner:${context}:${roastMode}:${this.localDateKey(now)}:${dailyIndex}`,
      redFlag: profile.redFlags[roastMode][stableIndex],
      claim: profile.claims[roastMode],
      actualBehavior: profile.actuals[roastMode],
      datingEvidence: profile.receipts[roastMode][dailyIndex],
      groupChatEvidence: profile.receipts[roastMode][groupChatIndex],
      shareCta: SHARE_CTA[roastMode][stableIndex],
      contextHeadline: profile.headline,
      contextVerdict: this.contextVerdict(context, roastMode, result),
      redFlagLabel: profile.redFlagLabel,
      sharePrompt: profile.sharePrompt,
      shareAnswer: profile.shareAnswers[roastMode],
    };
  }

  private contextVerdict(
    context: DatingContext,
    mode: RoastMode,
    result: Pick<CompatibilityResult, 'flirtScore' | 'stabilityScore' | 'toxicScore'>,
  ): string {
    if (context === 'ex') {
      if (mode === 'soft')
        return 'Vertrautheit ist stark, aber eure alten Gründe verdienen ebenfalls Gehör.';
      if (mode === 'savage')
        return 'Das Universum sagt Lektion. Euer Chatverlauf plant bereits Staffel vier.';
      return result.toxicScore >= 60
        ? 'Das Universum sagt Lektion. Euer Chatverlauf sagt „eine letzte Nachricht“.'
        : 'Nicht komplett toxisch – aber Nostalgie ist noch kein Beziehungsgrund.';
    }
    if (context === 'bestie') {
      if (mode === 'soft')
        return 'Viel Loyalität, starke Insider und ein paar Erwartungen, die ausgesprochen werden sollten.';
      if (mode === 'savage')
        return 'Ihr verteidigt euch vor allen und eröffnet danach privat das Disziplinarverfahren.';
      return result.toxicScore >= 65
        ? 'Ihr verteidigt euch vor allen – und rottet euch danach privat komplett aus.'
        : 'Sprachnachrichten, Insiderwitze und erstaunlich wenig offener Rechnungen.';
    }
    if (context === 'relationship') {
      if (mode === 'soft')
        return 'Euer Alltag kann tragen, wenn Erwartungen rechtzeitig zu klaren Bitten werden.';
      if (mode === 'savage')
        return 'Große Liebe, kleine Chance auf einen friedlichen IKEA-Samstag.';
      return result.stabilityScore >= 70
        ? 'Der Alltag kann funktionieren. Vorausgesetzt, niemand sagt „Ist doch nicht so schlimm“.'
        : 'Große Gefühle, kleine Chance auf einen friedlichen IKEA-Besuch.';
    }
    if (mode === 'soft')
      return 'Da ist echtes Interesse – eine klare Einladung wäre hilfreicher als weitere Signale.';
    if (mode === 'savage')
      return 'Die Chemie schreit Date. Zwei Egos flüstern gleichzeitig „er oder sie zuerst“.';
    return result.flirtScore >= 70
      ? 'Die Chemie schreit Date. Die Kommunikation flüstert „mal schauen“.'
      : 'Mehr Interpretationsarbeit als echte Nachrichten – klassischer Crush-Sport.';
  }

  private hash(value: string): number {
    let hash = 0x811c9dc5;
    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 0x01000193);
    }
    return hash >>> 0;
  }

  private localDayOrdinal(date: Date): number {
    return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000);
  }

  private localDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
