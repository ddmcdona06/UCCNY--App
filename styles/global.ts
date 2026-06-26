import { StyleSheet } from 'react-native';
import { colors, spacing, radius, type } from './theme';

/** Styles reused across multiple screens. Screen-specific styles live in their
 *  own *.styles.ts file in this folder. */
export const global = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  eyebrow: {
    fontSize: type.sizes.eyebrow,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.navy,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  h1: {
    fontSize: type.sizes.hero,
    color: colors.ink,
    ...type.display,
  },
  h2: {
    fontSize: type.sizes.title,
    color: colors.ink,
    ...type.heading,
  },
  body: {
    fontSize: type.sizes.body,
    lineHeight: 24,
    color: colors.inkSoft,
    ...type.body,
  },
  hr: {
    height: 2,
    width: 48,
    backgroundColor: colors.gold,
    borderRadius: radius.pill,
    marginVertical: spacing.md,
  },
});
