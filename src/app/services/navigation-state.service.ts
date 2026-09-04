import { Injectable } from '@angular/core';

export type AppModalState =
  'culture' | 'legal:impressum' | 'legal:datenschutz' | 'story:personal' | 'story:partner' | null;

export interface AppHistorySnapshot {
  tab: 'sazu' | 'partner';
  showSazuResult: boolean;
  showPartnerResult: boolean;
  personalStage: 1 | 2 | 3 | 4;
  partnerStage: 1 | 2 | 3 | 4;
  modal: AppModalState;
  scrollY: number;
}

const APP_HISTORY_KEY = '__sazuPalzaUi';

@Injectable({ providedIn: 'root' })
export class NavigationStateService {
  listen(restore: (snapshot: AppHistorySnapshot) => void): () => void {
    if (typeof window === 'undefined') return () => undefined;
    const listener = (event: PopStateEvent) => {
      const snapshot = this.read(event.state);
      if (snapshot) restore(snapshot);
    };
    window.addEventListener('popstate', listener);
    return () => window.removeEventListener('popstate', listener);
  }

  read(state: unknown): AppHistorySnapshot | null {
    if (!state || typeof state !== 'object') return null;
    const snapshot = (state as Record<string, unknown>)[APP_HISTORY_KEY];
    if (!snapshot || typeof snapshot !== 'object') return null;

    const candidate = snapshot as Partial<AppHistorySnapshot>;
    if (candidate.tab !== 'sazu' && candidate.tab !== 'partner') return null;
    return {
      ...(candidate as AppHistorySnapshot),
      personalStage: this.normalizeStage(candidate.personalStage),
      partnerStage: this.normalizeStage(candidate.partnerStage),
      scrollY: typeof candidate.scrollY === 'number' ? candidate.scrollY : 0,
    };
  }

  current(): AppHistorySnapshot | null {
    if (typeof window === 'undefined') return null;
    return this.read(window.history.state);
  }

  saveScroll(scrollY = typeof window === 'undefined' ? 0 : window.scrollY): void {
    if (typeof window === 'undefined') return;
    const snapshot = this.current();
    if (!snapshot) return;
    window.history.replaceState(
      { ...(window.history.state ?? {}), [APP_HISTORY_KEY]: { ...snapshot, scrollY } },
      '',
      window.location.href,
    );
  }

  push(snapshot: AppHistorySnapshot, scrollY?: number): void {
    if (typeof window === 'undefined') return;
    window.history.pushState(
      {
        ...(window.history.state ?? {}),
        [APP_HISTORY_KEY]: { ...snapshot, scrollY: scrollY ?? snapshot.scrollY },
      },
      '',
      window.location.href,
    );
  }

  replace(snapshot: AppHistorySnapshot): void {
    if (typeof window === 'undefined') return;
    window.history.replaceState(
      { ...(window.history.state ?? {}), [APP_HISTORY_KEY]: snapshot },
      '',
      window.location.href,
    );
  }

  restoreScroll(scrollY: number): void {
    if (typeof document === 'undefined' || typeof window === 'undefined') return;
    const previousBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({ top: Math.max(0, scrollY), left: 0, behavior: 'auto' });
    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = previousBehavior;
    });
  }

  private normalizeStage(stage?: number): 1 | 2 | 3 | 4 {
    if (stage === 2 || stage === 3 || stage === 4) return stage;
    return 1;
  }
}
