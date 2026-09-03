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
        padding: 26px 20px 20px;
        text-align: center;
        position: relative;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      .brand-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }
      .brand-tag {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 999px;
        padding: 5px 14px;
      }
      .kr-text {
        font-family: var(--font-kr, serif);
        font-weight: 700;
        font-size: 16px;
        color: #f87171;
        letter-spacing: 1px;
      }
      .pill {
        font-size: 14px;
        font-weight: 600;
        color: #cbd5e1;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .logo-title {
        font-size: 30px;
        font-weight: 800;
        letter-spacing: 1.5px;
        margin: 4px 0 0;
        background: linear-gradient(135deg, #ffffff 30%, #fca5a5 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .tagline {
        font-size: 16px;
        color: #94a3b8;
        font-weight: 500;
        margin: 0;
        line-height: 1.4;
      }
      .header-decor {
        display: inline-flex;
        justify-content: center;
        gap: 14px;
        margin-top: 16px;
        font-size: 18px;
        opacity: 0.9;
        background: rgba(0, 0, 0, 0.25);
        padding: 8px 18px;
        border-radius: 999px;
      }
    `,
  ],
})
export class HeaderComponent {}
