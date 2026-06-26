/**
 * theme.ts — single source of truth for the app's look.
 *
 * These are the REAL UCCNY tokens carried over from the website design system
 * (the WordPress redesign), not inferences:
 *   Navy #1A1A2E · Gold #E8C97A · Charcoal #1A1A1A · Cream #F9F7F3
 *   Sand #EDE9E0 (borders) · Slate #555555 (body) · Playfair + DM Sans
 *
 * To re-skin the entire app, edit THIS file only.
 */

export const colors = {
  // Brand
  navy: '#1A1A2E',       // hero bg, primary surfaces, active states
  navyDeep: '#12121F',
  gold: '#E8C97A',       // CTAs, accents, highlights
  ink: '#1A1A1A',        // charcoal — primary headings / strong text
  inkSoft: '#555555',    // slate — body text
  inkFaint: '#8A857F',   // captions, meta

  // Surfaces
  cream: '#F9F7F3',      // app background
  card: '#FFFFFF',       // cards / tiles
  cardAlt: '#F1ECE3',    // alternate tile fill
  line: '#EDE9E0',       // sand — hairline borders / dividers

  // Together in Love — used ONLY on that screen (live triad: Love/Community/Connection)
  til: {
    love: '#E11D48',       // warm red
    community: '#14B8A6',  // teal
    connection: '#8B5CF6', // purple
    rose: '#EC4899',       // pink/rose accents
  },
  pride: ['#E40303', '#FF8C00', '#FFED00', '#008026', '#004DFF', '#750787'],

  // Utility
  white: '#FFFFFF',
  overlay: 'rgba(26,26,46,0.55)', // navy-tinted scrim
} as const;

export const spacing = {
  xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48,
} as const;

export const radius = {
  sm: 8, md: 14, lg: 22, pill: 999,
} as const;

/**
 * Typography. Real site pairing: Playfair Display (headings) + DM Sans (body).
 * Fonts are loaded in app/_layout.tsx via @expo-google-fonts. If a family
 * fails to load, RN falls back to system fonts — still legible.
 */
export const type = {
  display: { fontFamily: 'PlayfairDisplay_700Bold', fontWeight: '700' as const },
  heading: { fontFamily: 'PlayfairDisplay_600SemiBold', fontWeight: '600' as const },
  body: { fontFamily: 'DMSans_400Regular', fontWeight: '400' as const },
  bodyBold: { fontFamily: 'DMSans_500Medium', fontWeight: '500' as const },
  sizes: { hero: 30, title: 22, section: 18, body: 16, caption: 13, eyebrow: 12 },
} as const;

export const shadow = {
  card: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
} as const;

export const theme = { colors, spacing, radius, type, shadow };
export type Theme = typeof theme;
