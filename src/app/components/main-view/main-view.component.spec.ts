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
    expect(fixture.nativeElement.textContent).toContain(
      'Dein Geburtstag kennt deine größte Red Flag.',
    );
    expect(fixture.nativeElement.textContent).toContain('Nichts gespeichert');
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
    expect(fixture.nativeElement.querySelector('.reveal-overlay')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.personal-viral-card')).toBeTruthy();

    (component as any).skipReveal();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.reveal-overlay')).toBeFalsy();
  });

  it('should restore the input form when browser history goes back from a result', () => {
    const inputState = window.history.state;
    component.loadSazuPreset('creative');
    component.submitSazu();
    fixture.detectChanges();

    expect((component as any).showSazuResult()).toBe(true);
    expect(fixture.nativeElement.querySelector('#sazu-result')).toBeTruthy();

    window.dispatchEvent(new PopStateEvent('popstate', { state: inputState }));
    fixture.detectChanges();

    expect((component as any).showSazuResult()).toBe(false);
    expect(fixture.nativeElement.querySelector('#sazu-result')).toBeFalsy();
    expect(fixture.nativeElement.querySelector('.sazu-input-form')).toBeTruthy();
    expect(component['sazuService'].userSazuResult()).toBeTruthy();
  });

  it('should step backward through reveal stages before returning to the form', () => {
    component.loadSazuPreset('creative');
    component.submitSazu();
    const stageOneState = window.history.state;
    (component as any).advancePersonalReveal();
    fixture.detectChanges();

    expect((component as any).personalRevealStage()).toBe(2);
    window.dispatchEvent(new PopStateEvent('popstate', { state: stageOneState }));
    fixture.detectChanges();

    expect((component as any).personalRevealStage()).toBe(1);
    expect(fixture.nativeElement.textContent).toContain('Meine Red Flag entsperren');
  });

  it('should preserve the current scroll position in the history entry before a result opens', () => {
    const originalScrollY = window.scrollY;
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 420 });
    const replaceSpy = vi.spyOn(window.history, 'replaceState');

    component.loadSazuPreset('creative');
    component.submitSazu();

    expect(replaceSpy.mock.calls.some(([state]) => state?.__sazuPalzaUi?.scrollY === 420)).toBe(
      true,
    );
    Object.defineProperty(window, 'scrollY', { configurable: true, value: originalScrollY });
  });

  it('should warn before unloading after the user has entered personal data', () => {
    (component as any).sazuForm.update((form: any) => ({ ...form, name: 'Sophie' }));
    (component as any).enableExitGuard();
    const event = new Event('beforeunload', { cancelable: true });

    window.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
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

  it('should close a bottom sheet when browser history returns to the previous UI state', () => {
    const fixture = TestBed.createComponent(MainViewComponent);
    const modalComponent = fixture.componentInstance;
    const pageState = window.history.state;
    modalComponent.openStoryModal('personal');
    fixture.detectChanges();

    expect((modalComponent as any).showStoryModal()).toBe(true);
    window.dispatchEvent(new PopStateEvent('popstate', { state: pageState }));
    fixture.detectChanges();

    expect((modalComponent as any).showStoryModal()).toBe(false);
  });

  it('should lock page scroll, support Escape, and restore focus after a bottom sheet closes', async () => {
    const fixture = TestBed.createComponent(MainViewComponent);
    const modalComponent = fixture.componentInstance as any;
    const trigger = document.createElement('button');
    trigger.textContent = 'Open culture';
    document.body.appendChild(trigger);
    trigger.focus();

    modalComponent.openCultureModal();
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve));

    expect(document.body.style.position).toBe('fixed');
    expect(document.activeElement?.hasAttribute('data-modal-initial-focus')).toBe(true);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', cancelable: true }));
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve));

    expect(modalComponent.showCultureModal()).toBe(false);
    expect(document.body.style.position).not.toBe('fixed');
    expect(document.activeElement).toBe(trigger);
    trigger.remove();
  });

  it('should render Instagram story button in personal Saju view when result is present', async () => {
    sazuService.calculateSazu({
      name: 'Tester',
      birthDate: '1995-05-15',
      gender: 'm',
    });

    const fixture = TestBed.createComponent(MainViewComponent);
    const resultComponent = fixture.componentInstance as any;
    resultComponent.personalRevealStage.set(4);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const storyBtn = compiled.querySelector('#sazu-result .story-cta-btn');
    expect(storyBtn).toBeTruthy();
    expect(storyBtn?.textContent).toContain('Meine Red Flag in der Story posten');
  });

  it('should render a viral summary card for a partner result', async () => {
    sazuService.calculateCompatibility({
      person1Name: 'Alex',
      person1BirthDate: '1992-03-15',
      person2Name: 'Sam',
      person2BirthDate: '1994-07-20',
      context: 'crush',
    });
    sazuService.activeTab.set('partner');

    const fixture = TestBed.createComponent(MainViewComponent);
    const resultComponent = fixture.componentInstance as any;
    resultComponent.partnerRevealStage.set(2);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.partner-viral-card')).toBeTruthy();
    expect(compiled.querySelector('.viral-metrics')?.textContent).toContain('Drama');
    expect(compiled.querySelector('.partner-viral-card')?.textContent).toContain(
      'Unsere Red Flag entsperren',
    );
  });

  it('should render Heutige Tagesenergie card and K-Pop & Promi match card when Sazu is calculated', async () => {
    sazuService.calculateSazu({
      name: 'Sophie',
      birthDate: '1995-10-24',
      gender: 'w',
    });

    const fixture = TestBed.createComponent(MainViewComponent);
    const resultComponent = fixture.componentInstance as any;
    resultComponent.personalRevealStage.set(4);
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

  it('should unlock the personal report one reveal stage at a time', () => {
    sazuService.calculateSazu({
      name: 'Sophie',
      birthDate: '1995-10-24',
      gender: 'w',
    });

    const fixture = TestBed.createComponent(MainViewComponent);
    const resultComponent = fixture.componentInstance as any;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.daily-energy-card')).toBeFalsy();
    expect(fixture.nativeElement.textContent).toContain('Meine Red Flag entsperren');

    resultComponent.advancePersonalReveal();
    resultComponent.advancePersonalReveal();
    resultComponent.advancePersonalReveal();
    fixture.detectChanges();

    expect(resultComponent.personalRevealStage()).toBe(4);
    expect(fixture.nativeElement.querySelector('.daily-energy-card')).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Vollständiger Report entsperrt');
  });

  it('should select context-specific partner copy and share-card variants', () => {
    sazuService.calculateCompatibility({
      person1Name: 'Alex',
      person1BirthDate: '1992-03-15',
      person2Name: 'Sam',
      person2BirthDate: '1994-07-20',
      context: 'ex',
    });
    sazuService.activeTab.set('partner');

    const fixture = TestBed.createComponent(MainViewComponent);
    const resultComponent = fixture.componentInstance as any;
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain(
      'Schicksalsverbindung oder Rückfallgefahr?',
    );
    resultComponent.openStoryModal('partner');
    resultComponent.setStoryVariant('drama');
    fixture.detectChanges();

    expect(resultComponent.storyVariant()).toBe('drama');
    expect(fixture.nativeElement.querySelector('.story-viral-score')?.textContent).toContain(
      'DRAMA',
    );
    expect(fixture.nativeElement.textContent).toContain('NOCH EINE RUNDE?');
  });
});
