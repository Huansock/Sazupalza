import { Component, ElementRef, forwardRef, input, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date-split-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './date-split-input.component.html',
  styleUrl: './date-split-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateSplitInputComponent),
      multi: true,
    },
  ],
})
export class DateSplitInputComponent implements ControlValueAccessor {
  readonly id = input<string>('birth-date-split');
  readonly required = input<boolean>(false);
  readonly disabled = signal<boolean>(false);

  // Field values
  readonly day = signal<string>('');
  readonly month = signal<string>('');
  readonly year = signal<string>('');

  // Element references for focus management
  readonly dayInput = viewChild<ElementRef<HTMLInputElement>>('dayInputRef');
  readonly monthInput = viewChild<ElementRef<HTMLInputElement>>('monthInputRef');
  readonly yearInput = viewChild<ElementRef<HTMLInputElement>>('yearInputRef');

  // ControlValueAccessor callbacks
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  // --- ControlValueAccessor Implementation ---

  writeValue(value: string | null | undefined): void {
    if (!value) {
      this.day.set('');
      this.month.set('');
      this.year.set('');
      return;
    }

    // Expecting YYYY-MM-DD format
    const match = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (match) {
      this.year.set(match[1]);
      this.month.set(match[2].padStart(2, '0'));
      this.day.set(match[3].padStart(2, '0'));
    } else {
      // Fallback if another format is supplied
      const parts = value.split(/[-./]/);
      if (parts.length === 3) {
        if (parts[0].length === 4) {
          // YYYY-MM-DD
          this.year.set(parts[0]);
          this.month.set(parts[1].padStart(2, '0'));
          this.day.set(parts[2].padStart(2, '0'));
        } else if (parts[2].length === 4) {
          // DD.MM.YYYY
          this.day.set(parts[0].padStart(2, '0'));
          this.month.set(parts[1].padStart(2, '0'));
          this.year.set(parts[2]);
        }
      }
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  // --- Input handlers & Navigation ---

  onDayInput(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    const clean = inputEl.value.replace(/\D/g, '').slice(0, 2);
    this.day.set(clean);
    inputEl.value = clean;

    if (clean.length === 2) {
      this.monthInput()?.nativeElement.focus();
      this.monthInput()?.nativeElement.select();
    }
    this.emitChange();
  }

  onMonthInput(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    const clean = inputEl.value.replace(/\D/g, '').slice(0, 2);
    this.month.set(clean);
    inputEl.value = clean;

    if (clean.length === 2) {
      this.yearInput()?.nativeElement.focus();
      this.yearInput()?.nativeElement.select();
    }
    this.emitChange();
  }

  onYearInput(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    const clean = inputEl.value.replace(/\D/g, '').slice(0, 4);
    this.year.set(clean);
    inputEl.value = clean;

    this.emitChange();
  }

  onDayBlur(): void {
    const d = this.day();
    if (d.length === 1) {
      this.day.set(d.padStart(2, '0'));
      this.emitChange();
    }
    this.onTouched();
  }

  onMonthBlur(): void {
    const m = this.month();
    if (m.length === 1) {
      this.month.set(m.padStart(2, '0'));
      this.emitChange();
    }
    this.onTouched();
  }

  onYearBlur(): void {
    this.onTouched();
  }

  onKeyDown(field: 'day' | 'month' | 'year', event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;

    if (event.key === 'Backspace') {
      if (field === 'month' && target.selectionStart === 0 && target.selectionEnd === 0) {
        this.dayInput()?.nativeElement.focus();
      } else if (field === 'year' && target.selectionStart === 0 && target.selectionEnd === 0) {
        this.monthInput()?.nativeElement.focus();
      }
    } else if (event.key === 'ArrowRight') {
      if (
        field === 'day' &&
        target.selectionStart === target.value.length &&
        target.selectionEnd === target.value.length
      ) {
        this.monthInput()?.nativeElement.focus();
      } else if (
        field === 'month' &&
        target.selectionStart === target.value.length &&
        target.selectionEnd === target.value.length
      ) {
        this.yearInput()?.nativeElement.focus();
      }
    } else if (event.key === 'ArrowLeft') {
      if (field === 'year' && target.selectionStart === 0 && target.selectionEnd === 0) {
        this.monthInput()?.nativeElement.focus();
      } else if (field === 'month' && target.selectionStart === 0 && target.selectionEnd === 0) {
        this.dayInput()?.nativeElement.focus();
      }
    }
  }

  onPaste(event: ClipboardEvent): void {
    const text = event.clipboardData?.getData('text')?.trim();
    if (!text) return;

    // Check formats: DD.MM.YYYY, DD/MM/YYYY, YYYY-MM-DD, DDMMYYYY, YYYYMMDD
    let parsedD = '';
    let parsedM = '';
    let parsedY = '';

    // Match DD.MM.YYYY or DD/MM/YYYY or DD-MM-YYYY
    const dmyMatch = text.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/);
    // Match YYYY-MM-DD or YYYY.MM.DD
    const ymdMatch = text.match(/^(\d{4})[./-](\d{1,2})[./-](\d{1,2})$/);
    // Match continuous 8 digits
    const digitsMatch = text.match(/^(\d{8})$/);

    if (dmyMatch) {
      parsedD = dmyMatch[1].padStart(2, '0');
      parsedM = dmyMatch[2].padStart(2, '0');
      parsedY = dmyMatch[3];
    } else if (ymdMatch) {
      parsedY = ymdMatch[1];
      parsedM = ymdMatch[2].padStart(2, '0');
      parsedD = ymdMatch[3].padStart(2, '0');
    } else if (digitsMatch) {
      const raw = digitsMatch[1];
      if (raw.startsWith('19') || raw.startsWith('20')) {
        // YYYYMMDD
        parsedY = raw.slice(0, 4);
        parsedM = raw.slice(4, 6);
        parsedD = raw.slice(6, 8);
      } else {
        // DDMMYYYY
        parsedD = raw.slice(0, 2);
        parsedM = raw.slice(2, 4);
        parsedY = raw.slice(4, 8);
      }
    }

    if (parsedD && parsedM && parsedY) {
      event.preventDefault();
      this.day.set(parsedD);
      this.month.set(parsedM);
      this.year.set(parsedY);
      this.yearInput()?.nativeElement.focus();
      this.emitChange();
    }
  }

  // --- Internal validation & emission ---

  private emitChange(): void {
    const d = this.day().trim();
    const m = this.month().trim();
    const y = this.year().trim();

    if (!d && !m && !y) {
      this.onChange('');
      return;
    }

    if (d.length >= 1 && m.length >= 1 && y.length === 4) {
      const dayNum = parseInt(d, 10);
      const monthNum = parseInt(m, 10);
      const yearNum = parseInt(y, 10);

      if (
        yearNum >= 1900 &&
        yearNum <= 2100 &&
        monthNum >= 1 &&
        monthNum <= 12 &&
        dayNum >= 1 &&
        dayNum <= 31
      ) {
        // Check days in that specific month and year
        const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
        if (dayNum <= daysInMonth) {
          const formatted = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
          this.onChange(formatted);
          return;
        }
      }
    }

    // If incomplete or invalid, signal empty string so required validation flags it
    this.onChange('');
  }
}
