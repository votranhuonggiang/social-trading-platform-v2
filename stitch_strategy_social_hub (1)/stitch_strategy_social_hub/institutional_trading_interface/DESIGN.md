---
name: Institutional Trading Interface
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#45464c'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#575e70'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#141b2b'
  on-primary-container: '#7d8497'
  inverse-primary: '#c0c6db'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#410004'
  on-tertiary-container: '#ef4444'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce2f7'
  primary-fixed-dim: '#c0c6db'
  on-primary-fixed: '#141b2b'
  on-primary-fixed-variant: '#404758'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ad'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#930013'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
  mono-data:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 12px
  margin: 20px
---

## Brand & Style
This design system is engineered for high-performance financial environments where data density and clarity are paramount. The aesthetic is **Corporate / Modern**, prioritizing utility over decoration. It targets professional traders and institutional analysts who require a "cockpit" experience—everything must be accessible, legible, and logically organized.

The emotional response should be one of absolute reliability and precision. By utilizing a light-themed workspace with a dark, commanding header, the UI establishes a clear hierarchy of control versus workspace. The use of subtle grays prevents eye strain during long trading sessions, while vibrant functional colors (Emerald and Bold Red) provide immediate cognitive signals for market movement and risk.

## Colors
The palette is rooted in a "Terminal Light" philosophy. The primary background uses a very soft gray to reduce glare, while the primary workspace containers are pure white. 

*   **Primary (#111827):** A deep, near-black blue used for headers, primary navigation, and high-emphasis text to provide a solid structural anchor.
*   **Success (#10B981):** A sharp Emerald Green used exclusively for positive price action, completed statuses, and "buy" signals.
*   **Danger (#EF4444):** A bold, high-visibility Red for negative price action, alerts, and "sell" signals.
*   **Neutral/Borders:** Multiple tiers of cool grays define the structure without creating visual noise. Borders are kept light to maintain a clean, grid-like appearance.

## Typography
We utilize **Inter** for its exceptional legibility in small sizes and high-density environments. The scale is intentionally tight to maximize information density. 

For numerical values and ticker data, a secondary monospaced font (JetBrains Mono) is recommended to ensure columns of figures align perfectly, allowing for easier vertical scanning of prices and volumes. "Body-sm" and "Label-sm" are the workhorses of the system, used for metadata, table cells, and secondary information.

## Layout & Spacing
The system uses a **Fluid Grid** approach with a modular 4px base unit. In an institutional context, "white space" is treated as a functional separator rather than a stylistic luxury.

*   **Dashboards:** Utilize a 12-column grid with narrow 12px gutters to pack more data into a single viewport.
*   **Sidebars:** Fixed at 240px for navigation or 320px for detailed "Inspector" panels.
*   **Data Tables:** Use "Condensed" row heights (32px to 40px) to allow for 20+ rows of data without scrolling.
*   **Responsiveness:** On smaller screens, data-heavy tables transition to horizontal scrolling containers rather than stacking, to preserve the structural integrity of the financial data.

## Elevation & Depth
This system avoids heavy shadows to maintain a clean, professional "paper-like" feel. Instead, it relies on **Tonal Layers** and **Low-contrast outlines**.

1.  **Level 0 (Background):** Subtle gray (`#F3F4F6`).
2.  **Level 1 (Card/Container):** Pure white with a 1px solid border (`#E5E7EB`).
3.  **Level 2 (Active/Hover):** A very soft ambient shadow (4px blur, 2% opacity) is used only for interactive elements like dropdowns or active cards to suggest "lift."
4.  **Level 3 (Modals):** A distinct 1px border and a medium shadow (12px blur, 8% opacity) to separate the overlay from the workspace.

## Shapes
A consistent **8px (rounded-md)** corner radius is used for all primary containers, buttons, and input fields. This softens the "industrial" feel of the high-density data without appearing overly consumer-oriented or playful. Small status chips and badges use a more aggressive **16px (rounded-full)** radius to differentiate them from functional inputs.