---
name: Professional Fintech Interface
colors:
  surface: '#f8f9fb'
  surface-dim: '#d9dadc'
  surface-bright: '#f8f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f6'
  surface-container: '#edeef0'
  surface-container-high: '#e7e8ea'
  surface-container-highest: '#e1e2e4'
  on-surface: '#191c1e'
  on-surface-variant: '#424754'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f3'
  outline: '#727785'
  outline-variant: '#c2c6d6'
  surface-tint: '#005ac2'
  primary: '#0058be'
  on-primary: '#ffffff'
  primary-container: '#2170e4'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#006e2f'
  on-secondary: '#ffffff'
  secondary-container: '#6bff8f'
  on-secondary-container: '#007432'
  tertiary: '#555c6e'
  on-tertiary: '#ffffff'
  tertiary-container: '#6e7487'
  on-tertiary-container: '#fefcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#6bff8f'
  secondary-fixed-dim: '#4ae176'
  on-secondary-fixed: '#002109'
  on-secondary-fixed-variant: '#005321'
  tertiary-fixed: '#dce2f7'
  tertiary-fixed-dim: '#c0c6db'
  on-tertiary-fixed: '#141b2b'
  on-tertiary-fixed-variant: '#404758'
  background: '#f8f9fb'
  on-background: '#191c1e'
  surface-variant: '#e1e2e4'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
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
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  container-max: 1200px
  gutter: 1rem
---

## Brand & Style

The design system is engineered for high-stakes financial environments where speed, clarity, and data density are paramount. The brand personality is authoritative yet accessible, balancing the rigor of quantitative trading with the intuitive nature of a modern AI assistant.

The aesthetic follows a **Corporate / Modern** direction. It prioritizes functional minimalism to reduce cognitive load during complex decision-making. The interface utilizes generous white space, a structured information hierarchy, and soft geometric shapes to create a reliable and sophisticated user experience. Visual cues are used sparingly but purposefully to signal market movements and system statuses.

## Colors

The color palette is built on a foundation of high-contrast neutrals and functional accents.

- **Primary (#3B82F6):** A technical blue used for primary actions, active states, and brand presence. It conveys trust and digital precision.
- **Secondary (#22C55E):** Reserved specifically for "Success," "Profit," or "Upward Trend" indicators. This is a functional semantic color.
- **Tertiary/Text (#111827):** A deep, near-black navy used for primary typography and high-emphasis interface elements to ensure maximum legibility.
- **Neutral/Surface (#F3F4F6):** A cool gray used for background layers, subtle borders, and secondary containment, providing a soft contrast against pure white cards.

The system defaults to a **light mode** to maintain a clean, "financial report" aesthetic, though the tonal structure supports high-density data visualization.

## Typography

The typography utilizes **Inter** across all levels to take advantage of its exceptional legibility in technical contexts. 

The system employs a tight line-height and slight negative letter-spacing for headlines to maintain a "dense" professional feel. For data-rich labels and small captions, a slightly increased letter-spacing is used to ensure readability at small scales. Font weights are used strategically: SemiBold and Bold for structural headers and medium weights for numerical data to ensure figures stand out without overwhelming the text flow.

## Layout & Spacing

This design system uses a **Fixed Grid** approach for desktop environments to maintain control over complex data layouts, switching to a **Fluid Grid** for mobile devices.

The spacing rhythm is based on a 4px baseline grid. This allows for the high information density required in trading interfaces. 
- **Desktop:** A 12-column grid with a 1200px max-width, 16px (1rem) gutters, and 24px margins.
- **Mobile:** A single-column layout with 16px side margins.

Content is organized into logical blocks using `md` (16px) and `lg` (24px) spacing units to separate distinct data modules, while `xs` and `sm` units are reserved for internal component padding.

## Elevation & Depth

Depth is primarily conveyed through **Tonal Layers** and **Low-Contrast Outlines**. 

The background layer uses the neutral `#F3F4F6`, while the primary content containers (cards, chat bubbles, data tables) are set in pure `#FFFFFF`. This creates a natural "lift" without relying on heavy shadows. 

Where elevation is required for floating elements (like dropdowns or modals), a very subtle, diffused ambient shadow is used: `0px 4px 12px rgba(17, 24, 39, 0.05)`. This ensures that the interface feels modern and layered but remains "flat" enough to keep the focus on the data. High-emphasis components may use a 1px solid border in the neutral tone to define boundaries in high-density areas.

## Shapes

The "góc cạnh bo tròn" (rounded corners) style is a signature of this design system, softening the industrial nature of financial data. 

We use a **Level 2 (Rounded)** scale:
- **Standard components** (buttons, inputs, small cards) use a 0.5rem (8px) radius.
- **Large containers** and main content areas use a 1rem (16px) radius for a "pill-like" containment feel.
- **Contextual elements** (like tags or search bars) may use full pill-rounding to distinguish them from structural data cards.

This consistency in rounding ensures the UI feels cohesive and approachable while maintaining a professional, structured alignment.

## Components

### Buttons
Primary buttons use the Primary Blue (#3B82F6) with white text and 8px rounded corners. Secondary buttons use a transparent background with a neutral border or a light gray fill.

### Cards
Cards are the primary container unit. They feature white backgrounds, a subtle 1px border (#E5E7EB), and 16px corner radius. Padding inside cards is typically 16px to 24px.

### Inputs & Chat Bar
Input fields use a light gray background (#F9FAFB) or white with a subtle border. The chat input should be prominent, featuring a larger 24px corner radius and a clear "Send" action using the primary color.

### Data Chips & Badges
Chips are used for market indicators and status. For positive percentages, use the Secondary Green (#22C55E) with 10% opacity for the background and 100% opacity for the text.

### Data Tables
Tables should be borderless with subtle row separators. Use `label-md` for headers (uppercase) and `body-md` for row data to maximize horizontal space.

### Chat Bubbles
User bubbles should be distinguished by the Neutral Surface color, while AI responses sit on white cards, reinforcing the AI as a structural part of the workspace.