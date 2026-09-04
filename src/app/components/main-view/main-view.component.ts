import { Component, DestroyRef, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SazuService } from '../../services/sazu.service';
import {
  CompatibilityResult,
  DatingContext,
  PartnerCheckInput,
  RoastMode,
  UserSazuInput,
} from '../../models/sazu.model';
import { DateSplitInputComponent } from '../date-split-input/date-split-input.component';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { PersonalResultComponent } from '../personal-result/personal-result.component';
import { PartnerResultComponent } from '../partner-result/partner-result.component';
import { RoastModeSelectorComponent } from '../roast-mode-selector/roast-mode-selector.component';
import {
  AppHistorySnapshot,
  AppModalState,
  NavigationStateService,
} from '../../services/navigation-state.service';
import { StoryCardService, StoryVariant } from '../../services/story-card.service';

interface PartnerContextCopy {
  kicker: string;
  headline: string;
  verdict: string;
  redFlagLabel: string;
  sharePrompt: string;
  shareAnswer: string;
}

@Component({
  selector: 'app-main-view',
  imports: [
    CommonModule,
    FormsModule,
    DateSplitInputComponent,
    BottomSheetComponent,
    PersonalResultComponent,
    PartnerResultComponent,
    RoastModeSelectorComponent,
  ],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class MainViewComponent {
  protected readonly sazuService = inject(SazuService);
  private readonly navigationState = inject(NavigationStateService);
  private readonly storyCardService = inject(StoryCardService);
  private readonly destroyRef = inject(DestroyRef);
  private revealTimer: ReturnType<typeof setTimeout> | null = null;
  private revealTargetId: string | null = null;
  private exitGuardAttached = false;

  // Form states
  protected readonly sazuForm = signal<UserSazuInput>({
    name: '',
    birthDate: '',
    birthTime: '',
    gender: 'w',
    roastMode: 'honest',
  });

  protected readonly partnerForm = signal<PartnerCheckInput>({
    person1Name: '',
    person1BirthDate: '',
    person2Name: '',
    person2BirthDate: '',
    context: 'crush',
    roastMode: 'honest',
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
    const stopListening = this.navigationState.listen((snapshot) =>
      this.restoreHistorySnapshot(snapshot),
    );
    this.replaceHistorySnapshot();

    this.destroyRef.onDestroy(() => {
      this.clearReveal();
      stopListening();
      if (typeof window !== 'undefined') {
        this.detachExitGuard();
      }
    });
  }

  openLegal(type: 'impressum' | 'datenschutz') {
    if (this.activeLegalModal() === type) return;
    this.prepareModalOpen();
    this.activeLegalModal.set(type);
    this.pushHistorySnapshot();
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
  }

  protected closeCultureModal(): void {
    this.closeModalWithHistory('culture');
  }

  openStoryModal(type: 'personal' | 'partner' = 'partner'): void {
    this.prepareModalOpen();
    this.storyVariant.set(type === 'personal' ? 'delulu' : 'chemistry');
    this.storyModalType.set(type);
    this.pushHistorySnapshot();
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
    const roastMode = this.sazuForm().roastMode ?? 'honest';
    if (preset === 'leader') {
      this.sazuForm.set({
        name: 'Maximilian',
        birthDate: '1990-05-18',
        birthTime: '08:30',
        gender: 'm',
        roastMode,
      });
    } else if (preset === 'creative') {
      this.sazuForm.set({
        name: 'Sophie',
        birthDate: '1995-10-24',
        birthTime: '14:15',
        gender: 'w',
        roastMode,
      });
    } else {
      this.sazuForm.set({
        name: 'Alexander',
        birthDate: '1988-02-04',
        birthTime: '19:45',
        gender: 'd',
        roastMode,
      });
    }
    this.sazuFormError.set(null);
  }

  loadPartnerPreset(type: 'dream' | 'clash' | 'symbiosis') {
    const roastMode = this.partnerForm().roastMode ?? 'honest';
    if (type === 'dream') {
      // Gap + Gi (Heavenly Combination 97%)
      this.partnerForm.set({
        person1Name: 'Lukas',
        person1BirthDate: '1992-03-15', // Gap day
        person2Name: 'Emma',
        person2BirthDate: '1994-07-20', // Gi day
        context: 'crush',
        roastMode,
      });
    } else if (type === 'clash') {
      // Byeong + Im (Clash 52%)
      this.partnerForm.set({
        person1Name: 'Felix',
        person1BirthDate: '1991-06-12', // Byeong day
        person2Name: 'Mia',
        person2BirthDate: '1993-01-08', // Im day
        context: 'relationship',
        roastMode,
      });
    } else {
      // Sangsaeng Wood + Fire
      this.partnerForm.set({
        person1Name: 'Jonas',
        person1BirthDate: '1990-11-20',
        person2Name: 'Hannah',
        person2BirthDate: '1992-08-14',
        context: 'bestie',
        roastMode,
      });
    }
    this.partnerFormError.set(null);
  }

  setPartnerContext(ctx: DatingContext): void {
    this.partnerForm.update((f) => ({ ...f, context: ctx }));
  }

  setSazuRoastMode(roastMode: RoastMode): void {
    this.sazuForm.update((form) => ({ ...form, roastMode }));
    this.enableExitGuard();
  }

  setPartnerRoastMode(roastMode: RoastMode): void {
    this.partnerForm.update((form) => ({ ...form, roastMode }));
    this.enableExitGuard();
  }

  protected roastModeLabel(mode: RoastMode): string {
    if (mode === 'soft') return 'SANFT';
    if (mode === 'savage') return 'KEINE GNADE';
    return 'EHRLICH';
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

  private saveCurrentHistoryScroll(): void {
    this.navigationState.saveScroll();
  }

  private pushHistorySnapshot(scrollY?: number): void {
    this.navigationState.push(this.captureHistorySnapshot(), scrollY);
  }

  private replaceHistorySnapshot(): void {
    this.navigationState.replace(this.captureHistorySnapshot());
  }

  private restoreHistorySnapshot(snapshot: AppHistorySnapshot): void {
    this.clearReveal();
    this.closeAllModals(false);
    this.sazuService.activeTab.set(snapshot.tab);
    this.showSazuResult.set(Boolean(snapshot.showSazuResult && this.sazuService.userSazuResult()));
    this.showPartnerResult.set(
      Boolean(snapshot.showPartnerResult && this.sazuService.partnerResult()),
    );
    this.personalRevealStage.set(this.normalizeRevealStage(snapshot.personalStage));
    this.partnerRevealStage.set(this.normalizeRevealStage(snapshot.partnerStage));

    if (snapshot.modal === 'culture') {
      this.showCultureModal.set(true);
    } else if (snapshot.modal === 'legal:impressum') {
      this.activeLegalModal.set('impressum');
    } else if (snapshot.modal === 'legal:datenschutz') {
      this.activeLegalModal.set('datenschutz');
    } else if (snapshot.modal === 'story:personal' && this.sazuService.userSazuResult()) {
      this.storyModalType.set('personal');
    } else if (snapshot.modal === 'story:partner' && this.sazuService.partnerResult()) {
      this.storyModalType.set('partner');
    }

    this.restoreScrollPosition(snapshot.scrollY);
  }

  private normalizeRevealStage(stage: number): 1 | 2 | 3 | 4 {
    if (stage === 2 || stage === 3 || stage === 4) return stage;
    return 1;
  }

  private currentHistorySnapshot(): AppHistorySnapshot | null {
    return this.navigationState.current();
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
    this.closeAllModals(false);
  }

  private restoreScrollPosition(scrollY: number): void {
    this.navigationState.restoreScroll(scrollY);
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

  private closeAllModals(_restoreFocus = false): void {
    this.showCultureModal.set(false);
    this.activeLegalModal.set(null);
    this.storyModalType.set(null);
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
    const text = `${this.roastModeLabel(res.roastMode)} • ${res.dayMaster.deluluScore}% DELULU\nMeine Red Flag: ${res.viralCopy.redFlag}\n\nWas ich behaupte: ${res.viralCopy.claim}\nWas ich wirklich tue: ${res.viralCopy.actualBehavior}\n\n${res.viralCopy.shareCta}: https://sazu.usogi.org`;
    this.sazuService.shareResult(title, text);
  }

  sharePartner(): void {
    const res = this.sazuService.partnerResult();
    if (!res) return;
    const contextCopy = this.getPartnerContextCopy(res);
    const title = `${res.score}% Match, ${res.toxicScore}% Drama: ${res.person1.name} × ${res.person2.name}`;
    const text = `${this.roastModeLabel(res.roastMode)} • ${res.person1.name} × ${res.person2.name}\n${res.score}% MATCH • ${res.flirtScore}% ANZIEHUNG • ${res.toxicScore}% DRAMA\n\n${contextCopy.headline}\n${res.viralCopy.actualBehavior}\n\nBeweisstück: ${res.viralCopy.groupChatEvidence}\n\n${res.viralCopy.shareCta}: https://sazu.usogi.org`;
    this.sazuService.shareResult(title, text);
  }

  protected getPartnerContextCopy(res: CompatibilityResult): PartnerContextCopy {
    const kicker: Record<DatingContext, string> = {
      crush: 'CRUSH-RADAR',
      relationship: 'BEZIEHUNGS-TÜV',
      bestie: 'BESTIE-LOYALITÄTSTEST',
      ex: 'RÜCKFALL-RADAR',
    };
    const context = res.context ?? 'crush';
    return {
      kicker: kicker[context],
      headline: res.viralCopy.contextHeadline,
      verdict: res.viralCopy.contextVerdict,
      redFlagLabel: res.viralCopy.redFlagLabel,
      sharePrompt: res.viralCopy.sharePrompt,
      shareAnswer: res.viralCopy.shareAnswer,
    };
  }

  /** Creates the selected 1080 × 1920 card and hands it to Web Share or download. */
  async downloadStoryCard(): Promise<void> {
    if (this.storyModalType() === 'personal') {
      await this.downloadPersonalStoryCard();
    } else {
      await this.downloadPartnerStoryCard();
    }
  }

  async downloadPersonalStoryCard(): Promise<void> {
    const result = this.sazuService.userSazuResult();
    if (!result) return;
    this.isGeneratingStory.set(true);
    try {
      await this.storyCardService.createPersonal(result, this.storyVariant());
    } finally {
      this.isGeneratingStory.set(false);
    }
  }

  async downloadPartnerStoryCard(): Promise<void> {
    const result = this.sazuService.partnerResult();
    if (!result) return;
    this.isGeneratingStory.set(true);
    try {
      await this.storyCardService.createPartner(result, this.storyVariant());
    } finally {
      this.isGeneratingStory.set(false);
    }
  }
  getHourInfo() {
    const res = this.sazuService.userSazuResult();
    if (!res?.input.birthTime) return null;
    return this.sazuService.getHourPillarInfo(res.input.birthTime);
  }
}
