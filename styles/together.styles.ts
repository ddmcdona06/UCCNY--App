import { StyleSheet } from 'react-native';
import { colors, spacing, radius, type } from './theme';

export const togetherStyles = StyleSheet.create({
  prideBar: {
    flexDirection: 'row',
    height: 6,
    width: '100%',
  },
  prideSeg: {
    flex: 1,
    height: '100%',
  },
  hero: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },
  eyebrow: {
    fontSize: type.sizes.eyebrow,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.navy,
    fontWeight: '700',
  },
  title: {
    fontSize: type.sizes.hero,
    color: colors.ink,
    marginTop: spacing.sm,
    ...type.display,
  },
  lead: {
    fontSize: type.sizes.body,
    lineHeight: 26,
    color: colors.inkSoft,
    marginTop: spacing.md,
  },
  card: {
    margin: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
  },
  cardTitle: {
    fontSize: type.sizes.title,
    color: colors.ink,
    ...type.heading,
  },
  cardBody: {
    fontSize: type.sizes.body,
    lineHeight: 24,
    color: colors.inkSoft,
    marginTop: spacing.sm,
  },
  cta: {
    marginTop: spacing.lg,
    backgroundColor: colors.gold,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    alignItems: 'center',
  },
  ctaText: {
    color: colors.ink,
    fontSize: type.sizes.body,
    fontWeight: '700',
  },
  quote: {
    margin: spacing.md,
    paddingLeft: spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.gold,
  },
  quoteText: {
    fontSize: type.sizes.title,
    color: colors.ink,
    fontStyle: 'italic',
    ...type.heading,
  },
  quoteAttr: {
    fontSize: type.sizes.caption,
    color: colors.inkFaint,
    marginTop: spacing.sm,
  },
});
