import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SazuService } from '../../services/sazu.service';
import { PartnerCheckInput, UserSazuInput } from '../../models/sazu.model';

@Component({
  selector: 'app-main-view',
  imports: [CommonModule, FormsModule],
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
  });

  protected readonly showCultureModal = signal<boolean>(false);
  protected readonly activeLegalModal = signal<'impressum' | 'datenschutz' | null>(null);

  // Form Validation errors
  protected readonly sazuFormError = signal<string | null>(null);
  protected readonly partnerFormError = signal<string | null>(null);

  openLegal(type: 'impressum' | 'datenschutz') {
    this.activeLegalModal.set(type);
  }

  closeLegal() {
    this.activeLegalModal.set(null);
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
      });
    } else if (type === 'clash') {
      // Byeong + Im (Clash 52%)
      this.partnerForm.set({
        person1Name: 'Felix',
        person1BirthDate: '1991-06-12', // Byeong day
        person2Name: 'Mia',
        person2BirthDate: '1993-01-08', // Im day
      });
    } else {
      // Sangsaeng Wood + Fire
      this.partnerForm.set({
        person1Name: 'Jonas',
        person1BirthDate: '1990-11-20',
        person2Name: 'Hannah',
        person2BirthDate: '1992-08-14',
      });
    }
    this.partnerFormError.set(null);
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
  }

  shareSazu(): void {
    const res = this.sazuService.userSazuResult();
    if (!res) return;
    const title = `${res.input.name}s Sazu: ${res.dayMaster.name} – ${res.dayMaster.title}`;
    const text = `🔮 Ich bin im koreanischen Sazu "${res.dayMaster.name}" (${res.dayMaster.elementEmoji} ${res.dayMaster.element})!\n✨ Deutsches Schutzgut: ${res.dayMaster.luckyItem}\n🇩🇪 Archetyp: ${res.dayMaster.germanArchetype}\n\n„${res.dayMaster.quote}“`;
    this.sazuService.shareResult(title, text);
  }

  sharePartner(): void {
    const res = this.sazuService.partnerResult();
    if (!res) return;
    const title = `Partner-Check: ${res.person1.name} & ${res.person2.name} (${res.score}%)`;
    const text = `💘 Unser Sazu Partner-Check: ${res.score}% Chemie!\n🌟 Status: ${res.badge}\n💬 Fazit: ${res.verdict}\n⚠️ Zündstoff: ${res.conflictTrigger}`;
    this.sazuService.shareResult(title, text);
  }

  getHourInfo() {
    const res = this.sazuService.userSazuResult();
    if (!res?.input.birthTime) return null;
    return this.sazuService.getHourPillarInfo(res.input.birthTime);
  }
}
