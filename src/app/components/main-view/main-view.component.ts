import { Component, computed, inject, signal } from '@angular/core';
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

  // Form Validation errors
  protected readonly sazuFormError = signal<string | null>(null);
  protected readonly partnerFormError = signal<string | null>(null);

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
    this.sazuService.activeTab.set(tab);
    this.scrollToTop();
  }

  resetSazu(): void {
    this.sazuService.resetSazu();
    this.scrollToTop();
  }

  resetPartner(): void {
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
    this.scrollToTop('sazu-result');
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
    this.scrollToTop('partner-result');
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
    const title = `${res.input.name}s Sazu: ${res.dayMaster.name} – ${res.dayMaster.title}`;
    const text = `Mein koreanisches Sazu: "${res.dayMaster.name}" (${res.dayMaster.elementEmoji} ${res.dayMaster.element})!\nK-Aura: ${res.auraStar.name} (${res.auraStar.emoji} ${res.auraStar.title})\nToxic Trait: ${res.dayMaster.toxicTrait}\nDelulu-Score: ${res.dayMaster.deluluScore}%\n\n„${res.dayMaster.whatsAppSignature}“\n\nMach den Test für dich: https://sazu.usogi.org`;
    this.sazuService.shareResult(title, text);
  }

  sharePartner(): void {
    const res = this.sazuService.partnerResult();
    if (!res) return;
    const title = `Partner-Check: ${res.person1.name} & ${res.person2.name} (${res.score}%)`;
    const text = `Sazu Partner-Check: ${res.person1.name} & ${res.person2.name} -> ${res.score}% Chemie!\nFlirt: ${res.flirtScore}%\nWG-Tauglichkeit: ${res.stabilityScore}%\nToxizitäts-Level: ${res.toxicScore}%\n\nFazit: ${res.memeVerdict}\n\nMach den Check: https://sazu.usogi.org`;
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

      // 1. Draw Deep Aesthetic Gradient Background
      const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1920);
      bgGrad.addColorStop(0, '#090d16');
      bgGrad.addColorStop(0.35, '#1e1b4b');
      bgGrad.addColorStop(0.7, '#111827');
      bgGrad.addColorStop(1, '#020617');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1080, 1920);

      // Radial Glow Accents
      const rad1 = ctx.createRadialGradient(540, 380, 50, 540, 380, 550);
      rad1.addColorStop(0, 'rgba(139, 92, 246, 0.28)');
      rad1.addColorStop(1, 'transparent');
      ctx.fillStyle = rad1;
      ctx.fillRect(0, 0, 1080, 1920);

      const rad2 = ctx.createRadialGradient(830, 1300, 50, 830, 1300, 500);
      rad2.addColorStop(0, 'rgba(244, 63, 94, 0.22)');
      rad2.addColorStop(1, 'transparent');
      ctx.fillStyle = rad2;
      ctx.fillRect(0, 0, 1080, 1920);

      // 2. Top Header Brand
      ctx.textAlign = 'center';
      ctx.fillStyle = '#f43f5e';
      ctx.font = 'bold 34px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('KOREANISCHES SAZU • 사주팔자', 540, 150);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '500 28px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('PERSÖNLICHE CHARAKTER-ANALYSE', 540, 205);

      // 3. Profile Card (Hanja Seal, Name, Day Master)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.beginPath();
      ctx.roundRect(80, 255, 920, 365, 32);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Hanja Seal Stamp Circle
      ctx.beginPath();
      ctx.arc(540, 345, 50, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(244, 63, 94, 0.2)';
      ctx.fill();
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(res.dayMaster.hanja, 540, 360);

      // Name
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 46px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(res.input.name, 540, 445);

      // Element & DayMaster
      ctx.font = 'bold 30px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#fca5a5';
      ctx.fillText(
        `${res.dayMaster.elementEmoji} ${res.dayMaster.polarity}-${res.dayMaster.element} • ${res.dayMaster.name}`,
        540,
        495,
      );

      // Tagline
      ctx.font = 'italic 25px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#cbd5e1';
      this.drawWrappedText(ctx, `„${res.dayMaster.tagline}“`, 540, 550, 840, 34, 'center');

      // 4. German Archetype & K-Aura Star Card
      ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.beginPath();
      ctx.roundRect(80, 645, 920, 320, 28);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('DEUTSCHER WESENS-ARCHETYP', 540, 695);

      ctx.font = 'bold 38px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(res.dayMaster.germanArchetype, 540, 745);

      // Divider line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.moveTo(140, 780);
      ctx.lineTo(940, 780);
      ctx.stroke();

      // K-Aura Star
      ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#c084fc';
      ctx.fillText(
        `K-AURA: ${res.auraStar.emoji} ${res.auraStar.name} (${res.auraStar.korean})`,
        540,
        830,
      );

      ctx.font = 'italic 25px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#e2e8f0';
      this.drawWrappedText(ctx, `„${res.auraStar.headline}“`, 540, 880, 840, 34, 'center');

      // 5. Delulu Meter Box
      ctx.fillStyle = 'rgba(99, 102, 241, 0.12)';
      ctx.beginPath();
      ctx.roundRect(80, 990, 920, 160, 24);
      ctx.fill();
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.font = 'bold 26px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#a5b4fc';
      ctx.fillText('DELULU-SCORE', 120, 1045);

      ctx.textAlign = 'right';
      ctx.font = '900 36px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`${res.dayMaster.deluluScore}%`, 960, 1048);

      // Progress bar background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.beginPath();
      ctx.roundRect(120, 1075, 840, 24, 12);
      ctx.fill();

      // Progress bar fill
      const deluluFillWidth = Math.max(24, Math.min(840, (840 * res.dayMaster.deluluScore) / 100));
      const deluluGrad = ctx.createLinearGradient(120, 0, 120 + deluluFillWidth, 0);
      deluluGrad.addColorStop(0, '#6366f1');
      deluluGrad.addColorStop(1, '#ec4899');
      ctx.fillStyle = deluluGrad;
      ctx.beginPath();
      ctx.roundRect(120, 1075, deluluFillWidth, 24, 12);
      ctx.fill();

      // 6. Toxic Trait Box
      ctx.fillStyle = 'rgba(244, 63, 94, 0.12)';
      ctx.beginPath();
      ctx.roundRect(80, 1175, 920, 220, 24);
      ctx.fill();
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#fb7185';
      ctx.fillText('🚩 GRÖSSTER TOXIC TRAIT:', 120, 1230);

      ctx.font = '500 25px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#f1f5f9';
      this.drawWrappedText(ctx, res.dayMaster.toxicTrait, 120, 1280, 840, 36, 'left');

      // 7. Status / WhatsApp Quote Box
      ctx.fillStyle = 'rgba(245, 158, 11, 0.12)';
      ctx.beginPath();
      ctx.roundRect(80, 1420, 920, 210, 24);
      ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#fbbf24';
      ctx.fillText('💬 STATUS / TYPISCHER SATZ:', 120, 1475);

      ctx.font = 'italic 26px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#f1f5f9';
      this.drawWrappedText(ctx, `„${res.dayMaster.whatsAppSignature}“`, 120, 1525, 840, 36, 'left');

      // 8. Watermark Footer
      ctx.textAlign = 'center';
      ctx.font = 'bold 32px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#f43f5e';
      ctx.fillText('sazu.usogi.org', 540, 1740);

      ctx.font = '24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('Finde dein persönliches Sazu auf sazu.usogi.org', 540, 1790);

      // 9. Export to File / Share
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
              title: `${res.input.name}s Sazu-Story`,
              text: `Mein Sazu: ${res.dayMaster.name} (${res.dayMaster.elementEmoji} ${res.dayMaster.polarity}-${res.dayMaster.element})! 🔮`,
            });
            this.sazuService.showToast('Story-Bild geteilt! 📸');
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

      // 1. Draw Deep Aesthetic Gradient Background
      const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1920);
      bgGrad.addColorStop(0, '#090d16');
      bgGrad.addColorStop(0.35, '#1e1b4b');
      bgGrad.addColorStop(0.7, '#111827');
      bgGrad.addColorStop(1, '#020617');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1080, 1920);

      // Radial Glow Accents
      const rad1 = ctx.createRadialGradient(250, 380, 50, 250, 380, 500);
      rad1.addColorStop(0, 'rgba(244, 63, 94, 0.28)');
      rad1.addColorStop(1, 'transparent');
      ctx.fillStyle = rad1;
      ctx.fillRect(0, 0, 1080, 1920);

      const rad2 = ctx.createRadialGradient(830, 1200, 50, 830, 1200, 500);
      rad2.addColorStop(0, 'rgba(99, 102, 241, 0.25)');
      rad2.addColorStop(1, 'transparent');
      ctx.fillStyle = rad2;
      ctx.fillRect(0, 0, 1080, 1920);

      // 2. Top Header Brand
      ctx.textAlign = 'center';
      ctx.fillStyle = '#f43f5e';
      ctx.font = 'bold 34px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('KOREANISCHES SAZU • GUNGHAP (궁합)', 540, 160);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '500 28px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('DATING- & CRUSH-RADAR', 540, 215);

      // 3. Names and Matchup Box
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.roundRect(80, 270, 920, 330, 32);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Person 1
      ctx.textAlign = 'center';
      ctx.font = 'bold 50px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(res.person1.name, 280, 420);
      ctx.font = 'bold 32px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#fca5a5';
      ctx.fillText(res.person1.dayMaster.name, 280, 475);
      ctx.font = '28px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(
        `${res.person1.dayMaster.elementEmoji} ${res.person1.dayMaster.element}`,
        280,
        525,
      );

      // Match Connector (結)
      ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#f43f5e';
      ctx.fillText('結', 540, 465);

      // Person 2
      ctx.font = 'bold 50px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(res.person2.name, 800, 420);
      ctx.font = 'bold 32px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#fca5a5';
      ctx.fillText(res.person2.dayMaster.name, 800, 475);
      ctx.font = '28px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(
        `${res.person2.dayMaster.elementEmoji} ${res.person2.dayMaster.element}`,
        800,
        525,
      );

      // 4. Big Chemistry Score Circle
      ctx.beginPath();
      ctx.arc(540, 770, 130, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.fill();
      ctx.lineWidth = 8;
      ctx.strokeStyle = res.score >= 85 ? '#10b981' : res.score >= 65 ? '#f59e0b' : '#f43f5e';
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = '900 86px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(`${res.score}%`, 540, 790);

      ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = res.score >= 85 ? '#6ee7b7' : res.score >= 65 ? '#fcd34d' : '#fda4af';
      ctx.fillText('CHEMIE-SCORE', 540, 840);

      // Badge & Verdict
      ctx.font = 'bold 38px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(res.badge, 540, 950);

      ctx.font = 'italic 28px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#e2e8f0';
      this.drawWrappedText(ctx, `„${res.verdict}“`, 540, 1005, 880, 40, 'center');

      // 4.5 Clean Spicy Pills
      ctx.textAlign = 'center';
      ctx.font = 'bold 26px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#fca5a5';
      ctx.fillText(
        `Flirt: ${res.flirtScore}%   •   WG: ${res.stabilityScore}%   •   Toxic: ${res.toxicScore}%`,
        540,
        1100,
      );

      // 5. Green Flag & Red Flag Box
      // Green Flag
      ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.beginPath();
      ctx.roundRect(80, 1145, 920, 185, 24);
      ctx.fill();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.font = 'bold 30px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#34d399';
      ctx.fillText('GREEN FLAG:', 120, 1195);
      ctx.font = '500 26px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#f1f5f9';
      this.drawWrappedText(ctx, res.greenFlag, 120, 1240, 840, 38, 'left');

      // Red Flag
      ctx.fillStyle = 'rgba(244, 63, 94, 0.15)';
      ctx.beginPath();
      ctx.roundRect(80, 1355, 920, 185, 24);
      ctx.fill();
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.font = 'bold 30px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#fb7185';
      ctx.fillText('RED FLAG TRIGGER:', 120, 1405);
      ctx.font = '500 26px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#f1f5f9';
      this.drawWrappedText(ctx, res.redFlag, 120, 1450, 840, 38, 'left');

      // Meme Verdict Callout
      ctx.textAlign = 'center';
      ctx.font = 'bold italic 26px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#fda4af';
      this.drawWrappedText(ctx, res.memeVerdict, 540, 1595, 880, 36, 'center');

      // 6. Watermark Footer
      ctx.textAlign = 'center';
      ctx.font = 'bold 32px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#f43f5e';
      ctx.fillText('sazu.usogi.org', 540, 1740);

      ctx.font = '24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('Mach den Test für dich & deinen Crush auf sazu.usogi.org', 540, 1790);

      // 7. Export to File / Share
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
              title: 'Unser Sazu Partner-Check',
              text: `Unser Sazu Chemie-Score: ${res.score}%! 💘`,
            });
            this.sazuService.showToast('Story-Bild geteilt! 📸');
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

  private drawWrappedText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
    align: CanvasTextAlign = 'center',
  ): void {
    ctx.textAlign = align;
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, currentY);
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
    this.sazuService.showToast('Story-Bild erfolgreich heruntergeladen! 📸');
  }

  getHourInfo() {
    const res = this.sazuService.userSazuResult();
    if (!res?.input.birthTime) return null;
    return this.sazuService.getHourPillarInfo(res.input.birthTime);
  }
}
