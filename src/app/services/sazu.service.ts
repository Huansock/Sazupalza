import { Injectable, signal } from '@angular/core';
import {
  CompatibilityResult,
  DayMaster,
  DayMasterId,
  PartnerCheckInput,
  UserSazuInput,
  UserSazuResult,
} from '../models/sazu.model';
import { DAY_MASTERS, SPECIAL_COMPATIBILITY, STEM_KEYS } from '../data/sazu-data';

@Injectable({
  providedIn: 'root',
})
export class SazuService {
  // Signals for application state
  readonly activeTab = signal<'sazu' | 'partner'>('sazu');
  readonly userSazuResult = signal<UserSazuResult | null>(null);
  readonly partnerResult = signal<CompatibilityResult | null>(null);
  readonly isCalculating = signal<boolean>(false);
  readonly toastMessage = signal<string | null>(null);

  /**
   * Calculates the Day Master (천간 / 일간) from a Gregorian birthdate
   * using Julian Day Number (JDN) astronomical cycle.
   */
  getDayMasterFromDate(dateStr: string): DayMaster {
    const [yearStr, monthStr, dayStr] = dateStr.split('-');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);

    const jdn = this.calculateJulianDayNumber(year, month, day);
    // Korean Day Stem formula: (JDN + 9) % 10
    const stemIndex = (((jdn + 9) % 10) + 10) % 10;
    const stemKey = STEM_KEYS[stemIndex];

    return DAY_MASTERS[stemKey];
  }

  /**
   * Astronomical Julian Day Number calculation for Gregorian date
   */
  private calculateJulianDayNumber(year: number, month: number, day: number): number {
    const a = Math.floor((14 - month) / 12);
    const y = year + 4800 - a;
    const m = month + 12 * a - 3;
    return (
      day +
      Math.floor((153 * m + 2) / 5) +
      365 * y +
      Math.floor(y / 4) -
      Math.floor(y / 100) +
      Math.floor(y / 400) -
      32045
    );
  }

  /**
   * Optional: Calculates Asian double-hour branch (시지) info
   */
  getHourPillarInfo(timeStr?: string): { name: string; trait: string } | null {
    if (!timeStr) return null;
    const [hStr] = timeStr.split(':');
    const hour = parseInt(hStr, 10);

    if (hour === 23 || hour === 0) {
      return {
        name: 'Rattenstunde (23:00–01:00 / 자시)',
        trait: 'Geheimer Scharfsinn & blitzschnelle Auffassungsgabe',
      };
    } else if (hour >= 1 && hour < 3) {
      return {
        name: 'Büffelstunde (01:00–03:00 / 축시)',
        trait: 'Unbeirrbare Arbeitswut & eiserne Geduld',
      };
    } else if (hour >= 3 && hour < 5) {
      return {
        name: 'Tigerstunde (03:00–05:00 / 인시)',
        trait: 'Mut zum Risiko & unbezähmbarer Freiheitsdrang',
      };
    } else if (hour >= 5 && hour < 7) {
      return {
        name: 'Hasenstunde (05:00–07:00 / 묘시)',
        trait: 'Diplomatisches Feingefühl & ästhetische Seele',
      };
    } else if (hour >= 7 && hour < 9) {
      return {
        name: 'Drachenstunde (07:00–09:00 / 진시)',
        trait: 'Große Ambitionen & Drang nach Weitsicht',
      };
    } else if (hour >= 9 && hour < 11) {
      return {
        name: 'Schlangenstunde (09:00–11:00 / 사시)',
        trait: 'Scharfer Verstand & strategische Klugheit',
      };
    } else if (hour >= 11 && hour < 13) {
      return {
        name: 'Pferdestunde (11:00–13:00 / 오시)',
        trait: 'Voller Tatendrang, Lebensfreude & Spontaneität',
      };
    } else if (hour >= 13 && hour < 15) {
      return {
        name: 'Schafstunde (13:00–15:00 / 미시)',
        trait: 'Sanftmut, Sinn für Kunst & Herzenswärme',
      };
    } else if (hour >= 15 && hour < 17) {
      return {
        name: 'Affenstunde (15:00–17:00 / 신시)',
        trait: 'Schlagfertiger Humor & unerschöpfliche Neugier',
      };
    } else if (hour >= 17 && hour < 19) {
      return {
        name: 'Hahnstunde (17:00–19:00 / 유시)',
        trait: 'Deutsche Pünktlichkeit, Disziplin & Auge fürs Detail',
      };
    } else if (hour >= 19 && hour < 21) {
      return {
        name: 'Hundestunde (19:00–21:00 / 술시)',
        trait: 'Unbestechliche Treue & ausgeprägter Schutzinstinkt',
      };
    } else {
      return {
        name: 'Schweinstunde (21:00–23:00 / 해시)',
        trait: 'Gemütlichkeit, Großzügigkeit & echter Lebensgenuss',
      };
    }
  }

  /**
   * Computes user's Sazu Day Master result
   */
  calculateSazu(input: UserSazuInput): UserSazuResult {
    const dayMaster = this.getDayMasterFromDate(input.birthDate);

    // Format date in German style (DD.MM.YYYY)
    const [y, m, d] = input.birthDate.split('-');
    const birthDateFormatted = `${d}.${m}.${y}`;

    const result: UserSazuResult = {
      input,
      dayMaster,
      birthDateFormatted,
      calculatedAt: new Date(),
    };

    this.userSazuResult.set(result);
    return result;
  }

  /**
   * Computes compatibility between two persons based on their Day Masters
   */
  calculateCompatibility(input: PartnerCheckInput): CompatibilityResult {
    const dm1 = this.getDayMasterFromDate(input.person1BirthDate);
    const dm2 = this.getDayMasterFromDate(input.person2BirthDate);

    const key1 = `${dm1.id}_${dm2.id}`;
    const key2 = `${dm2.id}_${dm1.id}`;

    let compatData = SPECIAL_COMPATIBILITY[key1] || SPECIAL_COMPATIBILITY[key2];

    if (!compatData) {
      // Fallback generator based on Five Elements & Polarity
      compatData = this.generateDynamicCompatibility(dm1, dm2);
    }

    const result: CompatibilityResult = {
      person1: {
        name: input.person1Name.trim() || 'Person 1',
        dayMaster: dm1,
      },
      person2: {
        name: input.person2Name.trim() || 'Person 2',
        dayMaster: dm2,
      },
      score: compatData.score,
      badge: compatData.badge,
      relationshipType: compatData.relationshipType,
      verdict: compatData.verdict,
      description: compatData.description,
      dailyLifeTip: compatData.dailyLifeTip,
      conflictTrigger: compatData.conflictTrigger,
      greenFlag: compatData.greenFlag,
      redFlag: compatData.redFlag,
      context: input.context || 'crush',
    };

    this.partnerResult.set(result);
    return result;
  }

  /**
   * Generates dynamic compatibility when no special handcrafted pairing applies
   */
  private generateDynamicCompatibility(dm1: DayMaster, dm2: DayMaster) {
    if (dm1.element === dm2.element) {
      if (dm1.id === dm2.id) {
        return {
          score: 72,
          badge: 'Seelen-Zwillinge 🪞',
          relationshipType: 'Gleiches Element (Bi-Gyeon / 비견)',
          verdict:
            'Zwei gleiche Charaktere: Man versteht sich blind, streitet aber um denselben Thron!',
          description: `Ihr teilt exakt dieselbe ${dm1.element}-Energie. Das sorgt für grenzenloses Verständnis ohne große Erklärungen, birgt aber die Gefahr gegenseitiger Konkurrenz.`,
          dailyLifeTip:
            'Teilt euch Aufgabenbereiche strikt auf – zwei Chefs in einem Team führen unweigerlich zum Gewerkschaftsstreik.',
          conflictTrigger:
            'Wer von beiden das letzte Wort beim Restaurant- oder Urlaubsentscheid behält.',
          greenFlag: 'Versteht deinen Sinn für Humor und deine Eigenarten ohne lange Erklärungen.',
          redFlag:
            'Zwei Alphatiere im selben Revier: Beide wollen immer recht haben und hassen Kompromisse.',
        };
      } else {
        return {
          score: 78,
          badge: 'Yin-Yang-Geschwister ☯️',
          relationshipType: 'Elementare Geschwister (Geob-Jae / 겁재)',
          verdict:
            'Ähnlich gepolt, aber unterschiedlich temperiert. Starke Allianz mit gesunder Reibung!',
          description: `Einer von euch verkörpert ${dm1.polarity}, der andere ${dm2.polarity}. Die perfekte Ergänzung innerhalb desselben Elements ${dm1.element}.`,
          dailyLifeTip:
            'Nutzt eure unterschiedlichen Blickwinkel: Einer stürmt vor, der andere sichert den Rücken.',
          conflictTrigger: 'Ungleiche Verteilung der Redezeit bei gemeinsamen Abendessen.',
          greenFlag:
            'Einer fängt die Schwächen des anderen intuitiv ab – unzerbrechlicher Teamgeist.',
          redFlag:
            'Heimlicher Konkurrenzkampf darüber, wer von beiden im Freundeskreis besser ankommt.',
        };
      }
    }

    // Five Elements interaction rules
    const generates: Record<string, string> = {
      Holz: 'Feuer',
      Feuer: 'Erde',
      Erde: 'Metall',
      Metall: 'Wasser',
      Wasser: 'Holz',
    };

    const overcomes: Record<string, string> = {
      Holz: 'Erde',
      Erde: 'Wasser',
      Wasser: 'Feuer',
      Feuer: 'Metall',
      Metall: 'Holz',
    };

    if (generates[dm1.element] === dm2.element || generates[dm2.element] === dm1.element) {
      return {
        score: 87,
        badge: 'Fruchtbare Symbiose 🌱✨',
        relationshipType: 'Nährende Kraft (Sang-Saeng / 상생)',
        verdict: 'Einer beflügelt den anderen wie eine frische Brise das Segel!',
        description: `Das Element ${dm1.element} und ${dm2.element} stehen in einem natürlichen Zyklus des Gebens und Nehmens. Ihr inspiriert einander zu neuen Taten.`,
        dailyLifeTip:
          'Achtet darauf, dass das Geben und Nehmen im Gleichgewicht bleibt und niemand emotional überlastet wird.',
        conflictTrigger:
          'Wenn einer immer nur plant und der andere immer nur die Rechnungen zahlen soll.',
        greenFlag: 'Beflügelt deine Träume und schenkt dir neue emotionale Kraft und Inspiration.',
        redFlag: 'Emotionale Schieflage: Einer investiert spürbar mehr Energie als der andere.',
      };
    }

    if (overcomes[dm1.element] === dm2.element || overcomes[dm2.element] === dm1.element) {
      return {
        score: 64,
        badge: 'Spannungsbogen ⚡',
        relationshipType: 'Herausfordernde Dynamik (Sang-Geuk / 상극)',
        verdict: 'Spannungsgeladen wie ein Krimi am Sonntagabend. Reibung erzeugt Hitze!',
        description: `Zwischen ${dm1.element} und ${dm2.element} besteht natürliche Reibung. Das ist nicht zwingend schlecht: Wer Reibung aushält, wächst daran enorm!`,
        dailyLifeTip:
          'Nehmt Meinungsverschiedenheiten sportlich und nicht als persönlichen Angriff auf die Ehre.',
        conflictTrigger:
          'Spontane Planänderungen am Samstagvormittag ohne vorherigen schriftlichen Antrag.',
        greenFlag:
          'Extrem hohe körperliche und mentale Anziehung – bei euch wird es niemals langweilig.',
        redFlag: 'Konflikt-Kollision: Lautstarker Vorwurf prallt auf stures, wochenlanges Mauern.',
      };
    }

    return {
      score: 75,
      badge: 'Solide Partnerschaft 🤝',
      relationshipType: 'Pragmatische Harmonie',
      verdict: 'Harmonisch, verlässlich und unaufgeregt wie ein deutsches Qualitätsfahrrad.',
      description: `Ihr ergänzt euch durch unterschiedliche Talente und Lebensentwürfe. Keine explosive Hollywood-Romanze, sondern echtes Leben.`,
      dailyLifeTip:
        'Schafft gemeinsame Hobbys, um der Beziehungsroutine etwas Pfeffer zu verleihen.',
      conflictTrigger: 'Der ewige Streit darüber, wer den Müllbeutel in die Tonne bringt.',
      greenFlag:
        'Verlässlicher Ruhepol im hektischen Alltag ohne unnötige Dramen oder Psychospielchen.',
      redFlag: 'Gefahr von Routine und Bequemlichkeit, wenn niemand neue Date-Ideen einbringt.',
    };
  }

  /**
   * Share function supporting Web Share API or Clipboard fallback
   */
  async shareResult(title: string, text: string): Promise<boolean> {
    const shareUrl = window.location.href;
    const shareData = {
      title,
      text: `${text}\n\nFinde dein koreanisches Sazu auf: ${shareUrl}`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        this.showToast('Erfolgreich geteilt! 🎉');
        return true;
      } catch (err) {
        // Share was aborted or cancelled by user, fallback to clipboard
        if ((err as Error).name !== 'AbortError') {
          return this.copyToClipboard(shareData.text);
        }
        return false;
      }
    } else {
      return this.copyToClipboard(shareData.text);
    }
  }

  /**
   * Fallback clipboard copy
   */
  async copyToClipboard(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text);
      this.showToast('Ergebnis in die Zwischenablage kopiert! 📋');
      return true;
    } catch {
      this.showToast('Kopieren fehlgeschlagen.');
      return false;
    }
  }

  showToast(message: string): void {
    this.toastMessage.set(message);
    setTimeout(() => {
      if (this.toastMessage() === message) {
        this.toastMessage.set(null);
      }
    }, 3200);
  }

  resetSazu(): void {
    this.userSazuResult.set(null);
  }

  resetPartner(): void {
    this.partnerResult.set(null);
  }
}
