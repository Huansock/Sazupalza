import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateSplitInputComponent } from './date-split-input.component';

describe('DateSplitInputComponent', () => {
  let component: DateSplitInputComponent;
  let fixture: ComponentFixture<DateSplitInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateSplitInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DateSplitInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should parse YYYY-MM-DD formatted date in writeValue', () => {
    component.writeValue('1990-05-18');
    expect(component.year()).toBe('1990');
    expect(component.month()).toBe('05');
    expect(component.day()).toBe('18');
  });

  it('should parse DD.MM.YYYY formatted date in writeValue', () => {
    component.writeValue('24.10.1995');
    expect(component.year()).toBe('1995');
    expect(component.month()).toBe('10');
    expect(component.day()).toBe('24');
  });

  it('should clear fields when null or empty is passed to writeValue', () => {
    component.writeValue('1990-05-18');
    component.writeValue('');
    expect(component.year()).toBe('');
    expect(component.month()).toBe('');
    expect(component.day()).toBe('');
  });

  it('should emit YYYY-MM-DD when valid day, month and year are entered', () => {
    let emitted = '';
    component.registerOnChange((val: string) => {
      emitted = val;
    });

    component.day.set('18');
    component.month.set('05');
    component.year.set('1990');

    // Trigger internal emit
    (component as any).emitChange();

    expect(emitted).toBe('1990-05-18');
  });

  it('should emit empty string if date is incomplete or invalid', () => {
    let emitted = 'initial';
    component.registerOnChange((val: string) => {
      emitted = val;
    });

    component.day.set('31');
    component.month.set('02'); // Feb 31 does not exist
    component.year.set('2024');

    (component as any).emitChange();

    expect(emitted).toBe('');
  });

  it('should auto advance focus when 2 digits are entered into day input', () => {
    const monthFocusSpy = vi.spyOn(component.monthInput()!.nativeElement, 'focus');

    const dayEl = component.dayInput()!.nativeElement;
    dayEl.value = '18';
    dayEl.dispatchEvent(new Event('input'));

    expect(component.day()).toBe('18');
    expect(monthFocusSpy).toHaveBeenCalled();
  });

  it('should auto advance focus when 2 digits are entered into month input', () => {
    const yearFocusSpy = vi.spyOn(component.yearInput()!.nativeElement, 'focus');

    const monthEl = component.monthInput()!.nativeElement;
    monthEl.value = '12';
    monthEl.dispatchEvent(new Event('input'));

    expect(component.month()).toBe('12');
    expect(yearFocusSpy).toHaveBeenCalled();
  });

  it('should handle paste with DD.MM.YYYY format', () => {
    let emitted = '';
    component.registerOnChange((val: string) => {
      emitted = val;
    });

    const clipboardEvent = {
      clipboardData: {
        getData: (type: string) => '18.05.1990',
      },
      preventDefault: vi.fn(),
    } as unknown as ClipboardEvent;

    component.onPaste(clipboardEvent);

    expect(component.day()).toBe('18');
    expect(component.month()).toBe('05');
    expect(component.year()).toBe('1990');
    expect(emitted).toBe('1990-05-18');
    expect(clipboardEvent.preventDefault).toHaveBeenCalled();
  });

  it('should handle paste with continuous 8 digits DDMMYYYY', () => {
    let emitted = '';
    component.registerOnChange((val: string) => {
      emitted = val;
    });

    const clipboardEvent = {
      clipboardData: {
        getData: (type: string) => '04092026',
      },
      preventDefault: vi.fn(),
    } as unknown as ClipboardEvent;

    component.onPaste(clipboardEvent);

    expect(component.day()).toBe('04');
    expect(component.month()).toBe('09');
    expect(component.year()).toBe('2026');
    expect(emitted).toBe('2026-09-04');
  });

  it('should move focus back on Backspace if current field is empty', () => {
    const dayFocusSpy = vi.spyOn(component.dayInput()!.nativeElement, 'focus');

    const monthEl = component.monthInput()!.nativeElement;
    monthEl.value = '';
    monthEl.selectionStart = 0;
    monthEl.selectionEnd = 0;

    const backspaceEvent = new KeyboardEvent('keydown', { key: 'Backspace' });
    Object.defineProperty(backspaceEvent, 'target', { value: monthEl });

    component.onKeyDown('month', backspaceEvent);

    expect(dayFocusSpy).toHaveBeenCalled();
  });
});
