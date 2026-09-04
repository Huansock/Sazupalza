import { TestBed } from '@angular/core/testing';
import { SazuService } from './sazu.service';

describe('SazuService', () => {
  let service: SazuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SazuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly calculate Day Master for known reference dates', () => {
    // 2024-01-01 is known 甲子 (Gap) day -> GAP
    const dm2024 = service.getDayMasterFromDate('2024-01-01');
    expect(dm2024.id).toBe('GAP');
    expect(dm2024.hanja).toBe('甲');
    expect(dm2024.element).toBe('Holz');
    expect(dm2024.polarity).toBe('Yang');

    // 2000-01-01 is known 戊午 (Mu) day -> MU
    const dm2000 = service.getDayMasterFromDate('2000-01-01');
    expect(dm2000.id).toBe('MU');
    expect(dm2000.hanja).toBe('戊');
    expect(dm2000.element).toBe('Erde');

    // 2026-09-03 is 庚 (Gyeong) day -> GYEONG
    const dmToday = service.getDayMasterFromDate('2026-09-03');
    expect(dmToday.id).toBe('GYEONG');
    expect(dmToday.hanja).toBe('庚');
    expect(dmToday.element).toBe('Metall');
  });

  it('should calculate User Sazu and update signal state including Aura Star', () => {
    const result = service.calculateSazu({
      name: 'Angela',
      birthDate: '1954-07-17',
      gender: 'w',
    });

    expect(result.dayMaster).toBeDefined();
    expect(result.auraStar).toBeDefined();
    expect(result.auraStar.name).toBeTruthy();
    expect(result.dayMaster.toxicTrait).toBeTruthy();
    expect(typeof result.dayMaster.deluluScore).toBe('number');
    expect(result.birthDateFormatted).toBe('17.07.1954');
    expect(service.userSazuResult()).toBe(result);
  });

  it('should default roast mode to honest without changing core calculations', () => {
    const base = {
      name: 'Lea',
      birthDate: '1995-10-24',
      birthTime: '14:15',
      gender: 'w' as const,
    };
    const defaultResult = service.calculateSazu(base);
    const softResult = service.calculateSazu({ ...base, roastMode: 'soft' });
    const savageResult = service.calculateSazu({ ...base, roastMode: 'savage' });

    expect(defaultResult.roastMode).toBe('honest');
    expect(defaultResult.input.roastMode).toBe('honest');
    expect(softResult.dayMaster.id).toBe(defaultResult.dayMaster.id);
    expect(savageResult.dayMaster.deluluScore).toBe(defaultResult.dayMaster.deluluScore);
    expect(softResult.dailyEnergy.energyScore).toBe(defaultResult.dailyEnergy.energyScore);
    expect(savageResult.viralCopy.redFlag).not.toBe(softResult.viralCopy.redFlag);
  });

  it('should correctly calculate Saju Aura Star (신살)', () => {
    // 2024-01-01 is 甲子 (Rat / 자 day) -> DOHWA
    const aura2024 = service.calculateAuraStar('2024-01-01');
    expect(aura2024.id).toBe('DOHWA');
    expect(aura2024.emoji).toBe('🌸');

    // 2024-01-02 is 乙丑 (Ox / 축 day) -> HWAGAE
    const auraOx = service.calculateAuraStar('2024-01-02');
    expect(auraOx.id).toBe('HWAGAE');
    expect(auraOx.emoji).toBe('🎨');

    // 2024-01-03 is 丙寅 (Tiger / 인 day) -> YEOKMA
    const auraTiger = service.calculateAuraStar('2024-01-03');
    expect(auraTiger.id).toBe('YEOKMA');
    expect(auraTiger.emoji).toBe('✈️');
  });

  it('should calculate Asian double-hour branch correctly', () => {
    const nightHour = service.getHourPillarInfo('23:30');
    expect(nightHour?.name).toContain('Rattenstunde');

    const morningHour = service.getHourPillarInfo('08:00');
    expect(morningHour?.name).toContain('Drachenstunde');

    const noonHour = service.getHourPillarInfo('12:15');
    expect(noonHour?.name).toContain('Pferdestunde');

    const noTime = service.getHourPillarInfo(undefined);
    expect(noTime).toBeNull();
  });

  it('should calculate Gunghap compatibility score, spicy metrics and meme verdict', () => {
    // Gap + Gi combination test (Cheongan-Hap)
    const result = service.calculateCompatibility({
      person1Name: 'Lukas',
      person1BirthDate: '2024-01-01', // Gap day
      person2Name: 'Emma',
      person2BirthDate: '2024-01-06', // 5 days later: Gi day
    });

    expect(result.score).toBe(97);
    expect(result.badge).toContain('Traumpaar');
    expect(result.flirtScore).toBe(88);
    expect(result.stabilityScore).toBe(98);
    expect(result.toxicScore).toBe(12);
    expect(result.memeVerdict).toContain('Freundin');
    expect(result.person1.dayMaster.id).toBe('GAP');
    expect(result.person2.dayMaster.id).toBe('GI');
    expect(service.partnerResult()).toBe(result);
  });

  it('should keep every compatibility score identical across roast modes', () => {
    const base = {
      person1Name: 'Lea',
      person1BirthDate: '2024-01-01',
      person2Name: 'Marie',
      person2BirthDate: '2024-01-06',
      context: 'relationship' as const,
    };
    const soft = service.calculateCompatibility({ ...base, roastMode: 'soft' });
    const honest = service.calculateCompatibility({ ...base, roastMode: 'honest' });
    const savage = service.calculateCompatibility({ ...base, roastMode: 'savage' });

    for (const result of [honest, savage]) {
      expect(result.score).toBe(soft.score);
      expect(result.flirtScore).toBe(soft.flirtScore);
      expect(result.stabilityScore).toBe(soft.stabilityScore);
      expect(result.toxicScore).toBe(soft.toxicScore);
    }
    expect(savage.viralCopy.actualBehavior).not.toBe(soft.viralCopy.actualBehavior);
  });

  it('should resolve gender-specific title, archetype, toxicTrait and whatsAppSignature', () => {
    // Test date: 2024-01-01 (GAP day)
    const femaleRes = service.calculateSazu({
      name: 'Sophie',
      birthDate: '2024-01-01',
      gender: 'w',
    });

    const maleRes = service.calculateSazu({
      name: 'Maximilian',
      birthDate: '2024-01-01',
      gender: 'm',
    });

    const diverseRes = service.calculateSazu({
      name: 'Alex',
      birthDate: '2024-01-01',
      gender: 'd',
    });

    // Female wording checks
    expect(femaleRes.dayMaster.title).toContain('Alpha-Planerin');
    expect(femaleRes.dayMaster.whatsAppSignature).toContain('Mädels');
    expect(femaleRes.dayMaster.germanArchetype).toContain('Mädelsgruppen-Anführerin');

    // Male wording checks
    expect(maleRes.dayMaster.title).toContain('Alpha-Macher');
    expect(maleRes.dayMaster.whatsAppSignature).toContain('Jungs');
    expect(maleRes.dayMaster.germanArchetype).toContain('Gruppen-Kapitän');

    // Diverse wording checks
    expect(diverseRes.dayMaster.title).toContain('strategische Leitfigur');
    expect(diverseRes.dayMaster.whatsAppSignature).toContain('geteilten Kalender');
    expect(diverseRes.dayMaster.germanArchetype).toContain('strategische Zirkel-Kopf');

    // Ensure all 3 signatures are completely different and tailored
    expect(femaleRes.dayMaster.whatsAppSignature).not.toBe(maleRes.dayMaster.whatsAppSignature);
    expect(maleRes.dayMaster.whatsAppSignature).not.toBe(diverseRes.dayMaster.whatsAppSignature);
    expect(femaleRes.dayMaster.title).not.toBe(maleRes.dayMaster.title);
  });

  it('should include matching K-Pop and Promi celebrities in Sazu result', () => {
    const result = service.calculateSazu({
      name: 'RM Fan',
      birthDate: '2024-01-01', // GAP (Yang-Holz)
      gender: 'm',
    });

    expect(result.celebrities).toBeDefined();
    expect(result.celebrities.length).toBeGreaterThanOrEqual(3);
    const names = result.celebrities.map((c) => c.name);
    expect(names).toContain('RM (Kim Namjoon)');
    expect(names).toContain('Jennie');

    // Check structure
    const firstCeleb = result.celebrities[0];
    expect(firstCeleb.badge).toBeTruthy();
    expect(firstCeleb.groupOrRole).toBeTruthy();
    expect(firstCeleb.comment).toBeTruthy();
  });

  it('should calculate Heutige Tagesenergie based on user day master', () => {
    const result = service.calculateSazu({
      name: 'Test Person',
      birthDate: '1995-10-24',
      gender: 'w',
    });

    expect(result.dailyEnergy).toBeDefined();
    expect(result.dailyEnergy.energyScore).toBeGreaterThanOrEqual(50);
    expect(result.dailyEnergy.energyScore).toBeLessThanOrEqual(100);
    expect(result.dailyEnergy.vibeTitle).toBeTruthy();
    expect(result.dailyEnergy.vibeSummary).toBeTruthy();
    expect(result.dailyEnergy.dos.length).toBeGreaterThanOrEqual(2);
    expect(result.dailyEnergy.donts.length).toBeGreaterThanOrEqual(2);
    expect(result.dailyEnergy.luckyBooster).toBeTruthy();
    expect(result.dailyEnergy.dateFormatted).toBeTruthy();
  });

  it('should calculate predictable element interactions for calculateDailyEnergy', () => {
    const gapMaster = service.getDayMasterFromDate('2024-01-01'); // GAP (Holz)

    // Reference target date: 2024-01-01 (GAP day -> Holz = Holz -> Spiegel-Tag)
    const spiegelEnergy = service.calculateDailyEnergy(gapMaster, new Date(2024, 0, 1));
    expect(spiegelEnergy.vibeTitle).toContain('Spiegel-Tag');

    // Reference target date: 2024-01-10 (GYE day -> Wasser generates Holz -> Auflade-Tag)
    const aufladeEnergy = service.calculateDailyEnergy(gapMaster, new Date(2024, 0, 10));
    expect(aufladeEnergy.vibeTitle).toContain('Auflade-Tag');
  });
});
