import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  inject,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-bottom-sheet',
  template: `
    <div class="backdrop" (click)="onBackdropClick($event)">
      <div
        #sheet
        class="sheet"
        [class.legal-sheet]="sheetClass() === 'legal'"
        [class.story-sheet]="sheetClass() === 'story'"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="ariaLabel() || null"
        [attr.aria-labelledby]="labelledBy() || null"
        tabindex="-1"
      >
        <ng-content />
      </div>
    </div>
  `,
  styleUrl: './bottom-sheet.component.css',
})
export class BottomSheetComponent implements AfterViewInit, OnDestroy {
  readonly ariaLabel = input('');
  readonly labelledBy = input('');
  readonly sheetClass = input<'default' | 'legal' | 'story'>('default');
  readonly dismiss = output<void>();

  @ViewChild('sheet', { static: true }) private readonly sheetRef!: ElementRef<HTMLElement>;

  private readonly document = inject(DOCUMENT);
  private readonly trigger =
    this.document.activeElement instanceof HTMLElement ? this.document.activeElement : null;
  private readonly scrollY = typeof window === 'undefined' ? 0 : window.scrollY;
  private readonly originalBodyStyle = {
    position: this.document.body.style.position,
    top: this.document.body.style.top,
    left: this.document.body.style.left,
    right: this.document.body.style.right,
    width: this.document.body.style.width,
    overflow: this.document.body.style.overflow,
    touchAction: this.document.body.style.touchAction,
  };

  ngAfterViewInit(): void {
    const body = this.document.body;
    body.style.position = 'fixed';
    body.style.top = `-${this.scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    body.style.touchAction = 'none';

    queueMicrotask(() => {
      const initial = this.sheetRef.nativeElement.querySelector<HTMLElement>(
        '[data-modal-initial-focus]',
      );
      (initial ?? this.sheetRef.nativeElement).focus({ preventScroll: true });
    });
  }

  ngOnDestroy(): void {
    Object.assign(this.document.body.style, this.originalBodyStyle);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: this.scrollY, left: 0, behavior: 'auto' });
    }
    queueMicrotask(() => {
      if (this.trigger?.isConnected) this.trigger.focus({ preventScroll: true });
    });
  }

  protected onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.dismiss.emit();
  }

  @HostListener('window:keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.dismiss.emit();
      return;
    }
    if (event.key !== 'Tab') return;

    const sheet = this.sheetRef.nativeElement;
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
    if (event.shiftKey && this.document.activeElement === first) {
      event.preventDefault();
      last.focus({ preventScroll: true });
    } else if (!event.shiftKey && this.document.activeElement === last) {
      event.preventDefault();
      first.focus({ preventScroll: true });
    }
  }
}
