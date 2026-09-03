import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <header class="app-header">
      <div class="brand-container">
        <div class="brand-tag">
          <span class="kr-text">사주팔자</span>
          <span class="pill">K-Horoskop</span>
        </div>
        <h1 class="logo-title">SAZU PALZA</h1>
        <p class="tagline">Traditionelle koreanische Schicksalsanalyse auf Deutsch</p>
      </div>
      <div class="header-decor">
        <span class="element-icon">🌲</span>
        <span class="element-icon">🔥</span>
        <span class="element-icon">⛰️</span>
        <span class="element-icon">⚔️</span>
        <span class="element-icon">🌊</span>
      </div>
    </header>
  `,
  styles: [
    `
      .app-header {
        background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        color: #ffffff;
        padding: 24px 20px 18px;
        text-align: center;
        position: relative;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      .brand-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
      }
      .brand-tag {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 999px;
        padding: 3px 10px;
      }
      .kr-text {
        font-family: var(--font-kr, serif);
        font-weight: 700;
        font-size: 13px;
        color: #f87171;
        letter-spacing: 1px;
      }
      .pill {
        font-size: 11px;
        font-weight: 600;
        color: #cbd5e1;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .logo-title {
        font-size: 26px;
        font-weight: 800;
        letter-spacing: 1.5px;
        margin: 4px 0 0;
        background: linear-gradient(135deg, #ffffff 30%, #fca5a5 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .tagline {
        font-size: 12px;
        color: #94a3b8;
        font-weight: 500;
        margin: 0;
        line-height: 1.4;
      }
      .header-decor {
        display: flex;
        justify-content: center;
        gap: 12px;
        margin-top: 14px;
        font-size: 14px;
        opacity: 0.85;
        background: rgba(0, 0, 0, 0.2);
        padding: 6px 14px;
        border-radius: 999px;
        display: inline-flex;
      }
    `,
  ],
})
export class HeaderComponent {}
