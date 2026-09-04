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

      // 1. Deep Giwa Dusk Slate Canvas Background (Inspired by Hanok evening photo)
      ctx.fillStyle = '#181b22';
      ctx.fillRect(0, 0, 1080, 1920);

      // Subtle Traditional Rafter/Roofline motif at top (서까래/처마)
      ctx.strokeStyle = 'rgba(214, 180, 140, 0.25)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(80, 52);
      ctx.lineTo(1000, 52);
      ctx.stroke();

      for (let rx = 140; rx <= 940; rx += 80) {
        ctx.beginPath();
        ctx.moveTo(rx, 36);
        ctx.lineTo(rx, 52);
        ctx.stroke();
      }

      // 2. Central Hanok Pavilion Card (Warm Hanji Paper with Natural Timber Frame)
      const px = 60;
      const py = 70;
      const pw = 960;
      const ph = 1780;

      ctx.fillStyle = '#faf6ee';
      ctx.beginPath();
      ctx.roundRect(px, py, pw, ph, 24);
      ctx.fill();

      // Natural timber wood architectural frame (4px)
      ctx.strokeStyle = '#c59b6d';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Delicate inner hairline accent (1.5px)
      ctx.strokeStyle = '#e8decb';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(px + 12, py + 12, pw - 24, ph - 24, 18);
      ctx.stroke();

      // 3. Top Header: Refined Editorial
      ctx.textAlign = 'center';
      ctx.fillStyle = '#8c673d';
      ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('KOREANISCHES SAZU • 사주', 540, 140);

      ctx.fillStyle = '#1f1d1a';
      ctx.font = '600 32px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('WESENS-ARCHETYP & CHARAKTER', 540, 185);

      // Hairline Divider
      ctx.strokeStyle = '#e6ddd0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(120, 220);
      ctx.lineTo(960, 220);
      ctx.stroke();

      // 4. Person Profile Section (Card Box)
      const profX = 110;
      const profY = 245;
      const profW = 860;
      const profH = 135;

      ctx.fillStyle = '#f5efe5';
      ctx.beginPath();
      ctx.roundRect(profX, profY, profW, profH, 16);
      ctx.fill();
      ctx.strokeStyle = '#e4d9c7';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Traditional Vermilion Seal Stamp (낙관 / 인장)
      const sealX = profX + 24;
      const sealY = profY + 18;
      const sealSize = 100;
      ctx.fillStyle = '#a83232';
      ctx.beginPath();
      ctx.roundRect(sealX, sealY, sealSize, sealSize, 12);
      ctx.fill();

      // Seal Hanja inside
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 56px "Apple SD Gothic Neo", "Nanum Myeongjo", serif';
      ctx.fillText(res.dayMaster.hanja, sealX + sealSize / 2, sealY + 70);

      // Name & Day Master Info
      ctx.textAlign = 'left';
      ctx.fillStyle = '#1f1d1a';
      ctx.font = '600 42px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(res.input.name, profX + 145, profY + 60);

      ctx.fillStyle = '#8c673d';
      ctx.font = '500 24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(
        `${res.dayMaster.polarity}-${res.dayMaster.element} • ${res.dayMaster.name}`,
        profX + 145,
        profY + 102,
      );

      // 5. Card 1: Hero German Archetype & Relatable Punchline
      const archX = 110;
      const archY = 405;
      const archW = 860;
      const archH = 265;

      ctx.fillStyle = '#f7f1e7';
      ctx.beginPath();
      ctx.roundRect(archX, archY, archW, archH, 16);
      ctx.fill();
      ctx.strokeStyle = '#e8decb';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#8c673d';
      ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('DEUTSCHER WESENS-ARCHETYP', archX + 30, archY + 45);

      ctx.fillStyle = '#1f1d1a';
      ctx.font = '600 44px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      this.renderWrappedText(
        ctx,
        res.dayMaster.germanArchetype,
        archX + 30,
        archY + 100,
        800,
        54,
        'left',
        2,
      );

      ctx.fillStyle = '#574f46';
      ctx.font = 'italic 26px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      this.renderWrappedText(
        ctx,
        `„${res.dayMaster.whatsAppSignature}“`,
        archX + 30,
        archY + 225,
        800,
        36,
        'left',
        1,
      );

      // 6. Card 2: Delulu-Meter
      const delX = 110;
      const delY = 695;
      const delW = 860;
      const delH = 135;

      ctx.fillStyle = '#faf6ee';
      ctx.beginPath();
      ctx.roundRect(delX, delY, delW, delH, 16);
      ctx.fill();
      ctx.strokeStyle = '#e4d9c7';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#574f46';
      ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('DELULU-SCORE', delX + 30, delY + 46);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#1f1d1a';
      ctx.font = '600 28px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(`${res.dayMaster.deluluScore}%`, delX + delW - 30, delY + 46);

      // Delulu minimal bar
      ctx.textAlign = 'left';
      ctx.fillStyle = '#e8e0d2';
      ctx.beginPath();
      ctx.roundRect(delX + 30, delY + 72, 800, 22, 11);
      ctx.fill();

      ctx.fillStyle = '#c59b6d';
      const deluluW = Math.max(22, Math.min(800, (800 * res.dayMaster.deluluScore) / 100));
      ctx.beginPath();
      ctx.roundRect(delX + 30, delY + 72, deluluW, 22, 11);
      ctx.fill();

      // 7. Card 3: Toxic Trait / Roast
      const toxX = 110;
      const toxY = 855;
      const toxW = 860;
      const toxH = 265;

      ctx.fillStyle = 'rgba(168, 50, 50, 0.05)';
      ctx.beginPath();
      ctx.roundRect(toxX, toxY, toxW, toxH, 16);
      ctx.fill();
      ctx.strokeStyle = 'rgba(168, 50, 50, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#a83232';
      ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('CHARAKTER-SCHATTEN (TOXIC TRAIT)', toxX + 30, toxY + 46);

      ctx.fillStyle = '#2c2523';
      ctx.font = '400 30px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      this.renderWrappedText(
        ctx,
        res.dayMaster.toxicTrait,
        toxX + 30,
        toxY + 98,
        800,
        42,
        'left',
        4,
      );

      // 8. Card 4: Celebrity Twin / Soulmate
      const soulX = 110;
      const soulY = 1145;
      const soulW = 860;
      const soulH = 175;

      ctx.fillStyle = '#f5efe5';
      ctx.beginPath();
      ctx.roundRect(soulX, soulY, soulW, soulH, 16);
      ctx.fill();
      ctx.strokeStyle = '#e4d9c7';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#8c673d';
      ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('K-POP & PROMI SEELENVERWANDTE', soulX + 30, soulY + 46);

      const celebText =
        res.celebrities && res.celebrities.length > 0
          ? res.celebrities
              .slice(0, 3)
              .map((c) => `${c.name} (${c.groupOrRole})`)
              .join(' • ')
          : 'Day Master Resonanz';

      ctx.fillStyle = '#1f1d1a';
      ctx.font = '600 28px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      this.renderWrappedText(ctx, celebText, soulX + 30, soulY + 94, 800, 38, 'left', 2);

      // 9. Card 5: Social Interaction / Sticker Call-to-Action
      const ctaX = 110;
      const ctaY = 1345;
      const ctaW = 860;
      const ctaH = 155;

      ctx.fillStyle = '#f9f4ea';
      ctx.beginPath();
      ctx.roundRect(ctaX, ctaY, ctaW, ctaH, 16);
      ctx.fill();
      ctx.strokeStyle = '#c59b6d';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillStyle = '#1f1d1a';
      ctx.font = '600 34px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('Stimmt das zu 100%? 👇', 540, ctaY + 65);

      ctx.fillStyle = '#8c673d';
      ctx.font = 'italic 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('(Platziere hier deinen Umfrage- oder Fragen-Sticker)', 540, ctaY + 112);

      // 10. Architectural Hanok Footer
      ctx.textAlign = 'center';
      ctx.strokeStyle = '#d6c8b4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(460, 1660);
      ctx.lineTo(620, 1660);
      ctx.stroke();

      ctx.fillStyle = '#8c673d';
      ctx.font = '600 26px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('sazu.usogi.org', 540, 1705);

      ctx.fillStyle = '#78716a';
      ctx.font = '400 18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('Koreanische Schicksalsanalyse • Teste deinen Archetyp', 540, 1740);

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
              title: `${res.input.name}s Sazu-Story`,
              text: `Mein Sazu: ${res.dayMaster.name} (${res.dayMaster.polarity}-${res.dayMaster.element})`,
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

      // 1. Deep Giwa Dusk Slate Canvas Background (Inspired by Hanok evening photo)
      ctx.fillStyle = '#181b22';
      ctx.fillRect(0, 0, 1080, 1920);

      // Subtle Traditional Rafter/Roofline motif at top
      ctx.strokeStyle = 'rgba(214, 180, 140, 0.25)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(80, 52);
      ctx.lineTo(1000, 52);
      ctx.stroke();

      for (let rx = 140; rx <= 940; rx += 80) {
        ctx.beginPath();
        ctx.moveTo(rx, 36);
        ctx.lineTo(rx, 52);
        ctx.stroke();
      }

      // 2. Central Hanok Pavilion Card (Warm Hanji Paper with Natural Timber Frame)
      const px = 60;
      const py = 70;
      const pw = 960;
      const ph = 1780;

      ctx.fillStyle = '#faf6ee';
      ctx.beginPath();
      ctx.roundRect(px, py, pw, ph, 24);
      ctx.fill();

      // Natural timber wood architectural frame (4px)
      ctx.strokeStyle = '#c59b6d';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Delicate inner hairline accent (1.5px)
      ctx.strokeStyle = '#e8decb';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(px + 12, py + 12, pw - 24, ph - 24, 18);
      ctx.stroke();

      // 3. Top Header: Modern Hanok Editorial
      ctx.textAlign = 'center';
      ctx.fillStyle = '#8c673d';
      ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('KOREANISCHES GUNGHAP • 궁합', 540, 140);

      ctx.fillStyle = '#1f1d1a';
      ctx.font = '600 32px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('DATING- & CRUSH-RADAR', 540, 185);

      // Hairline Divider
      ctx.strokeStyle = '#e6ddd0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(120, 220);
      ctx.lineTo(960, 220);
      ctx.stroke();

      // 4. Duo Matchup Box
      const duoX = 110;
      const duoY = 245;
      const duoW = 860;
      const duoH = 145;

      ctx.fillStyle = '#f5efe5';
      ctx.beginPath();
      ctx.roundRect(duoX, duoY, duoW, duoH, 16);
      ctx.fill();
      ctx.strokeStyle = '#e4d9c7';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Person 1
      ctx.textAlign = 'center';
      ctx.fillStyle = '#1f1d1a';
      ctx.font = '600 40px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(res.person1.name, 280, duoY + 60);

      ctx.fillStyle = '#8c673d';
      ctx.font = '500 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(res.person1.dayMaster.name, 280, duoY + 105);

      // Vermilion Bond Seal Stamp (結)
      const knotX = 495;
      const knotY = duoY + 28;
      const knotSize = 90;
      ctx.fillStyle = '#a83232';
      ctx.beginPath();
      ctx.roundRect(knotX, knotY, knotSize, knotSize, 12);
      ctx.fill();

      ctx.textAlign = 'center';
      ctx.font = '700 52px "Apple SD Gothic Neo", "Nanum Myeongjo", serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('結', knotX + knotSize / 2, knotY + 64);

      // Person 2
      ctx.textAlign = 'center';
      ctx.fillStyle = '#1f1d1a';
      ctx.font = '600 40px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(res.person2.name, 800, duoY + 60);

      ctx.fillStyle = '#8c673d';
      ctx.font = '500 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(res.person2.dayMaster.name, 800, duoY + 105);

      // 5. Chemistry Hero Box (Score Ring + Badge + Verdict)
      const chemX = 110;
      const chemY = 415;
      const chemW = 860;
      const chemH = 345;

      ctx.fillStyle = '#faf6ee';
      ctx.beginPath();
      ctx.roundRect(chemX, chemY, chemW, chemH, 16);
      ctx.fill();
      ctx.strokeStyle = '#e8decb';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Chemistry Score Ring
      ctx.beginPath();
      ctx.arc(540, chemY + 95, 68, 0, 2 * Math.PI);
      ctx.fillStyle = '#f5ede0';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#c59b6d';
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillStyle = '#1f1d1a';
      ctx.font = '700 54px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(`${res.score}%`, 540, chemY + 114);

      ctx.font = '600 18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#8c673d';
      ctx.fillText('CHEMIE-SCORE', 540, chemY + 195);

      // Badge & Verdict
      ctx.font = '600 32px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#a83232';
      ctx.fillText(res.badge, 540, chemY + 242);

      ctx.font = 'italic 24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#3d3832';
      this.renderWrappedText(ctx, `„${res.verdict}“`, 540, chemY + 288, 800, 34, 'center', 2);

      // 6. Spicy Score Pills
      const pillY = 785;
      const pillW = 265;
      const pillH = 75;
      const pillGap = 32;

      const pills = [
        { label: `Flirt: ${res.flirtScore}%`, x: 110 },
        { label: `WG: ${res.stabilityScore}%`, x: 110 + pillW + pillGap },
        { label: `Toxic: ${res.toxicScore}%`, x: 110 + (pillW + pillGap) * 2 },
      ];

      for (const p of pills) {
        ctx.fillStyle = '#f5efe5';
        ctx.beginPath();
        ctx.roundRect(p.x, pillY, pillW, pillH, 14);
        ctx.fill();
        ctx.strokeStyle = '#e4d9c7';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.fillStyle = '#1f1d1a';
        ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText(p.label, p.x + pillW / 2, pillY + 46);
      }

      // 7. Green Flag Box
      const gfX = 110;
      const gfY = 885;
      const gfW = 860;
      const gfH = 205;

      ctx.fillStyle = 'rgba(62, 107, 78, 0.06)';
      ctx.beginPath();
      ctx.roundRect(gfX, gfY, gfW, gfH, 16);
      ctx.fill();
      ctx.strokeStyle = 'rgba(62, 107, 78, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.fillStyle = '#2e694a';
      ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('GREEN FLAG', gfX + 30, gfY + 44);

      ctx.fillStyle = '#1e2821';
      ctx.font = '400 28px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      this.renderWrappedText(ctx, res.greenFlag, gfX + 30, gfY + 92, 800, 38, 'left', 3);

      // 8. Red Flag Trigger Box
      const rfX = 110;
      const rfY = 1115;
      const rfW = 860;
      const rfH = 205;

      ctx.fillStyle = 'rgba(168, 50, 50, 0.06)';
      ctx.beginPath();
      ctx.roundRect(rfX, rfY, rfW, rfH, 16);
      ctx.fill();
      ctx.strokeStyle = 'rgba(168, 50, 50, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#a83232';
      ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('RED FLAG TRIGGER', rfX + 30, rfY + 44);

      ctx.fillStyle = '#2c2523';
      ctx.font = '400 28px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      this.renderWrappedText(ctx, res.redFlag, rfX + 30, rfY + 92, 800, 38, 'left', 3);

      // 9. Social Interaction / Sticker Prompt
      const ctaX = 110;
      const ctaY = 1345;
      const ctaW = 860;
      const ctaH = 155;

      ctx.fillStyle = '#f9f4ea';
      ctx.beginPath();
      ctx.roundRect(ctaX, ctaY, ctaW, ctaH, 16);
      ctx.fill();
      ctx.strokeStyle = '#c59b6d';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillStyle = '#1f1d1a';
      ctx.font = '600 34px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('Passt das zu uns? 👇', 540, ctaY + 65);

      ctx.fillStyle = '#8c673d';
      ctx.font = 'italic 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('(Markiere Partner / Crush & stimme ab)', 540, ctaY + 112);

      // 10. Architectural Hanok Footer
      ctx.textAlign = 'center';
      ctx.strokeStyle = '#d6c8b4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(460, 1660);
      ctx.lineTo(620, 1660);
      ctx.stroke();

      ctx.fillStyle = '#8c673d';
      ctx.font = '600 26px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('sazu.usogi.org', 540, 1705);

      ctx.fillStyle = '#78716a';
      ctx.font = '400 18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('Koreanisches Gunghap • Dating & Crush Check', 540, 1740);

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
              title: 'Unser Sazu Partner-Check',
              text: `Unser Sazu Chemie-Score: ${res.score}%`,
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
