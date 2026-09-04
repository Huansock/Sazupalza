import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SazuService } from '../../services/sazu.service';
import { DatingContext, PartnerCheckInput, UserSazuInput } from '../../models/sazu.model';
import { DateSplitInputComponent } from '../date-split-input/date-split-input.component';

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

  // Form Validation errors
  protected readonly sazuFormError = signal<string | null>(null);
  protected readonly partnerFormError = signal<string | null>(null);

  constructor() {
    this.destroyRef.onDestroy(() => this.clearReveal());
  }

  openLegal(type: 'impressum' | 'datenschutz') {
    this.activeLegalModal.set(type);
  }

  closeLegal() {
    this.activeLegalModal.set(null);
  }

  openStoryModal(type: 'personal' | 'partner' = 'partner'): void {
    this.storyModalType.set(type);
  }

  closeStoryModal(): void {
    this.storyModalType.set(null);
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
    this.clearReveal();
    this.sazuService.activeTab.set(tab);
    this.scrollToTop();
  }

  resetSazu(): void {
    this.clearReveal();
    this.sazuService.resetSazu();
    this.scrollToTop();
  }

  resetPartner(): void {
    this.clearReveal();
    this.sazuService.resetPartner();
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

    this.sazuFormError.set(null);
    this.sazuService.calculateSazu(input);
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

    this.partnerFormError.set(null);
    this.sazuService.calculateCompatibility(input);
    this.triggerReveal('partner', 'partner-result');
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
    const title = `${res.score}% Match, ${res.toxicScore}% Drama: ${res.person1.name} × ${res.person2.name}`;
    const text = `${res.person1.name} × ${res.person2.name}\n${res.score}% MATCH • ${res.flirtScore}% ANZIEHUNG • ${res.toxicScore}% DRAMA\n\n${res.memeVerdict}\n\nZwei Geburtsdaten. Eine brutale Wahrheit: https://sazu.usogi.org`;
    this.sazuService.shareResult(title, text);
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
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 174px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(`${res.dayMaster.deluluScore}%`, 72, 438);
      ctx.fillStyle = '#ef6975';
      ctx.font = '900 28px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('DELULU', 78, 486);
      ctx.fillStyle = '#ad9d94';
      ctx.font = '700 18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('DAS URTEIL IST OFFIZIELL', 224, 485);

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
      this.renderWrappedText(
        ctx,
        `„${res.dayMaster.whatsAppSignature}“`,
        108,
        1292,
        850,
        42,
        'left',
        3,
      );

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
      ctx.fillText('WER KENNT MICH ZU GUT?', 540, 1667);
      ctx.fillStyle = '#8c3640';
      ctx.font = '700 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('Markiere die Freundin, die jetzt lachen muss.', 540, 1712);

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

        const fileName = `sazu-story-${res.input.name}.png`;
        const file = new File([blob], fileName, { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: `${res.dayMaster.deluluScore}% Delulu: ${res.input.name}s Destiny Roast`,
              text: `Meine Red Flag: ${res.dayMaster.toxicTrait}`,
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
      ctx.fillText('SOULMATES ODER NUR TOXISCHE CHEMIE?', 540, 246);

      ctx.fillStyle = '#ffffff';
      ctx.font = '900 178px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(`${res.score}%`, 540, 462);
      ctx.fillStyle = '#ef6975';
      ctx.font = '900 28px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('MATCH', 540, 512);

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
      ctx.fillText('DAS SCHONUNGSLOSE URTEIL', 108, 798);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'italic 38px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      this.renderWrappedText(ctx, res.memeVerdict, 108, 860, 850, 50, 'left', 4);

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
      ctx.fillText('EURE RED FLAG', 108, 1110);
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
      ctx.fillText('WÜRDET IHR ES TROTZDEM TUN?', 540, 1646);
      ctx.fillStyle = '#8c3640';
      ctx.font = '800 23px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('JA, LEIDER   /   NATÜRLICH', 540, 1696);
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

        const fileName = `sazu-story-${res.person1.name}-${res.person2.name}.png`;
        const file = new File([blob], fileName, { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: `${res.score}% Match, ${res.toxicScore}% Drama`,
              text: `${res.person1.name} × ${res.person2.name}: ${res.memeVerdict}`,
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
