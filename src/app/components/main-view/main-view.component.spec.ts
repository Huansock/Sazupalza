import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainViewComponent } from './main-view.component';
import { By } from '@angular/platform-browser';
import { DateSplitInputComponent } from '../date-split-input/date-split-input.component';

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
