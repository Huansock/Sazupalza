import { TestBed } from '@angular/core/testing';
import { PartnerCheckInput, UserSazuInput } from '../models/sazu.model';
import { SazuService } from './sazu.service';
import { ViralCopyService } from './viral-copy.service';

describe('ViralCopyService', () => {
  let viralCopy: ViralCopyService;
  let sazu: SazuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    viralCopy = TestBed.inject(ViralCopyService);
    sazu = TestBed.inject(SazuService);
  });

  it('returns identical personal copy for the same input and local date', () => {
    const input: UserSazuInput = {
      name: 'Sophie',
      birthDate: '1995-10-24',
      birthTime: '14:15',
      gender: 'w',
      roastMode: 'savage',
    };
    const dayMaster = sazu.getDayMasterFromDate(input.birthDate);
    const aura = sazu.calculateAuraStar(input.birthDate);
    const date = new Date(2026, 8, 4, 22, 30);

    expect(viralCopy.buildPersonalCopy(input, dayMaster, aura, date)).toEqual(
      viralCopy.buildPersonalCopy(input, dayMaster, aura, date),
    );
  });

  it('rotates only daily personal evidence on the next local day', () => {
    const input: UserSazuInput = {
      name: 'Sophie',
      birthDate: '1995-10-24',
      birthTime: '14:15',
      gender: 'w',
      roastMode: 'honest',
    };
    const dayMaster = sazu.getDayMasterFromDate(input.birthDate);
    const aura = sazu.calculateAuraStar(input.birthDate);
    const today = viralCopy.buildPersonalCopy(input, dayMaster, aura, new Date(2026, 8, 4));
    const tomorrow = viralCopy.buildPersonalCopy(input, dayMaster, aura, new Date(2026, 8, 5));

    expect(tomorrow.stableId).toBe(today.stableId);
    expect(tomorrow.redFlag).toBe(today.redFlag);
    expect(tomorrow.claim).toBe(today.claim);
    expect(tomorrow.actualBehavior).toBe(today.actualBehavior);
    expect(tomorrow.dailyId).not.toBe(today.dailyId);
    expect(tomorrow.datingEvidence).not.toBe(today.datingEvidence);
    expect(tomorrow.groupChatEvidence).not.toBe(today.groupChatEvidence);
  });

  it('does not use a personal name in copy selection and defaults to honest', () => {
    const base: UserSazuInput = {
      name: 'Sophie',
      birthDate: '1995-10-24',
      gender: 'w',
    };
    const dayMaster = sazu.getDayMasterFromDate(base.birthDate);
    const aura = sazu.calculateAuraStar(base.birthDate);
    const date = new Date(2026, 8, 4);
    const first = viralCopy.buildPersonalCopy(base, dayMaster, aura, date);
    const renamed = viralCopy.buildPersonalCopy({ ...base, name: 'Lea' }, dayMaster, aura, date);

    expect(first.roastMode).toBe('honest');
    expect(renamed).toEqual(first);
  });

  it('keeps partner copy selection invariant when people and names are swapped', () => {
    const firstInput: PartnerCheckInput = {
      person1Name: 'Lea',
      person1BirthDate: '1995-10-24',
      person2Name: 'Marie',
      person2BirthDate: '1994-07-20',
      context: 'crush',
      roastMode: 'savage',
    };
    const swappedInput: PartnerCheckInput = {
      person1Name: 'Andere Person',
      person1BirthDate: firstInput.person2BirthDate,
      person2Name: 'Noch jemand',
      person2BirthDate: firstInput.person1BirthDate,
      context: firstInput.context,
      roastMode: firstInput.roastMode,
    };
    const firstResult = sazu.calculateCompatibility(firstInput);
    const swappedResult = sazu.calculateCompatibility(swappedInput);
    const date = new Date(2026, 8, 4);
    const first = viralCopy.buildPartnerCopy(firstInput, firstResult, date);
    const swapped = viralCopy.buildPartnerCopy(swappedInput, swappedResult, date);

    expect(swapped.stableId).toBe(first.stableId);
    expect(swapped.dailyId).toBe(first.dailyId);
    expect(swapped.redFlag).toBe(first.redFlag);
    expect(swapped.groupChatEvidence).toBe(first.groupChatEvidence);
  });
});
