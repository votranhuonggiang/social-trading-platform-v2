---
name: ProTrade Social
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#44474a'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#75777a'
  outline-variant: '#c5c6ca'
  surface-tint: '#5d5e61'
  primary: '#000101'
  on-primary: '#ffffff'
  primary-container: '#1a1c1e'
  on-primary-container: '#838486'
  inverse-primary: '#c6c6c9'
  secondary: '#006e1c'
  on-secondary: '#ffffff'
  secondary-container: '#91f78e'
  on-secondary-container: '#00731e'
  tertiary: '#000102'
  on-tertiary: '#ffffff'
  tertiary-container: '#001d36'
  on-tertiary-container: '#0088e2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e5'
  primary-fixed-dim: '#c6c6c9'
  on-primary-fixed: '#1a1c1e'
  on-primary-fixed-variant: '#454749'
  secondary-fixed: '#94f990'
  secondary-fixed-dim: '#78dc77'
  on-secondary-fixed: '#002204'
  on-secondary-fixed-variant: '#005313'
  tertiary-fixed: '#d1e4ff'
  tertiary-fixed-dim: '#9ecaff'
  on-tertiary-fixed: '#001d36'
  on-tertiary-fixed-variant: '#00497d'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  title-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
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
  container-margin: 24px
  gutter: 16px
---

## Brand & Style
This design system is engineered for high-stakes financial environments where clarity and community intersect. The brand personality is **Institutional yet Accessible**, blending the rigor of a professional trading terminal with the engagement patterns of a modern social network. 

The design style follows a **Corporate / Modern** aesthetic, prioritizing data density and legibility without feeling sterile. It utilizes a layered approach to information hierarchy, ensuring that critical trading signals are immediately distinguishable from social interactions. The emotional response should be one of confidence, precision, and transparency.

## Colors
The palette is anchored by **Deep Charcoal** (#1A1C1E) for primary text and structural elements, providing a grounded, professional feel. **Vibrant Success Green** (#4CAF50) is the signature action color, used for positive market movements and primary calls to action, symbolizing growth and execution. 

A range of **Soft Grays** is employed to manage information density:
- Use light grays for table row alternating backgrounds and borders to reduce visual noise.
- Use medium grays for secondary metadata and inactive states.
- The background remains a very light cool-gray to reduce eye strain during long trading sessions.

## Typography
This design system utilizes **Inter** for all UI elements due to its exceptional legibility in data-heavy contexts and its neutral, modern character. 

- **Data Tables:** Use `body-sm` for standard cell content. For numerical values, especially price and percentage changes, implement a medium weight to increase scannability.
- **Headlines:** Use tight letter spacing on larger headings to maintain a compact, professional look.
- **Labels:** Use `label-caps` for table headers and section overviews to create clear structural breaks.
- **Monospacing:** A secondary monospace font is reserved for ticker symbols and specific transaction IDs to ensure character alignment.

## Layout & Spacing
The layout follows a **Fixed Grid** model on desktop (12 columns) and transitions to a fluid single-column layout on mobile. 

- **Trading Dashboards:** Utilize a high-density spacing scale (4px/8px) to maximize the "above the fold" visibility of data.
- **Social Feed:** Implement wider margins (24px) and larger vertical spacing (32px) between posts to provide breathing room for long-form market analysis.
- **Table Density:** Row heights are set to a 48px minimum for standard views, with a "compact" toggle reducing them to 36px for power users.

## Elevation & Depth
Depth is communicated through **Tonal Layers** and **Ambient Shadows**. 

- **Level 0 (Background):** Solid off-white/gray surfaces.
- **Level 1 (Cards/Feed):** White surfaces with a very soft, diffused shadow (0px 4px 20px rgba(0,0,0,0.05)). This separates the social feed items from the background.
- **Level 2 (Dropdowns/Modals):** High-contrast separation with a more defined shadow to indicate temporary interaction layers.
- **Outlines:** Use 1px borders in a soft gray (#E2E8F0) for all input fields and table boundaries to maintain structure without the weight of heavy shadows.

## Shapes
The shape language is defined by **Rounded** corners, specifically in the 12-16px range for major containers.

- **Cards & Modals:** 16px radius (`rounded-xl`).
- **Buttons & Inputs:** 8px radius (`rounded-md`) to maintain a balance between "friendly" and "precise."
- **Tags/Chips:** Fully rounded (pill-shaped) to distinguish them from actionable buttons.
- **Charts:** Line graphs should use a subtle 2px corner smoothing on vertices to avoid a "jagged" look, reinforcing the modern aesthetic.

## Components

### Buttons
- **Primary:** Vibrant Green background with white text. High emphasis.
- **Secondary:** Deep Charcoal outline with charcoal text. Used for "Follow" or "View Profile."
- **Ghost:** No background, gray text. Used for secondary actions like "Share" or "Report."

### Cards (Feed & Strategy)
Social feed cards feature a header with user avatar, "Verified" or "Pro" badges, and a timestamp. Strategy cards must include a sparkline mini-chart, a "Copy Strategy" primary button, and a structured grid of stats (AUM, Risk Score, Return).

### Tables
Header rows utilize a light gray background with uppercase, bold labels. Rows include a subtle hover state (#F1F5F9). Positive numbers are always `#4CAF50`, negative numbers are `#F44336`.

### Input Fields
Clean, 1px bordered boxes with 12px horizontal padding. The active state uses a 2px Green border. Label text is placed above the field in `label-caps`.

### Social Interactions
Like, Comment, and Repost buttons are grouped at the bottom of feed items using icon+label combinations in a medium gray, turning primary charcoal on active/hover states.