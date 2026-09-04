import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainViewComponent } from './main-view.component';
import { By } from '@angular/platform-browser';
import { DateSplitInputComponent } from '../date-split-input/date-split-input.component';
import { SazuService } from '../../services/sazu.service';

describe('MainViewComponent with DateSplitInput', () => {
  let component: MainViewComponent;
  let fixture: ComponentFixture<MainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create MainViewComponent and include app-date-split-input in active tab', () => {
    expect(component).toBeTruthy();
    const dateSplitDebugElements = fixture.debugElement.queryAll(
      By.directive(DateSplitInputComponent),
    );
    // Main sazu tab has 1 date input
    expect(dateSplitDebugElements.length).toBe(1);

    // Switch to partner tab
    component['sazuService'].activeTab.set('partner');
    fixture.detectChanges();
    const partnerDateSplitElements = fixture.debugElement.queryAll(
      By.directive(DateSplitInputComponent),
    );
    expect(partnerDateSplitElements.length).toBe(2);
  });

  it('should populate DateSplitInput fields when Sazu preset is loaded', async () => {
    component.loadSazuPreset('leader');
    fixture.detectChanges();
    await fixture.whenStable();

    const mainDateInputDebugEl = fixture.debugElement.query(By.directive(DateSplitInputComponent));
    const dateSplitComp = mainDateInputDebugEl.componentInstance as DateSplitInputComponent;

    // Leader preset birthDate is 1990-05-18
    expect(component['sazuForm']().birthDate).toBe('1990-05-18');
    expect(dateSplitComp.day()).toBe('18');
    expect(dateSplitComp.month()).toBe('05');
    expect(dateSplitComp.year()).toBe('1990');
  });

  it('should populate both partner DateSplitInput fields when Partner preset is loaded', async () => {
    component['sazuService'].activeTab.set('partner');
    component.loadPartnerPreset('dream');
    fixture.detectChanges();
    await fixture.whenStable();

    const dateSplitDebugElements = fixture.debugElement.queryAll(
      By.directive(DateSplitInputComponent),
    );
    const p1DateComp = dateSplitDebugElements[0].componentInstance as DateSplitInputComponent;
    const p2DateComp = dateSplitDebugElements[1].componentInstance as DateSplitInputComponent;

    // Dream preset: 1992-03-15 and 1994-07-20
    expect(component['partnerForm']().person1BirthDate).toBe('1992-03-15');
    expect(component['partnerForm']().person2BirthDate).toBe('1994-07-20');

    expect(p1DateComp.day()).toBe('15');
    expect(p1DateComp.month()).toBe('03');
    expect(p1DateComp.year()).toBe('1992');

    expect(p2DateComp.day()).toBe('20');
    expect(p2DateComp.month()).toBe('07');
    expect(p2DateComp.year()).toBe('1994');
  });

  it('should calculate Sazu when preset is submitted', async () => {
    component.loadSazuPreset('creative');
    fixture.detectChanges();
    await fixture.whenStable();

    component.submitSazu();
    fixture.detectChanges();

    expect(component['sazuFormError']()).toBeNull();
    const result = component['sazuService'].userSazuResult();
    expect(result).toBeTruthy();
    expect(result?.birthDateFormatted).toBe('24.10.1995');
  });
});

describe('MainViewComponent - Instagram Story Modal', () => {
  let component: MainViewComponent;
  let sazuService: SazuService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainViewComponent],
      providers: [SazuService],
    }).compileComponents();

    const fixture = TestBed.createComponent(MainViewComponent);
    component = fixture.componentInstance;
    sazuService = TestBed.inject(SazuService);
  });

  it('should initialize with story modal closed', () => {
    expect((component as any).storyModalType()).toBeNull();
    expect((component as any).showStoryModal()).toBe(false);
  });

  it('should open personal story modal when openStoryModal("personal") is called', () => {
    component.openStoryModal('personal');
    expect((component as any).storyModalType()).toBe('personal');
    expect((component as any).showStoryModal()).toBe(true);
  });

  it('should open partner story modal when openStoryModal("partner") is called', () => {
    component.openStoryModal('partner');
    expect((component as any).storyModalType()).toBe('partner');
    expect((component as any).showStoryModal()).toBe(true);
  });

  it('should close story modal when closeStoryModal() is called', () => {
    component.openStoryModal('personal');
    expect((component as any).showStoryModal()).toBe(true);

    component.closeStoryModal();
    expect((component as any).storyModalType()).toBeNull();
    expect((component as any).showStoryModal()).toBe(false);
  });

  it('should render Instagram story button in personal Saju view when result is present', async () => {
    sazuService.calculateSazu({
      name: 'Tester',
      birthDate: '1995-05-15',
      gender: 'm',
    });

    const fixture = TestBed.createComponent(MainViewComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const storyBtn = compiled.querySelector('#sazu-result .story-cta-btn');
    expect(storyBtn).toBeTruthy();
    expect(storyBtn?.textContent).toContain('Als Instagram Story teilen');
  });

  it('should render Heutige Tagesenergie card and K-Pop & Promi match card when Sazu is calculated', async () => {
    sazuService.calculateSazu({
      name: 'Sophie',
      birthDate: '1995-10-24',
      gender: 'w',
    });

    const fixture = TestBed.createComponent(MainViewComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;

    // Daily energy card checks
    const dailyEnergyCard = compiled.querySelector('.daily-energy-card');
    expect(dailyEnergyCard).toBeTruthy();
    expect(dailyEnergyCard?.querySelector('.daily-badge-text')?.textContent).toContain(
      'TÄGLICHER SAZU-VIBE',
    );
    expect(dailyEnergyCard?.querySelector('.score-label')?.textContent).toContain('ENERGIE');
    expect(dailyEnergyCard?.querySelector('.daily-dos-box')).toBeTruthy();
    expect(dailyEnergyCard?.querySelector('.daily-donts-box')).toBeTruthy();

    // Celebrity match card checks
    const celebCard = compiled.querySelector('.celebrity-card');
    expect(celebCard).toBeTruthy();
    expect(celebCard?.querySelector('.celeb-badge')?.textContent).toContain('K-POP & PROMI MATCH');
    const celebItems = celebCard?.querySelectorAll('.celeb-item');
    expect(celebItems?.length).toBeGreaterThanOrEqual(2);
  });

  it('should call downloadPersonalStoryCard when storyModalType is personal', async () => {
    sazuService.calculateSazu({
      name: 'Maximilian',
      birthDate: '1990-05-18',
      gender: 'm',
    });
    component.openStoryModal('personal');
    const spy = vi.spyOn(component, 'downloadPersonalStoryCard');
    await component.downloadStoryCard();
    expect(spy).toHaveBeenCalled();
  });

  it('should call downloadPartnerStoryCard when storyModalType is partner', async () => {
    sazuService.calculateCompatibility({
      person1Name: 'Alex',
      person1BirthDate: '1992-03-15',
      person2Name: 'Sam',
      person2BirthDate: '1994-07-20',
      context: 'crush',
    });
    component.openStoryModal('partner');
    const spy = vi.spyOn(component, 'downloadPartnerStoryCard');
    await component.downloadStoryCard();
    expect(spy).toHaveBeenCalled();
  });
});
