---
name: Rural Cyber Hygiene Framework
colors:
  surface: '#f3faff'
  surface-dim: '#c7dde9'
  surface-bright: '#f3faff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e6f6ff'
  surface-container: '#dbf1fe'
  surface-container-high: '#d5ecf8'
  surface-container-highest: '#cfe6f2'
  on-surface: '#071e27'
  on-surface-variant: '#42474f'
  inverse-surface: '#1e333c'
  inverse-on-surface: '#dff4ff'
  outline: '#727780'
  outline-variant: '#c2c7d1'
  surface-tint: '#2d6197'
  primary: '#00355f'
  on-primary: '#ffffff'
  primary-container: '#0f4c81'
  on-primary-container: '#8ebdf9'
  inverse-primary: '#a0c9ff'
  secondary: '#1b6d24'
  on-secondary: '#ffffff'
  secondary-container: '#a0f399'
  on-secondary-container: '#217128'
  tertiary: '#552700'
  on-tertiary: '#ffffff'
  tertiary-container: '#773900'
  on-tertiary-container: '#ffa564'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d2e4ff'
  primary-fixed-dim: '#a0c9ff'
  on-primary-fixed: '#001c37'
  on-primary-fixed-variant: '#07497d'
  secondary-fixed: '#a3f69c'
  secondary-fixed-dim: '#88d982'
  on-secondary-fixed: '#002204'
  on-secondary-fixed-variant: '#005312'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311300'
  on-tertiary-fixed-variant: '#723600'
  background: '#f3faff'
  on-background: '#071e27'
  surface-variant: '#cfe6f2'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
The brand personality is authoritative yet accessible, bridging the gap between sophisticated cybersecurity standards and rural usability. The visual style follows a **Modern Corporate** aesthetic with a focus on **Institutional Trust**. It prioritizes clarity and high legibility to ensure users from diverse educational backgrounds feel empowered rather than intimidated.

The interface utilizes a systematic approach: generous whitespace, a structured grid, and a focus on "safe" visual metaphors. The emotional response should be one of confidence, reliability, and digital safety. While it maintains the professional rigor of a government portal, it adopts the polished UX patterns of modern SaaS to ensure high engagement and ease of navigation.

## Colors
The palette is rooted in institutional stability. 
- **Primary Blue (#0F4C81):** A deep, "Security Blue" used for headers, primary actions, and branding to evoke trust and official status.
- **Success Green (#2E7D32):** Used for "Cyber-Safe" indicators, completed tasks, and growth metrics.
- **Alert Orange (#F57C00):** Reserved for warnings and hygiene recommendations that require attention but aren't critical failures.
- **Error Red (#D32F2F):** Strictly for security breaches or critical system vulnerabilities.
- **Neutrals:** A range of cool grays (Slate) provides structure without the harshness of pure black, ensuring comfort during long reading sessions.

## Typography
This design system utilizes **Inter** for its exceptional legibility and support for multi-language environments. The type scale is optimized for information density and readability. 

For multi-language support (English and Telugu), the system uses a fallback-aware approach. Telugu scripts should be rendered with a 10% increase in line-height compared to English to account for the vertical height of complex characters. Headlines use a semi-bold weight to establish hierarchy without feeling aggressive, while body text maintains a generous line-height for maximum accessibility on mobile devices.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a 12-column structure for desktop and a 4-column structure for mobile. 

- **Mobile:** Elements are primarily stacked. Touch targets are prioritized with a minimum height of 48px.
- **Desktop:** Dashboard layouts utilize a "Sidebar + Main Canvas" configuration. Content is centered within a maximum width of 1280px to prevent excessive line lengths in educational articles.
- **Vertical Rhythm:** A base-8 spacing scale is used to maintain consistency between elements.

## Elevation & Depth
Depth is created through **Tonal Layers** and soft, functional shadows. 
- **Surface Level:** The main background is a very light slate (#F8FAFC).
- **Cards & Containers:** Pure white (#FFFFFF) with a 1px border (#E2E8F0) and a subtle "Soft Glow" shadow (Y: 2px, B: 8px, Opacity: 4%).
- **Active States:** Elements being interacted with use a deeper shadow (Y: 4px, B: 12px, Opacity: 8%) to provide tactile feedback. 
Avoid heavy gradients; depth should feel structural and clean, not decorative.

## Shapes
The shape language is **Rounded**, striking a balance between the friendliness of a service-oriented platform and the precision of a security framework. 
- Standard components (Inputs, Buttons) use a **0.5rem (8px)** corner radius.
- Larger containers like Dashboard Cards or Banners use **1rem (16px)** for a modern, nested appearance.
- This consistent rounding creates a cohesive "containerized" look that helps organize complex data into digestible chunks.

## Components

### Navigation Bars
- **Desktop:** Persistent top-bar with Primary Blue background or white with a bottom border. Must include a language switcher (EN/TE) and a "Quick Alert" bell icon.
- **Mobile:** Bottom tab bar for primary navigation (Home, Security Audit, Learning, Profile) to ensure ease of use with one hand.

### Dashboard Cards
Cards must include a clear Title, an Icon (e.g., a shield for "Mobile Security"), and a "Status Indicator" (Safe, At Risk, Action Needed). The card acts as a single touch target.

### Buttons
- **Primary:** Solid Primary Blue with white text. High-contrast and prominent.
- **Secondary:** Ghost style with Primary Blue border and text.
- **Critical Action:** Solid Error Red for actions like "Wipe Device" or "Revoke Access."

### Alert Banners
Sticky top-level alerts. 
- **Informational:** Blue background with white text.
- **Urgent:** Orange background with dark neutral text for maximum visibility.

### Progress Indicators
Linear bars for course completion and circular gauges for "Security Health Scores." Use the Success Green to indicate progress and Gray for the remaining track.

### Input Fields
Large, accessible fields with 16px font size to prevent iOS auto-zoom. Labels are always visible above the field (not as placeholders) to assist users with cognitive load.