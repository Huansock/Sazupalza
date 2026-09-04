import { Component, input, output } from '@angular/core';
import { RoastMode } from '../../models/sazu.model';

@Component({
  selector: 'app-roast-mode-selector',
  template: `
    <div class="roast-mode-field">
      <div class="roast-mode-heading">
        <span class="field-label" [id]="labelId()">Wie ehrlich darf es werden?</span>
        <span>{{
          context() === 'personal'
            ? 'Du bestimmst die Schärfe, nicht das Ergebnis.'
            : 'Die Scores bleiben gleich. Nur die Beweise werden schärfer.'
        }}</span>
      </div>
      <div class="roast-mode-segmented" role="group" [attr.aria-labelledby]="labelId()">
        @for (option of options; track option.value) {
          <button
            type="button"
            [class.selected]="value() === option.value"
            [attr.aria-pressed]="value() === option.value"
            (click)="valueChange.emit(option.value)"
          >
            {{ option.label }}
          </button>
        }
      </div>
      <p class="roast-mode-description">{{ description() }}</p>
    </div>
  `,
  styleUrl: './roast-mode-selector.component.css',
})
export class RoastModeSelectorComponent {
  readonly value = input.required<RoastMode>();
  readonly context = input<'personal' | 'partner'>('personal');
  readonly valueChange = output<RoastMode>();
  protected readonly options: ReadonlyArray<{ value: RoastMode; label: string }> = [
    { value: 'soft', label: 'Sanft' },
    { value: 'honest', label: 'Ehrlich' },
    { value: 'savage', label: 'Keine Gnade' },
  ];

  protected labelId(): string {
    return `${this.context()}-roast-mode`;
  }

  protected description(): string {
    if (this.context() === 'partner') {
      if (this.value() === 'soft') return 'Liebevoll direkt – ohne den Gruppenchat zu sprengen.';
      if (this.value() === 'savage') return 'Read Receipts an. Ausreden aus. Ihr habt zugestimmt.';
      return 'Direkt, konkret und gruppenchattauglich.';
    }
    if (this.value() === 'soft') return 'Charmant direkt – noch absolut familientauglich.';
    if (this.value() === 'savage') return 'Konkrete Beweise. Keine Ausreden. Du hast zugestimmt.';
    return 'Direkt, spezifisch und unangenehm treffsicher.';
  }
}
