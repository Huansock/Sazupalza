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

  it('should calculate User Sazu and update signal state', () => {
    const result = service.calculateSazu({
      name: 'Angela',
      birthDate: '1954-07-17',
      gender: 'w',
    });

    expect(result.dayMaster).toBeDefined();
    expect(result.birthDateFormatted).toBe('17.07.1954');
    expect(service.userSazuResult()).toBe(result);
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

  it('should calculate Gunghap compatibility score and details', () => {
    // Gap + Gi combination test (Cheongan-Hap)
    const result = service.calculateCompatibility({
      person1Name: 'Lukas',
      person1BirthDate: '2024-01-01', // Gap day
      person2Name: 'Emma',
      person2BirthDate: '2024-01-06', // 5 days later: Gi day
    });

    expect(result.score).toBe(97);
    expect(result.badge).toContain('Traumpaar');
    expect(result.person1.dayMaster.id).toBe('GAP');
    expect(result.person2.dayMaster.id).toBe('GI');
    expect(service.partnerResult()).toBe(result);
  });
});
