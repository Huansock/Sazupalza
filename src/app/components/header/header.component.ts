import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <header class="app-header">
      <!-- Hanok Wooden Rafter / Eaves Accent (서까래 / 처마 라인) -->
      <div class="hanok-rafters" aria-hidden="true">
        <span class="rafter"></span>
        <span class="rafter"></span>
        <span class="rafter"></span>
        <span class="rafter"></span>
        <span class="rafter"></span>
        <span class="rafter"></span>
        <span class="rafter"></span>
        <span class="rafter"></span>
        <span class="rafter"></span>
      </div>

      <div class="brand-container">
        <!-- Authentic Red Seal Stamp (낙관 인장) -->
        <div class="seal-brand-row">
          <div class="korean-seal" title="Traditionelles Namenssiegel">
            <span class="seal-char">四柱</span>
          </div>
          <div class="seal-text-group">
            <span class="kr-calligraphy">사주명리</span>
            <span class="pill-badge">Korean Destiny Check</span>
          </div>
        </div>

        <h1 class="logo-title">SAZU PALZA</h1>
        <p class="tagline">Geburtsdatum rein. Red Flag raus.</p>
      </div>

      <!-- Five Elements Hanja Bar (오행: 木 火 土 金 水) -->
      <div class="five-elements-strip">
        <span class="el-item"><strong class="el-hanja">木</strong> Holz</span>
        <span class="el-dot">•</span>
        <span class="el-item"><strong class="el-hanja">火</strong> Feuer</span>
        <span class="el-dot">•</span>
        <span class="el-item"><strong class="el-hanja">土</strong> Erde</span>
        <span class="el-dot">•</span>
        <span class="el-item"><strong class="el-hanja">金</strong> Metall</span>
        <span class="el-dot">•</span>
        <span class="el-item"><strong class="el-hanja">水</strong> Wasser</span>
      </div>

      <!-- Curved Hanok Eaves Bottom Silhouette (기와 처마 곡선) -->
      <div class="hanok-roof-curve" aria-hidden="true"></div>
    </header>
  `,
  styles: [
    `
      .app-header {
        background:
          radial-gradient(circle at 90% 10%, rgba(168, 50, 50, 0.28), transparent 32%), #1c1715;
        color: #faf6ee;
        padding: 14px 20px 16px;
        text-align: center;
        position: relative;
        overflow: hidden;
        border-bottom: 2px solid #8c6239;
      }

      /* Hanok Wooden Rafters (한옥 서까래 지붕 패턴) */
      .hanok-rafters {
        display: flex;
        justify-content: space-around;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 6px;
        background: #3a2b1e;
        opacity: 0.9;
      }

      .rafter {
        width: 14px;
        height: 6px;
        background: #8c6239;
        border-radius: 0 0 2px 2px;
      }

      .brand-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        margin-top: 4px;
      }

      .seal-brand-row {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(230, 223, 211, 0.18);
        border-radius: 999px;
        padding: 4px 14px 4px 6px;
      }

      /* Vermilion Cinnabar Seal (전통 붉은 낙관 도장) */
      .korean-seal {
        width: 28px;
        height: 28px;
        background: #a83232;
        border: 1px solid rgba(168, 50, 50, 0.5);
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
      }

      .seal-char {
        font-family: var(--font-kr);
        font-size: 13px;
        font-weight: 600;
        color: #ffffff;
        line-height: 1;
        letter-spacing: -0.5px;
      }

      .seal-text-group {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .kr-calligraphy {
        font-family: var(--font-kr);
        font-size: 14px;
        font-weight: 500;
        color: #faf6ee;
        letter-spacing: 0.5px;
      }

      .pill-badge {
        font-size: 12px;
        font-weight: 500;
        color: #c59b6d;
        letter-spacing: 0.4px;
      }

      .logo-title {
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 2.6px;
        margin: 4px 0 0;
        color: #faf6ee;
      }

      .tagline {
        font-size: 14px;
        color: #e6d8ca;
        font-weight: 600;
        margin: 0;
        line-height: 1.3;
      }

      /* Five Elements Hanja Strip (오행: 木 火 土 金 水) */
      .five-elements-strip {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin-top: 10px;
        font-size: 12px;
        color: #d6ccbe;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(230, 223, 211, 0.15);
        padding: 4px 12px;
        border-radius: 999px;
      }

      .el-item {
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }

      .el-hanja {
        font-family: var(--font-kr);
        font-size: 13px;
        color: #f5efe6;
      }

      .el-dot {
        color: #8a7f72;
        font-size: 10px;
      }

      /* Hanok Roof Curve silhouette at bottom */
      .hanok-roof-curve {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: #3a2b1e;
      }
    `,
  ],
})
export class HeaderComponent {}
