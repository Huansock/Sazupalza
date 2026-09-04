import { Component, input, output } from '@angular/core';
import { RoastMode, UserSazuResult } from '../../models/sazu.model';

@Component({
  selector: 'app-personal-result',
  styleUrl: '../viral-result.shared.css',
  template: `
    <section class="viral-result-card personal-viral-card" aria-labelledby="personal-verdict">
      <div class="viral-topline">
        <span>ENTHÜLLUNG {{ stage() }} VON 4</span>
        <span class="roast-mode-badge">{{ modeLabel(result().roastMode) }}</span>
        <span class="viral-stamp" aria-hidden="true">판정</span>
      </div>
      <div class="reveal-stage-dots" aria-label="Fortschritt der Enthüllung">
        @for (step of [1, 2, 3, 4]; track step) {
          <span [class.active]="stage() === step" [class.done]="stage() > step"></span>
        }
      </div>

      @if (stage() === 1) {
        <div class="stage-panel fade-in">
          <span class="stage-kicker">AKTE 01 • IDENTITÄT</span>
          <div class="viral-score-lockup">
            <strong class="viral-score">{{ result().dayMaster.deluluScore }}%</strong>
            <span class="viral-score-label">DELULU</span>
          </div>
          <h2 id="personal-verdict" class="viral-title">
            {{ result().dayMaster.germanArchetype }}
          </h2>
          <button type="button" class="stage-unlock-btn" (click)="advance.emit()">
            Meine Red Flag entsperren
          </button>
        </div>
      } @else if (stage() === 2) {
        <div class="stage-panel fade-in">
          <span class="stage-kicker danger">AKTE 02 • DIE RED FLAG</span>
          <div class="viral-red-flag stage-feature">
            <span>VON DEINEN FREUNDINNEN BEREITS BESTÄTIGT</span>
            <p>{{ result().viralCopy.redFlag }}</p>
          </div>
          <button type="button" class="stage-unlock-btn" (click)="advance.emit()">
            Mein Dating-Muster enthüllen
          </button>
        </div>
      } @else if (stage() === 3) {
        <div class="stage-panel fade-in">
          <span class="stage-kicker">AKTE 03 • DATING-REALITÄTSCHECK</span>
          <div class="behavior-compare">
            <div>
              <span>WAS DU SAGST</span>
              <p>{{ result().viralCopy.claim }}</p>
            </div>
            <div class="behavior-actual">
              <span>WAS DU WIRKLICH TUST</span>
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
          <p class="stage-footnote unlocked">Vollständiger Report entsperrt ↓</p>
          <button type="button" class="viral-share-btn" (click)="share.emit()">
            Von meiner besten Freundin bestätigen lassen
          </button>
        </div>
      }
    </section>
  `,
})
export class PersonalResultComponent {
  readonly result = input.required<UserSazuResult>();
  readonly stage = input.required<1 | 2 | 3 | 4>();
  readonly advance = output<void>();
  readonly share = output<void>();
  readonly reset = output<void>();
  readonly dismiss = output<void>();

  protected modeLabel(mode: RoastMode): string {
    if (mode === 'soft') return 'SANFT';
    if (mode === 'savage') return 'KEINE GNADE';
    return 'EHRLICH';
  }
}
