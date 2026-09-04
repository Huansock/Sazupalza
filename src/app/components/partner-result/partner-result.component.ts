import { Component, input, output } from '@angular/core';
import { CompatibilityResult, DatingContext, RoastMode } from '../../models/sazu.model';

const CONTEXT_KICKER: Record<DatingContext, string> = {
  crush: 'CRUSH-RADAR',
  relationship: 'BEZIEHUNGS-TÜV',
  bestie: 'BESTIE-LOYALITÄTSTEST',
  ex: 'RÜCKFALL-RADAR',
};

@Component({
  selector: 'app-partner-result',
  styleUrl: '../viral-result.shared.css',
  template: `
    <section class="viral-result-card partner-viral-card" aria-labelledby="partner-verdict">
      <div class="viral-topline">
        <span>{{ kicker() }} • {{ stage() }}/4</span>
        <span class="roast-mode-badge">{{ modeLabel(result().roastMode) }}</span>
        <span class="viral-stamp" aria-hidden="true">궁합</span>
      </div>
      <div class="reveal-stage-dots" aria-label="Fortschritt der Enthüllung">
        @for (step of [1, 2, 3, 4]; track step) {
          <span [class.active]="stage() === step" [class.done]="stage() > step"></span>
        }
      </div>
      <div class="partner-viral-names">
        {{ result().person1.name }} <span>×</span> {{ result().person2.name }}
      </div>

      @if (stage() === 1) {
        <div class="stage-panel fade-in">
          <span class="stage-kicker">AKTE 01 • ERSTER VERDACHT</span>
          <div class="viral-score-lockup">
            <strong class="viral-score">{{ result().score }}%</strong>
            <span class="viral-score-label">MATCH</span>
          </div>
          <h2 id="partner-verdict" class="viral-title context-title">
            {{ result().viralCopy.contextHeadline }}
          </h2>
          <button type="button" class="stage-unlock-btn" (click)="advance.emit()">
            Die drei gefährlichen Zahlen zeigen
          </button>
        </div>
      } @else if (stage() === 2) {
        <div class="stage-panel fade-in">
          <span class="stage-kicker">AKTE 02 • CHEMIE-LABOR</span>
          <div class="viral-metrics" aria-label="Chemie-Zusammenfassung">
            <div>
              <strong>{{ result().flirtScore }}%</strong><span>Anziehung</span>
            </div>
            <div>
              <strong>{{ result().stabilityScore }}%</strong><span>Alltag</span>
            </div>
            <div>
              <strong>{{ result().toxicScore }}%</strong><span>Drama</span>
            </div>
          </div>
          <p class="partner-viral-verdict">{{ result().viralCopy.contextVerdict }}</p>
          <button type="button" class="stage-unlock-btn" (click)="advance.emit()">
            Unsere Red Flag entsperren
          </button>
        </div>
      } @else if (stage() === 3) {
        <div class="stage-panel fade-in">
          <span class="stage-kicker danger">AKTE 03 • WAS IHR SAGT VS. WAS IHR TUT</span>
          <div class="behavior-compare">
            <div>
              <span>WAS IHR BEHAUPTET</span>
              <p>{{ result().viralCopy.claim }}</p>
            </div>
            <div class="behavior-actual">
              <span>WAS IHR WIRKLICH TUT</span>
              <p>{{ result().viralCopy.actualBehavior }}</p>
            </div>
          </div>
          <p class="dating-evidence">{{ result().viralCopy.datingEvidence }}</p>
          <button type="button" class="stage-unlock-btn" (click)="advance.emit()">
            Gruppenchat-Beweis öffnen
          </button>
        </div>
      } @else {
        <div class="stage-panel fade-in">
          <span class="stage-kicker">AKTE 04 • BEWEISSTÜCK AUS DEM GRUPPENCHAT</span>
          <blockquote class="stage-chat">{{ result().viralCopy.groupChatEvidence }}</blockquote>
          <div class="viral-red-flag compact-flag">
            <span>{{ result().viralCopy.redFlagLabel }}</span>
            <p>{{ result().viralCopy.redFlag }}</p>
          </div>
          <p class="stage-footnote unlocked">Vollständiger Chemie-Report entsperrt ↓</p>
          <button type="button" class="viral-share-btn" (click)="share.emit()">
            Beweise es im Gruppenchat
          </button>
        </div>
      }
    </section>
  `,
})
export class PartnerResultComponent {
  readonly result = input.required<CompatibilityResult>();
  readonly stage = input.required<1 | 2 | 3 | 4>();
  readonly advance = output<void>();
  readonly share = output<void>();
  readonly reset = output<void>();
  readonly dismiss = output<void>();

  protected kicker(): string {
    return CONTEXT_KICKER[this.result().context ?? 'crush'];
  }

  protected modeLabel(mode: RoastMode): string {
    if (mode === 'soft') return 'SANFT';
    if (mode === 'savage') return 'KEINE GNADE';
    return 'EHRLICH';
  }
}
