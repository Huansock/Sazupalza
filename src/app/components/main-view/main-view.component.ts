import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SazuService } from '../../services/sazu.service';
import {
  CompatibilityResult,
  DatingContext,
  PartnerCheckInput,
  UserSazuInput,
} from '../../models/sazu.model';
import { DateSplitInputComponent } from '../date-split-input/date-split-input.component';

type StoryVariant = 'delulu' | 'redflag' | 'celebrity' | 'chemistry' | 'drama';

interface PartnerContextCopy {
  kicker: string;
  headline: string;
  verdict: string;
  redFlagLabel: string;
  sharePrompt: string;
  shareAnswer: string;
}

type AppModalState =
  'culture' | 'legal:impressum' | 'legal:datenschutz' | 'story:personal' | 'story:partner' | null;

interface AppHistorySnapshot {
  tab: 'sazu' | 'partner';
  showSazuResult: boolean;
  showPartnerResult: boolean;
  personalStage: 1 | 2 | 3 | 4;
  partnerStage: 1 | 2 | 3 | 4;
  modal: AppModalState;
  scrollY: number;
}

const APP_HISTORY_KEY = '__sazuPalzaUi';

@Component({
  selector: 'app-main-view',
  imports: [CommonModule, FormsModule, DateSplitInputComponent],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css',
})
export class MainViewComponent {
  protected readonly sazuService = inject(SazuService);
  private readonly destroyRef = inject(DestroyRef);
  private revealTimer: ReturnType<typeof setTimeout> | null = null;
  private revealTargetId: string | null = null;
  private modalTrigger: HTMLElement | null = null;
  private modalScrollY = 0;
  private exitGuardAttached = false;
  private bodyStyleBeforeModal: {
    position: string;
    top: string;
    left: string;
    right: string;
    width: string;
    overflow: string;
    touchAction: string;
  } | null = null;

  // Form states
  protected readonly sazuForm = signal<UserSazuInput>({
    name: '',
    birthDate: '',
    birthTime: '',
    gender: 'w',
  });

  protected readonly partnerForm = signal<PartnerCheckInput>({
    person1Name: '',
    person1BirthDate: '',
    person2Name: '',
    person2BirthDate: '',
    context: 'crush',
  });

  protected readonly showCultureModal = signal<boolean>(false);
  protected readonly activeLegalModal = signal<'impressum' | 'datenschutz' | null>(null);
  protected readonly storyModalType = signal<'personal' | 'partner' | null>(null);
  protected readonly showStoryModal = computed<boolean>(() => this.storyModalType() !== null);
  protected readonly isGeneratingStory = signal<boolean>(false);
  protected readonly revealType = signal<'personal' | 'partner' | null>(null);
  protected readonly storyVariant = signal<StoryVariant>('delulu');
  protected readonly personalRevealStage = signal<1 | 2 | 3 | 4>(1);
  protected readonly partnerRevealStage = signal<1 | 2 | 3 | 4>(1);
  protected readonly showSazuResult = signal<boolean>(this.sazuService.userSazuResult() !== null);
  protected readonly showPartnerResult = signal<boolean>(this.sazuService.partnerResult() !== null);

  // Form Validation errors
  protected readonly sazuFormError = signal<string | null>(null);
  protected readonly partnerFormError = signal<string | null>(null);

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', this.handlePopState);
      window.addEventListener('keydown', this.handleGlobalKeydown);
      this.replaceHistorySnapshot();
    }

    this.destroyRef.onDestroy(() => {
      this.clearReveal();
      if (typeof window !== 'undefined') {
        window.removeEventListener('popstate', this.handlePopState);
        window.removeEventListener('keydown', this.handleGlobalKeydown);
        this.detachExitGuard();
      }
      this.unlockPageScroll();
    });
  }

  openLegal(type: 'impressum' | 'datenschutz') {
    if (this.activeLegalModal() === type) return;
    this.prepareModalOpen();
    this.activeLegalModal.set(type);
    this.pushHistorySnapshot();
    this.activateModalAccessibility();
  }

  closeLegal() {
    const legalType = this.activeLegalModal();
    this.closeModalWithHistory(legalType ? `legal:${legalType}` : null);
  }

  protected openCultureModal(): void {
    if (this.showCultureModal()) return;
    this.prepareModalOpen();
    this.showCultureModal.set(true);
    this.pushHistorySnapshot();
    this.activateModalAccessibility();
  }

  protected closeCultureModal(): void {
    this.closeModalWithHistory('culture');
  }

  openStoryModal(type: 'personal' | 'partner' = 'partner'): void {
    this.prepareModalOpen();
    this.storyVariant.set(type === 'personal' ? 'delulu' : 'chemistry');
    this.storyModalType.set(type);
    this.pushHistorySnapshot();
    this.activateModalAccessibility();
  }

  closeStoryModal(): void {
    const type = this.storyModalType();
    this.closeModalWithHistory(type ? `story:${type}` : null);
  }

  protected setStoryVariant(variant: StoryVariant): void {
    this.storyVariant.set(variant);
  }

  protected advancePersonalReveal(): void {
    this.saveCurrentHistoryScroll();
    this.personalRevealStage.update((stage) => (stage < 4 ? ((stage + 1) as 1 | 2 | 3 | 4) : 4));
    this.pushHistorySnapshot();
  }

  protected advancePartnerReveal(): void {
    this.saveCurrentHistoryScroll();
    this.partnerRevealStage.update((stage) => (stage < 4 ? ((stage + 1) as 1 | 2 | 3 | 4) : 4));
    this.pushHistorySnapshot();
  }

  // Presets for quick fun testing
  loadSazuPreset(preset: 'leader' | 'creative' | 'strategist') {
    if (preset === 'leader') {
      this.sazuForm.set({
        name: 'Maximilian',
        birthDate: '1990-05-18',
        birthTime: '08:30',
        gender: 'm',
      });
    } else if (preset === 'creative') {
      this.sazuForm.set({
        name: 'Sophie',
        birthDate: '1995-10-24',
        birthTime: '14:15',
        gender: 'w',
      });
    } else {
      this.sazuForm.set({
        name: 'Alexander',
        birthDate: '1988-02-04',
        birthTime: '19:45',
        gender: 'd',
      });
    }
    this.sazuFormError.set(null);
  }

  loadPartnerPreset(type: 'dream' | 'clash' | 'symbiosis') {
    if (type === 'dream') {
      // Gap + Gi (Heavenly Combination 97%)
      this.partnerForm.set({
        person1Name: 'Lukas',
        person1BirthDate: '1992-03-15', // Gap day
        person2Name: 'Emma',
        person2BirthDate: '1994-07-20', // Gi day
        context: 'crush',
      });
    } else if (type === 'clash') {
      // Byeong + Im (Clash 52%)
      this.partnerForm.set({
        person1Name: 'Felix',
        person1BirthDate: '1991-06-12', // Byeong day
        person2Name: 'Mia',
        person2BirthDate: '1993-01-08', // Im day
        context: 'relationship',
      });
    } else {
      // Sangsaeng Wood + Fire
      this.partnerForm.set({
        person1Name: 'Jonas',
        person1BirthDate: '1990-11-20',
        person2Name: 'Hannah',
        person2BirthDate: '1992-08-14',
        context: 'bestie',
      });
    }
    this.partnerFormError.set(null);
  }

  setPartnerContext(ctx: DatingContext): void {
    this.partnerForm.update((f) => ({ ...f, context: ctx }));
  }

  switchTab(tab: 'sazu' | 'partner'): void {
    if (this.sazuService.activeTab() === tab) return;
    this.saveCurrentHistoryScroll();
    this.clearReveal();
    this.closeAllModals();
    this.sazuService.activeTab.set(tab);
    this.pushHistorySnapshot(0);
    this.scrollToTop();
  }

  resetSazu(): void {
    this.clearReveal();
    this.personalRevealStage.set(1);
    this.showSazuResult.set(false);
    this.sazuService.resetSazu();
    this.replaceHistorySnapshot();
    this.scrollToTop();
  }

  resetPartner(): void {
    this.clearReveal();
    this.partnerRevealStage.set(1);
    this.showPartnerResult.set(false);
    this.sazuService.resetPartner();
    this.replaceHistorySnapshot();
    this.scrollToTop();
  }

  submitSazu(): void {
    const input = this.sazuForm();
    if (!input.name.trim()) {
      this.sazuFormError.set('Bitte gib deinen Vornamen oder Spitznamen ein.');
      return;
    }
    if (!input.birthDate) {
      this.sazuFormError.set('Bitte wähle dein Geburtsdatum aus.');
      return;
    }

    this.saveCurrentHistoryScroll();
    this.enableExitGuard();
    this.sazuFormError.set(null);
    this.personalRevealStage.set(1);
    this.sazuService.calculateSazu(input);
    this.showSazuResult.set(true);
    this.pushHistorySnapshot(0);
    this.triggerReveal('personal', 'sazu-result');
  }

  submitPartner(): void {
    const input = this.partnerForm();
    if (!input.person1Name.trim() || !input.person2Name.trim()) {
      this.partnerFormError.set('Bitte gib die Namen beider Personen ein.');
      return;
    }
    if (!input.person1BirthDate || !input.person2BirthDate) {
      this.partnerFormError.set('Bitte wähle die Geburtsdaten beider Personen aus.');
      return;
    }

    this.saveCurrentHistoryScroll();
    this.enableExitGuard();
    this.partnerFormError.set(null);
    this.partnerRevealStage.set(1);
    this.sazuService.calculateCompatibility(input);
    this.showPartnerResult.set(true);
    this.pushHistorySnapshot(0);
    this.triggerReveal('partner', 'partner-result');
  }

  private readonly handlePopState = (event: PopStateEvent): void => {
    const snapshot = this.readHistorySnapshot(event.state);
    if (!snapshot) return;
    this.restoreHistorySnapshot(snapshot);
  };

  private readonly handleGlobalKeydown = (event: KeyboardEvent): void => {
    if (!this.currentModalState()) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      this.dismissCurrentModal();
      return;
    }

    if (event.key !== 'Tab' || typeof document === 'undefined') return;
    const sheet = document.querySelector<HTMLElement>('.modal-backdrop .modal-sheet');
    if (!sheet) return;
    const focusable = Array.from(
      sheet.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => element.getClientRects().length > 0);

    if (focusable.length === 0) {
      event.preventDefault();
      sheet.focus({ preventScroll: true });
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus({ preventScroll: true });
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus({ preventScroll: true });
    }
  };

  private readonly handleBeforeUnload = (event: BeforeUnloadEvent): void => {
    if (!this.hasUnsavedSessionState()) return;
    event.preventDefault();
    event.returnValue = '';
  };

  protected enableExitGuard(): void {
    if (typeof window === 'undefined' || this.exitGuardAttached) return;
    window.addEventListener('beforeunload', this.handleBeforeUnload);
    this.exitGuardAttached = true;
  }

  private captureHistorySnapshot(): AppHistorySnapshot {
    let modal: AppModalState = null;
    const legalType = this.activeLegalModal();
    const storyType = this.storyModalType();
    if (this.showCultureModal()) {
      modal = 'culture';
    } else if (legalType) {
      modal = `legal:${legalType}`;
    } else if (storyType) {
      modal = `story:${storyType}`;
    }

    return {
      tab: this.sazuService.activeTab(),
      showSazuResult: this.showSazuResult(),
      showPartnerResult: this.showPartnerResult(),
      personalStage: this.personalRevealStage(),
      partnerStage: this.partnerRevealStage(),
      modal,
      scrollY: typeof window !== 'undefined' ? window.scrollY : 0,
    };
  }

  private readHistorySnapshot(state: unknown): AppHistorySnapshot | null {
    if (!state || typeof state !== 'object') return null;
    const snapshot = (state as Record<string, unknown>)[APP_HISTORY_KEY];
    if (!snapshot || typeof snapshot !== 'object') return null;

    const candidate = snapshot as Partial<AppHistorySnapshot>;
    if (candidate.tab !== 'sazu' && candidate.tab !== 'partner') return null;
    return {
      ...(candidate as AppHistorySnapshot),
      scrollY: typeof candidate.scrollY === 'number' ? candidate.scrollY : 0,
    };
  }

  private saveCurrentHistoryScroll(): void {
    if (typeof window === 'undefined') return;
    const snapshot = this.currentHistorySnapshot();
    if (!snapshot) return;
    window.history.replaceState(
      {
        ...(window.history.state ?? {}),
        [APP_HISTORY_KEY]: { ...snapshot, scrollY: window.scrollY },
      },
      document.title,
      window.location.href,
    );
  }

  private pushHistorySnapshot(scrollY?: number): void {
    if (typeof window === 'undefined') return;
    const snapshot = this.captureHistorySnapshot();
    window.history.pushState(
      {
        ...(window.history.state ?? {}),
        [APP_HISTORY_KEY]: {
          ...snapshot,
          scrollY: typeof scrollY === 'number' ? scrollY : snapshot.scrollY,
        },
      },
      document.title,
      window.location.href,
    );
  }

  private replaceHistorySnapshot(): void {
    if (typeof window === 'undefined') return;
    window.history.replaceState(
      {
        ...(window.history.state ?? {}),
        [APP_HISTORY_KEY]: this.captureHistorySnapshot(),
      },
      document.title,
      window.location.href,
    );
  }

  private restoreHistorySnapshot(snapshot: AppHistorySnapshot): void {
    const hadOpenModal = this.currentModalState() !== null;

    this.clearReveal();
    this.closeAllModals(false);
    this.sazuService.activeTab.set(snapshot.tab);
    this.showSazuResult.set(Boolean(snapshot.showSazuResult && this.sazuService.userSazuResult()));
    this.showPartnerResult.set(
      Boolean(snapshot.showPartnerResult && this.sazuService.partnerResult()),
    );
    this.personalRevealStage.set(this.normalizeRevealStage(snapshot.personalStage));
    this.partnerRevealStage.set(this.normalizeRevealStage(snapshot.partnerStage));

    let openedModal = false;
    if (snapshot.modal === 'culture') {
      this.showCultureModal.set(true);
      openedModal = true;
    } else if (snapshot.modal === 'legal:impressum') {
      this.activeLegalModal.set('impressum');
      openedModal = true;
    } else if (snapshot.modal === 'legal:datenschutz') {
      this.activeLegalModal.set('datenschutz');
      openedModal = true;
    } else if (snapshot.modal === 'story:personal' && this.sazuService.userSazuResult()) {
      this.storyModalType.set('personal');
      openedModal = true;
    } else if (snapshot.modal === 'story:partner' && this.sazuService.partnerResult()) {
      this.storyModalType.set('partner');
      openedModal = true;
    }

    this.restoreScrollPosition(snapshot.scrollY);
    if (openedModal) {
      this.activateModalAccessibility();
    } else if (hadOpenModal) {
      this.restoreModalTriggerFocus();
    }
  }

  private normalizeRevealStage(stage: number): 1 | 2 | 3 | 4 {
    if (stage === 2 || stage === 3 || stage === 4) return stage;
    return 1;
  }

  private currentHistorySnapshot(): AppHistorySnapshot | null {
    if (typeof window === 'undefined') return null;
    return this.readHistorySnapshot(window.history.state);
  }

  private currentModalState(): AppModalState {
    const legalType = this.activeLegalModal();
    const storyType = this.storyModalType();
    if (this.showCultureModal()) return 'culture';
    if (legalType) return `legal:${legalType}`;
    if (storyType) return `story:${storyType}`;
    return null;
  }

  private prepareModalOpen(): void {
    this.saveCurrentHistoryScroll();
    if (!this.currentModalState() && typeof document !== 'undefined') {
      this.modalTrigger =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
    }
    this.closeAllModals(false);
  }

  private activateModalAccessibility(): void {
    this.lockPageScroll();
    if (typeof document === 'undefined') return;
    setTimeout(() => {
      const sheet = document.querySelector<HTMLElement>('.modal-backdrop .modal-sheet');
      const initialFocus = sheet?.querySelector<HTMLElement>('[data-modal-initial-focus]');
      (initialFocus ?? sheet)?.focus({ preventScroll: true });
    });
  }

  private dismissCurrentModal(): void {
    const modal = this.currentModalState();
    if (modal === 'culture') {
      this.closeCultureModal();
    } else if (modal?.startsWith('legal:')) {
      this.closeLegal();
    } else if (modal?.startsWith('story:')) {
      this.closeStoryModal();
    }
  }

  private lockPageScroll(): void {
    if (
      typeof document === 'undefined' ||
      typeof window === 'undefined' ||
      this.bodyStyleBeforeModal
    ) {
      return;
    }

    const body = document.body;
    this.modalScrollY = window.scrollY;
    this.bodyStyleBeforeModal = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      touchAction: body.style.touchAction,
    };
    body.style.position = 'fixed';
    body.style.top = `-${this.modalScrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    body.style.touchAction = 'none';
  }

  private unlockPageScroll(): void {
    if (
      typeof document === 'undefined' ||
      typeof window === 'undefined' ||
      !this.bodyStyleBeforeModal
    ) {
      return;
    }

    const body = document.body;
    const previous = this.bodyStyleBeforeModal;
    body.style.position = previous.position;
    body.style.top = previous.top;
    body.style.left = previous.left;
    body.style.right = previous.right;
    body.style.width = previous.width;
    body.style.overflow = previous.overflow;
    body.style.touchAction = previous.touchAction;
    this.bodyStyleBeforeModal = null;
    window.scrollTo({ top: this.modalScrollY, left: 0, behavior: 'auto' });
  }

  private restoreModalTriggerFocus(): void {
    const trigger = this.modalTrigger;
    this.modalTrigger = null;
    if (!trigger) return;
    setTimeout(() => {
      if (trigger.isConnected) trigger.focus({ preventScroll: true });
    });
  }

  private restoreScrollPosition(scrollY: number): void {
    if (typeof document === 'undefined' || typeof window === 'undefined') return;
    const previousBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({ top: Math.max(0, scrollY), left: 0, behavior: 'auto' });
    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = previousBehavior;
    });
  }

  private hasUnsavedSessionState(): boolean {
    const sazu = this.sazuForm();
    const partner = this.partnerForm();
    return Boolean(
      this.showSazuResult() ||
      this.showPartnerResult() ||
      sazu.name.trim() ||
      sazu.birthDate ||
      sazu.birthTime ||
      partner.person1Name.trim() ||
      partner.person1BirthDate ||
      partner.person2Name.trim() ||
      partner.person2BirthDate,
    );
  }

  private detachExitGuard(): void {
    if (typeof window === 'undefined' || !this.exitGuardAttached) return;
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
    this.exitGuardAttached = false;
  }

  private closeModalWithHistory(expectedModal: AppModalState): void {
    const shouldStepBack =
      expectedModal !== null && this.currentHistorySnapshot()?.modal === expectedModal;
    this.closeAllModals(true);

    if (shouldStepBack && typeof window !== 'undefined') {
      window.history.back();
    } else {
      this.replaceHistorySnapshot();
    }
  }

  private closeAllModals(restoreFocus = false): void {
    const hadOpenModal = this.currentModalState() !== null;
    this.showCultureModal.set(false);
    this.activeLegalModal.set(null);
    this.storyModalType.set(null);
    if (hadOpenModal || this.bodyStyleBeforeModal) this.unlockPageScroll();
    if (restoreFocus && hadOpenModal) this.restoreModalTriggerFocus();
  }

  private triggerReveal(type: 'personal' | 'partner', targetId: string): void {
    this.clearReveal();
    this.revealType.set(type);
    this.revealTargetId = targetId;

    this.revealTimer = setTimeout(() => {
      this.revealType.set(null);
      this.revealTimer = null;
      this.revealTargetId = null;
      this.scrollToTop(targetId);
    }, 2600);
  }

  protected skipReveal(): void {
    const targetId = this.revealTargetId;
    this.clearReveal();
    if (targetId) this.scrollToTop(targetId);
  }

  private clearReveal(): void {
    if (this.revealTimer) {
      clearTimeout(this.revealTimer);
      this.revealTimer = null;
    }
    this.revealType.set(null);
    this.revealTargetId = null;
  }

  /**
   * Smoothly scrolls to the top of results or page, ensuring virtual keyboards are dismissed
   * and Angular template rendering is finished.
   */
  scrollToTop(elementId?: string): void {
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // Small delay ensures Angular DOM render cycle is complete
    setTimeout(() => {
      if (elementId && typeof document !== 'undefined') {
        const target = document.getElementById(elementId);
        if (target) {
          try {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
          } catch {
            target.scrollIntoView(true);
            return;
          }
        }
      }

      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      } catch {
        window.scrollTo(0, 0);
      }

      if (typeof document !== 'undefined') {
        try {
          document.documentElement?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          document.body?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        } catch {
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }

        const topElement =
          document.querySelector('.result-container') ||
          document.querySelector('.nav-tabs') ||
          document.querySelector('.main-container');
        if (topElement && 'scrollIntoView' in topElement) {
          try {
            topElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } catch {
            topElement.scrollIntoView(true);
          }
        }
      }
    }, 60);
  }

  shareSazu(): void {
    const res = this.sazuService.userSazuResult();
    if (!res) return;
    const title = `${res.dayMaster.deluluScore}% Delulu: ${res.input.name}s koreanischer Destiny Roast`;
    const text = `${res.dayMaster.deluluScore}% DELULU.\nMeine Red Flag: ${res.dayMaster.toxicTrait}\n\nMein Main-Character-Typ: ${res.dayMaster.germanArchetype}\n\nGeburtsdatum rein. Red Flag raus: https://sazu.usogi.org`;
    this.sazuService.shareResult(title, text);
  }

  sharePartner(): void {
    const res = this.sazuService.partnerResult();
    if (!res) return;
    const contextCopy = this.getPartnerContextCopy(res);
    const title = `${res.score}% Match, ${res.toxicScore}% Drama: ${res.person1.name} × ${res.person2.name}`;
    const text = `${res.person1.name} × ${res.person2.name}\n${res.score}% MATCH • ${res.flirtScore}% ANZIEHUNG • ${res.toxicScore}% DRAMA\n\n${contextCopy.headline}\n${contextCopy.verdict}\n\nZwei Geburtsdaten. Eine brutale Wahrheit: https://sazu.usogi.org`;
    this.sazuService.shareResult(title, text);
  }

  protected getPartnerContextCopy(res: CompatibilityResult): PartnerContextCopy {
    switch (res.context) {
      case 'relationship':
        return {
          kicker: 'BEZIEHUNGS-TÜV',
          headline: 'Langzeitpotenzial oder gemeinsame Therapie?',
          verdict:
            res.stabilityScore >= 70
              ? 'Der Alltag kann funktionieren. Vorausgesetzt, niemand sagt „Ist doch nicht so schlimm“.'
              : 'Große Gefühle, kleine Chance auf einen friedlichen IKEA-Besuch.',
          redFlagLabel: 'WAS EUEREN ALLTAG SPRENGT',
          sharePrompt: 'ZIEHT IHR TROTZDEM ZUSAMMEN?',
          shareAnswer: 'JA, MIT GETRENNTEN DECKEN / NIEMALS IKEA',
        };
      case 'bestie':
        return {
          kicker: 'BESTIE-LOYALITÄTSTEST',
          headline: 'Ride-or-die oder heimlicher Konkurrenzkampf?',
          verdict:
            res.toxicScore >= 65
              ? 'Ihr verteidigt euch vor allen – und rottet euch danach privat komplett aus.'
              : 'Eine Freundschaft mit Sprachmemos, Insiderwitzen und erstaunlich wenig Therapiebedarf.',
          redFlagLabel: 'WAS DEN GRUPPENCHAT ESKALIEREN LÄSST',
          sharePrompt: 'WER SAGT IMMER „BIN IN 5 MIN DA“?',
          shareAnswer: 'ICH / DIE ANDERE LÜGT',
        };
      case 'ex':
        return {
          kicker: 'RÜCKFALL-RADAR',
          headline: 'Schicksalsverbindung oder Rückfallgefahr?',
          verdict:
            res.toxicScore >= 60
              ? 'Das Universum sagt Lektion. Dein Chatverlauf sagt „eine letzte Nachricht“.'
              : 'Nicht komplett toxisch – aber Nostalgie ist noch kein Beziehungsgrund.',
          redFlagLabel: 'WARUM BLOCKIEREN GESÜNDER WÄRE',
          sharePrompt: 'NOCH EINE RUNDE?',
          shareAnswer: 'BLOCKIERT / NUR KURZ SCHAUEN',
        };
      case 'crush':
      default:
        return {
          kicker: 'CRUSH-RADAR',
          headline: 'Wird daraus ein Date oder nur Story-Views?',
          verdict:
            res.flirtScore >= 70
              ? 'Die Chemie schreit Date. Die Kommunikation flüstert „mal schauen“. '
              : 'Mehr Interpretationsarbeit als echte Nachrichten – klassischer Crush-Sport.',
          redFlagLabel: 'WAS EURE TALKING STAGE SABOTIERT',
          sharePrompt: 'WÜRDEST DU TROTZDEM SCHREIBEN?',
          shareAnswer: 'JA, LEIDER / ICH WARTE AUF IHN',
        };
    }
  }

  /**
   * Generates a 1080x1920 high-res aesthetic Instagram Story card using HTML5 Canvas
   * and triggers Web Share with file or download.
   */
  async downloadStoryCard(): Promise<void> {
    if (this.storyModalType() === 'personal') {
      await this.downloadPersonalStoryCard();
    } else {
      await this.downloadPartnerStoryCard();
    }
  }

  async downloadPersonalStoryCard(): Promise<void> {
    const res = this.sazuService.userSazuResult();
    if (!res) return;
    const variant = this.storyVariant();

    this.isGeneratingStory.set(true);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        this.isGeneratingStory.set(false);
        return;
      }

      // Viral dark-editorial background: designed to stop a Story scroll.
      const background = ctx.createLinearGradient(0, 0, 1080, 1920);
      background.addColorStop(0, '#100d10');
      background.addColorStop(0.52, '#1d1116');
      background.addColorStop(1, '#09090c');
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, 1080, 1920);

      const glow = ctx.createRadialGradient(920, 220, 0, 920, 220, 560);
      glow.addColorStop(0, 'rgba(196, 45, 63, 0.52)');
      glow.addColorStop(1, 'rgba(196, 45, 63, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(360, 0, 720, 780);

      ctx.strokeStyle = 'rgba(232, 196, 166, 0.32)';
      ctx.lineWidth = 2;
      ctx.strokeRect(48, 48, 984, 1824);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.strokeRect(62, 62, 956, 1796);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#e4b8a2';
      ctx.font = '800 20px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('KOREAN DESTINY ROAST • 사주', 78, 112);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 20px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('SAZU PALZA', 1002, 112);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 44px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(res.input.name.toUpperCase(), 78, 192);
      ctx.fillStyle = '#c6b7ae';
      ctx.font = '600 23px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(
        `${res.dayMaster.polarity}-${res.dayMaster.element} • ${res.dayMaster.name}`,
        78,
        232,
      );

      ctx.fillStyle = '#b8323e';
      ctx.beginPath();
      ctx.roundRect(882, 152, 120, 120, 16);
      ctx.fill();
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 66px "Apple SD Gothic Neo", "Nanum Myeongjo", serif';
      ctx.fillText(res.dayMaster.hanja, 942, 235);

      ctx.textAlign = 'left';
      if (variant === 'redflag') {
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 105px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText('RED FLAG', 72, 426);
        ctx.fillStyle = '#ef6975';
        ctx.font = '900 27px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText('OFFIZIELL ENTLARVT', 78, 486);
      } else if (variant === 'celebrity') {
        const celebrityName = res.celebrities[0]?.name || 'K-POP TWIN';
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 78px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        this.renderWrappedText(ctx, celebrityName.toUpperCase(), 72, 386, 920, 82, 'left', 2);
        ctx.fillStyle = '#ef6975';
        ctx.font = '900 25px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText('DEIN CELEBRITY ENERGY MATCH', 78, 486);
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 174px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText(`${res.dayMaster.deluluScore}%`, 72, 438);
        ctx.fillStyle = '#ef6975';
        ctx.font = '900 28px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText('DELULU', 78, 486);
        ctx.fillStyle = '#ad9d94';
        ctx.font = '700 18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText('DAS URTEIL IST OFFIZIELL', 224, 485);
      }

      ctx.fillStyle = 'rgba(255, 255, 255, 0.065)';
      ctx.beginPath();
      ctx.roundRect(72, 530, 936, 300, 28);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.stroke();
      ctx.fillStyle = '#e4b8a2';
      ctx.font = '800 20px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('DEIN MAIN-CHARACTER-TYP', 108, 580);
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 48px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      this.renderWrappedText(ctx, res.dayMaster.germanArchetype, 108, 646, 850, 58, 'left', 3);

      const toxicGradient = ctx.createLinearGradient(72, 0, 1008, 0);
      toxicGradient.addColorStop(0, 'rgba(178, 42, 53, 0.38)');
      toxicGradient.addColorStop(1, 'rgba(112, 24, 38, 0.2)');
      ctx.fillStyle = toxicGradient;
      ctx.beginPath();
      ctx.roundRect(72, 860, 936, 300, 28);
      ctx.fill();
      ctx.strokeStyle = 'rgba(239, 105, 117, 0.58)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#ff7c86';
      ctx.font = '900 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('DEINE RED FLAG', 108, 914);
      ctx.fillStyle = '#ffffff';
      ctx.font = '650 38px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      this.renderWrappedText(ctx, res.dayMaster.toxicTrait, 108, 978, 850, 50, 'left', 4);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.beginPath();
      ctx.roundRect(72, 1190, 936, 220, 24);
      ctx.fill();
      ctx.fillStyle = '#ad9d94';
      ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('LIVE AUS DEINEM GRUPPENCHAT', 108, 1238);
      ctx.fillStyle = '#f3e9e2';
      ctx.font = 'italic 30px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      this.renderWrappedText(ctx, res.dayMaster.whatsAppSignature, 108, 1292, 850, 42, 'left', 3);

      const celebText =
        res.celebrities && res.celebrities.length > 0
          ? res.celebrities
              .slice(0, 3)
              .map((celebrity) => celebrity.name)
              .join(' • ')
          : 'Day Master Resonanz';
      ctx.fillStyle = '#e4b8a2';
      ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('SAME ENERGY', 78, 1472);
      ctx.fillStyle = '#ffffff';
      ctx.font = '750 27px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      this.renderWrappedText(ctx, celebText, 78, 1517, 920, 38, 'left', 2);

      ctx.fillStyle = '#fff8f2';
      ctx.beginPath();
      ctx.roundRect(72, 1600, 936, 164, 26);
      ctx.fill();
      ctx.textAlign = 'center';
      ctx.fillStyle = '#201318';
      ctx.font = '900 34px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      const personalPrompt =
        variant === 'redflag'
          ? 'WER KENNT DIESE RED FLAG?'
          : variant === 'celebrity'
            ? 'WER TEILT MEINE ENERGY?'
            : 'WER IST NOCH SO DELULU?';
      ctx.fillText(personalPrompt, 540, 1667);
      ctx.fillStyle = '#8c3640';
      ctx.font = '700 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(
        variant === 'celebrity'
          ? 'Schick das deinem K-Pop Gruppenchat.'
          : 'Markiere die Freundin mit den Beweisen.',
        540,
        1712,
      );

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 27px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('sazu.usogi.org', 540, 1826);
      ctx.fillStyle = '#95877f';
      ctx.font = '600 18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('Geburtsdatum rein. Red Flag raus.', 540, 1858);

      // Export to File / Share
      canvas.toBlob(async (blob) => {
        if (!blob) {
          this.isGeneratingStory.set(false);
          return;
        }

        const fileName = `sazu-${variant}-${res.input.name}.png`;
        const file = new File([blob], fileName, { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title:
                variant === 'celebrity'
                  ? `${res.input.name}s Celebrity Energy Match`
                  : variant === 'redflag'
                    ? `${res.input.name}s Red Flag wurde entlarvt`
                    : `${res.dayMaster.deluluScore}% Delulu: ${res.input.name}s Destiny Roast`,
              text:
                variant === 'celebrity'
                  ? `Ich teile meine Energy mit ${res.celebrities[0]?.name || 'einem K-Pop Twin'}.`
                  : `Meine Red Flag: ${res.dayMaster.toxicTrait}`,
            });
            this.sazuService.showToast('Story-Bild geteilt.');
          } catch {
            this.downloadBlob(blob, fileName);
          }
        } else {
          this.downloadBlob(blob, fileName);
        }

        this.isGeneratingStory.set(false);
      }, 'image/png');
    } catch {
      this.isGeneratingStory.set(false);
    }
  }

  async downloadPartnerStoryCard(): Promise<void> {
    const res = this.sazuService.partnerResult();
    if (!res) return;
    const variant = this.storyVariant();
    const contextCopy = this.getPartnerContextCopy(res);

    this.isGeneratingStory.set(true);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        this.isGeneratingStory.set(false);
        return;
      }

      const background = ctx.createLinearGradient(0, 0, 1080, 1920);
      background.addColorStop(0, '#0c0c10');
      background.addColorStop(0.48, '#211016');
      background.addColorStop(1, '#09090c');
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, 1080, 1920);

      const glow = ctx.createRadialGradient(170, 410, 0, 170, 410, 620);
      glow.addColorStop(0, 'rgba(190, 44, 62, 0.46)');
      glow.addColorStop(1, 'rgba(190, 44, 62, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, 800, 1040);

      ctx.strokeStyle = 'rgba(232, 196, 166, 0.32)';
      ctx.lineWidth = 2;
      ctx.strokeRect(48, 48, 984, 1824);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.strokeRect(62, 62, 956, 1796);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#e4b8a2';
      ctx.font = '800 20px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('KOREAN CHEMISTRY CHECK • 궁합', 78, 112);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('SAZU PALZA', 1002, 112);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.font = '850 46px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(`${res.person1.name}  ×  ${res.person2.name}`, 540, 200);
      ctx.fillStyle = '#c6b7ae';
      ctx.font = '650 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      this.renderWrappedText(
        ctx,
        contextCopy.headline.toUpperCase(),
        540,
        246,
        900,
        30,
        'center',
        2,
      );

      ctx.fillStyle = '#ffffff';
      ctx.font = '900 178px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(`${variant === 'drama' ? res.toxicScore : res.score}%`, 540, 462);
      ctx.fillStyle = '#ef6975';
      ctx.font = '900 28px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(variant === 'drama' ? 'DRAMA' : 'MATCH', 540, 512);

      const metrics = [
        { value: res.flirtScore, label: 'ANZIEHUNG' },
        { value: res.stabilityScore, label: 'ALLTAG' },
        { value: res.toxicScore, label: 'DRAMA' },
      ];
      const metricWidth = 286;
      metrics.forEach((metric, index) => {
        const x = 72 + index * 325;
        ctx.fillStyle = index === 2 ? 'rgba(184, 50, 62, 0.24)' : 'rgba(255, 255, 255, 0.065)';
        ctx.beginPath();
        ctx.roundRect(x, 558, metricWidth, 142, 22);
        ctx.fill();
        ctx.strokeStyle = index === 2 ? 'rgba(239, 105, 117, 0.4)' : 'rgba(255, 255, 255, 0.1)';
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.font = '850 40px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText(`${metric.value}%`, x + metricWidth / 2, 618);
        ctx.fillStyle = index === 2 ? '#ff7c86' : '#bfb0a7';
        ctx.font = '800 17px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText(metric.label, x + metricWidth / 2, 661);
      });

      ctx.fillStyle = 'rgba(255, 255, 255, 0.055)';
      ctx.beginPath();
      ctx.roundRect(72, 744, 936, 280, 28);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.11)';
      ctx.stroke();
      ctx.textAlign = 'left';
      ctx.fillStyle = '#e4b8a2';
      ctx.font = '800 20px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(contextCopy.kicker, 108, 798);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'italic 38px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      this.renderWrappedText(ctx, contextCopy.verdict, 108, 860, 850, 50, 'left', 4);

      const redFlagGradient = ctx.createLinearGradient(72, 0, 1008, 0);
      redFlagGradient.addColorStop(0, 'rgba(181, 43, 55, 0.42)');
      redFlagGradient.addColorStop(1, 'rgba(104, 22, 36, 0.22)');
      ctx.fillStyle = redFlagGradient;
      ctx.beginPath();
      ctx.roundRect(72, 1056, 936, 290, 28);
      ctx.fill();
      ctx.strokeStyle = 'rgba(239, 105, 117, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#ff7c86';
      ctx.font = '900 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(contextCopy.redFlagLabel, 108, 1110);
      ctx.fillStyle = '#ffffff';
      ctx.font = '650 36px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      this.renderWrappedText(ctx, res.redFlag, 108, 1172, 850, 48, 'left', 4);

      ctx.fillStyle = 'rgba(51, 126, 91, 0.13)';
      ctx.beginPath();
      ctx.roundRect(72, 1378, 936, 170, 24);
      ctx.fill();
      ctx.strokeStyle = 'rgba(101, 190, 148, 0.25)';
      ctx.stroke();
      ctx.fillStyle = '#72ca9f';
      ctx.font = '850 18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('WARUM IHR ES TROTZDEM VERSUCHT', 108, 1426);
      ctx.fillStyle = '#eaf5ef';
      ctx.font = '650 27px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      this.renderWrappedText(ctx, res.greenFlag, 108, 1472, 850, 38, 'left', 2);

      ctx.fillStyle = '#fff8f2';
      ctx.beginPath();
      ctx.roundRect(72, 1580, 936, 184, 26);
      ctx.fill();
      ctx.textAlign = 'center';
      ctx.fillStyle = '#201318';
      ctx.font = '900 32px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(contextCopy.sharePrompt, 540, 1646);
      ctx.fillStyle = '#8c3640';
      ctx.font = '800 23px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(contextCopy.shareAnswer, 540, 1696);
      ctx.fillStyle = '#685b56';
      ctx.font = '600 18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('Markiere deinen Partner, Crush oder deine Bestie.', 540, 1734);

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 27px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('sazu.usogi.org', 540, 1826);
      ctx.fillStyle = '#95877f';
      ctx.font = '600 18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('Zwei Geburtsdaten. Eine brutale Wahrheit.', 540, 1858);

      // Export to File / Share
      canvas.toBlob(async (blob) => {
        if (!blob) {
          this.isGeneratingStory.set(false);
          return;
        }

        const fileName = `sazu-${variant}-${res.person1.name}-${res.person2.name}.png`;
        const file = new File([blob], fileName, { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title:
                variant === 'drama'
                  ? `${res.toxicScore}% Drama: ${res.person1.name} × ${res.person2.name}`
                  : `${res.score}% Match: ${res.person1.name} × ${res.person2.name}`,
              text: `${contextCopy.headline} ${contextCopy.verdict}`,
            });
            this.sazuService.showToast('Story-Bild geteilt.');
          } catch {
            this.downloadBlob(blob, fileName);
          }
        } else {
          this.downloadBlob(blob, fileName);
        }

        this.isGeneratingStory.set(false);
      }, 'image/png');
    } catch {
      this.isGeneratingStory.set(false);
    }
  }

  /**
   * Splits text into wrapped lines that strictly respect maxWidth.
   * Handles long compound words (e.g. German words) by breaking them safely.
   */
  private getWrappedLines(
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number,
    maxLines: number = 99,
  ): string[] {
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let currentLine = '';
    let wasTruncated = false;

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (!word) continue;

      // If word itself exceeds maxWidth, split character by character
      if (ctx.measureText(word).width > maxWidth) {
        if (currentLine.trim()) {
          lines.push(currentLine.trim());
          currentLine = '';
          if (lines.length >= maxLines) {
            wasTruncated = true;
            break;
          }
        }
        for (let c = 0; c < word.length; c++) {
          const testCharLine = currentLine + word[c];
          if (ctx.measureText(testCharLine).width > maxWidth && currentLine.length > 0) {
            lines.push(currentLine.trim());
            currentLine = word[c];
            if (lines.length >= maxLines) {
              wasTruncated = true;
              break;
            }
          } else {
            currentLine = testCharLine;
          }
        }
        if (wasTruncated) break;
        currentLine += ' ';
        continue;
      }

      const testLine = currentLine ? `${currentLine} ${word}` : word;
      if (ctx.measureText(testLine).width > maxWidth) {
        if (currentLine) {
          lines.push(currentLine.trim());
          if (lines.length >= maxLines) {
            wasTruncated = true;
            break;
          }
        }
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    if (!wasTruncated && currentLine.trim() && lines.length < maxLines) {
      lines.push(currentLine.trim());
    } else if (currentLine.trim() && lines.length >= maxLines) {
      wasTruncated = true;
    }

    if (wasTruncated && lines.length > 0) {
      let last = lines[lines.length - 1];
      while (last.length > 0 && ctx.measureText(last + '…').width > maxWidth) {
        last = last.slice(0, -1);
      }
      lines[lines.length - 1] = last.trim() + '…';
    }

    return lines;
  }

  private renderWrappedText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
    align: CanvasTextAlign = 'center',
    maxLines: number = 6,
  ): number {
    ctx.textAlign = align;
    const lines = this.getWrappedLines(ctx, text, maxWidth, maxLines);
    let currentY = y;
    for (const line of lines) {
      ctx.fillText(line, x, currentY);
      currentY += lineHeight;
    }
    return currentY;
  }

  private downloadBlob(blob: Blob, fileName: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.sazuService.showToast('Story-Bild erfolgreich heruntergeladen.');
  }

  getHourInfo() {
    const res = this.sazuService.userSazuResult();
    if (!res?.input.birthTime) return null;
    return this.sazuService.getHourPillarInfo(res.input.birthTime);
  }
}
