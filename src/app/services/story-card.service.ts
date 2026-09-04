import { Injectable, inject } from '@angular/core';
import { CompatibilityResult, RoastMode, UserSazuResult } from '../models/sazu.model';
import { SazuService } from './sazu.service';

export type StoryVariant = 'delulu' | 'redflag' | 'celebrity' | 'chemistry' | 'drama';

@Injectable({ providedIn: 'root' })
export class StoryCardService {
  private readonly sazuService = inject(SazuService);
  private readonly width = 1080;
  private readonly height = 1920;

  async createPersonal(result: UserSazuResult, variant: StoryVariant): Promise<void> {
    const { canvas, context } = this.createCanvas();
    if (!context) return;
    this.drawBackground(context);
    this.drawHeader(context, 'KOREAN DESTINY ROAST • 사주', result.roastMode);

    context.textAlign = 'left';
    context.fillStyle = '#fff';
    context.font = '850 46px system-ui, sans-serif';
    context.fillText(result.input.name.toUpperCase(), 78, 200);
    context.fillStyle = '#c6b7ae';
    context.font = '650 22px system-ui, sans-serif';
    context.fillText(
      `${result.dayMaster.polarity}-${result.dayMaster.element} • ${result.dayMaster.name}`,
      78,
      242,
    );

    const celebrity = result.celebrities[0]?.name || 'K-POP TWIN';
    const hero =
      variant === 'redflag'
        ? 'RED FLAG'
        : variant === 'celebrity'
          ? celebrity.toUpperCase()
          : `${result.dayMaster.deluluScore}%`;
    const heroLabel =
      variant === 'redflag'
        ? 'OFFIZIELL ENTLARVT'
        : variant === 'celebrity'
          ? 'CELEBRITY ENERGY MATCH'
          : 'DELULU';
    this.drawHero(context, hero, heroLabel);
    this.drawEvidenceBox(context, 565, 292, 'WAS DU SAGST', result.viralCopy.claim, false);
    this.drawEvidenceBox(
      context,
      887,
      326,
      'WAS DU WIRKLICH TUST',
      result.viralCopy.actualBehavior,
      true,
    );
    this.drawEvidenceBox(
      context,
      1243,
      244,
      'BEWEISSTÜCK AUS DEM GRUPPENCHAT',
      result.viralCopy.groupChatEvidence,
      false,
    );
    this.drawCta(context, result.viralCopy.shareCta);
    await this.export(
      canvas,
      `sazu-${variant}-${result.input.name}.png`,
      variant === 'redflag'
        ? `${result.input.name}s Red Flag wurde entlarvt`
        : `${result.dayMaster.deluluScore}% Delulu: ${result.input.name}s Destiny Roast`,
      `${this.modeLabel(result.roastMode)} • ${result.viralCopy.redFlag}`,
    );
  }

  async createPartner(result: CompatibilityResult, variant: StoryVariant): Promise<void> {
    const { canvas, context } = this.createCanvas();
    if (!context) return;
    this.drawBackground(context);
    this.drawHeader(context, 'KOREAN CHEMISTRY CHECK • 궁합', result.roastMode);

    context.textAlign = 'center';
    context.fillStyle = '#fff';
    context.font = '850 46px system-ui, sans-serif';
    this.drawWrapped(
      context,
      `${result.person1.name} × ${result.person2.name}`,
      540,
      205,
      900,
      56,
      2,
    );
    const hero = `${variant === 'drama' ? result.toxicScore : result.score}%`;
    this.drawHero(context, hero, variant === 'drama' ? 'DRAMA' : 'MATCH');
    this.drawEvidenceBox(
      context,
      565,
      292,
      'WAS IHR BEHAUPTET',
      result.viralCopy.claim,
      false,
    );
    this.drawEvidenceBox(
      context,
      887,
      326,
      'WAS IHR WIRKLICH TUT',
      result.viralCopy.actualBehavior,
      true,
    );
    this.drawEvidenceBox(
      context,
      1243,
      244,
      'BEWEISSTÜCK AUS DEM GRUPPENCHAT',
      result.viralCopy.groupChatEvidence,
      false,
    );
    this.drawCta(context, result.viralCopy.shareCta);
    await this.export(
      canvas,
      `sazu-${variant}-${result.person1.name}-${result.person2.name}.png`,
      `${variant === 'drama' ? result.toxicScore + '% Drama' : result.score + '% Match'}: ${result.person1.name} × ${result.person2.name}`,
      `${this.modeLabel(result.roastMode)} • ${result.viralCopy.groupChatEvidence}`,
    );
  }

  private createCanvas(): { canvas: HTMLCanvasElement; context: CanvasRenderingContext2D | null } {
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    return { canvas, context: canvas.getContext('2d') };
  }

  private drawBackground(context: CanvasRenderingContext2D): void {
    const background = context.createLinearGradient(0, 0, this.width, this.height);
    background.addColorStop(0, '#100d10');
    background.addColorStop(0.5, '#251016');
    background.addColorStop(1, '#09090c');
    context.fillStyle = background;
    context.fillRect(0, 0, this.width, this.height);

    const glow = context.createRadialGradient(900, 230, 0, 900, 230, 600);
    glow.addColorStop(0, 'rgba(196, 45, 63, 0.52)');
    glow.addColorStop(1, 'rgba(196, 45, 63, 0)');
    context.fillStyle = glow;
    context.fillRect(300, 0, 780, 840);
    context.strokeStyle = 'rgba(232, 196, 166, 0.34)';
    context.lineWidth = 2;
    context.strokeRect(48, 48, 984, 1824);
    context.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    context.strokeRect(62, 62, 956, 1796);
  }

  private drawHeader(context: CanvasRenderingContext2D, label: string, mode: RoastMode): void {
    context.textAlign = 'left';
    context.fillStyle = '#e4b8a2';
    context.font = '800 20px system-ui, sans-serif';
    context.fillText(label, 78, 112);
    context.textAlign = 'right';
    context.fillStyle = '#fff';
    context.fillText(`${this.modeLabel(mode)} • SAZU PALZA`, 1002, 112);
  }

  private drawHero(context: CanvasRenderingContext2D, value: string, label: string): void {
    context.textAlign = 'left';
    context.fillStyle = '#fff';
    context.font =
      value.length > 12 ? '900 72px system-ui, sans-serif' : '900 150px system-ui, sans-serif';
    this.drawWrapped(context, value, 72, 420, 936, value.length > 12 ? 82 : 160, 2);
    context.fillStyle = '#ff7782';
    context.font = '900 27px system-ui, sans-serif';
    context.fillText(label, 78, 505);
  }

  private drawEvidenceBox(
    context: CanvasRenderingContext2D,
    y: number,
    height: number,
    label: string,
    copy: string,
    danger: boolean,
  ): void {
    context.fillStyle = danger ? 'rgba(178, 42, 53, 0.3)' : 'rgba(255, 255, 255, 0.06)';
    context.beginPath();
    context.roundRect(72, y, 936, height, 28);
    context.fill();
    context.strokeStyle = danger ? 'rgba(239, 105, 117, 0.58)' : 'rgba(255, 255, 255, 0.12)';
    context.stroke();
    context.textAlign = 'left';
    context.fillStyle = danger ? '#ff7c86' : '#e4b8a2';
    context.font = '900 20px system-ui, sans-serif';
    context.fillText(label, 108, y + 54);
    context.fillStyle = '#fff';
    context.font = '700 35px system-ui, sans-serif';
    this.drawWrapped(
      context,
      copy,
      108,
      y + 116,
      850,
      47,
      Math.max(2, Math.floor((height - 112) / 47)),
    );
  }

  private drawCta(context: CanvasRenderingContext2D, copy: string): void {
    context.fillStyle = '#fff8f2';
    context.beginPath();
    context.roundRect(72, 1530, 936, 230, 26);
    context.fill();
    context.textAlign = 'center';
    context.fillStyle = '#201318';
    context.font = '900 30px system-ui, sans-serif';
    this.drawWrapped(context, copy.toUpperCase(), 540, 1600, 850, 38, 2);
    context.fillStyle = '#8c3640';
    context.font = '750 21px system-ui, sans-serif';
    context.fillText('Screenshot machen. Gruppenchat öffnen. Beweise einsammeln.', 540, 1705);
    context.fillStyle = '#fff';
    context.font = '800 27px system-ui, sans-serif';
    context.fillText('sazu.usogi.org', 540, 1826);
  }

  private drawWrapped(
    context: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
    maxLines: number,
  ): void {
    const words = text.trim().split(/\s+/);
    const lines: string[] = [];
    let line = '';
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      if (context.measureText(candidate).width <= maxWidth) {
        line = candidate;
      } else {
        if (line) lines.push(line);
        line = word;
      }
      if (lines.length === maxLines) break;
    }
    if (line && lines.length < maxLines) lines.push(line);
    if (lines.length === maxLines && words.join(' ') !== lines.join(' ')) {
      lines[maxLines - 1] = `${lines[maxLines - 1].replace(/[.,;:!?]?$/, '')}…`;
    }
    lines.forEach((current, index) => context.fillText(current, x, y + index * lineHeight));
  }

  private async export(
    canvas: HTMLCanvasElement,
    fileName: string,
    title: string,
    text: string,
  ): Promise<void> {
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!blob) return;
    const file = new File([blob], fileName, { type: 'image/png' });
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title, text });
        this.sazuService.showToast('Story-Bild geteilt.');
        return;
      } catch {
        // A dismissed share sheet falls back to a local, recoverable download.
      }
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    this.sazuService.showToast('Story-Bild erfolgreich heruntergeladen.');
  }

  private modeLabel(mode: RoastMode): string {
    if (mode === 'soft') return 'SANFT';
    if (mode === 'savage') return 'KEINE GNADE';
    return 'EHRLICH';
  }
}
