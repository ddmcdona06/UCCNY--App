import { StyleSheet } from 'react-native';
import { colors, spacing, radius, type, shadow } from './theme';

export const homeStyles = StyleSheet.create({
  hero: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  heroEyebrow: {
    fontSize: type.sizes.eyebrow,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.navy,
    fontWeight: '700',
  },
  heroTitle: {
    fontSize: type.sizes.hero,
    color: colors.ink,
    marginTop: spacing.sm,
    ...type.display,
  },
  heroSub: {
    fontSize: type.sizes.body,
    lineHeight: 24,
    color: colors.inkSoft,
    marginTop: spacing.sm,
  },

  // Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md - spacing.xs,
  },
  cell: {
    width: '50%',
    padding: spacing.xs,
  },
  tile: {
    borderRadius: radius.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
    minHeight: 178,
    ...shadow.card,
  },
  tileImage: {
    width: '100%',
    height: 100,
    backgroundColor: colors.cardAlt,
  },
  tileBody: {
    padding: spacing.md,
    flex: 1,
    justifyContent: 'flex-end',
  },
  tileAccentBar: {
    height: 4,
    width: '100%',
  },
  tileTitle: {
    fontSize: type.sizes.section,
    color: colors.ink,
    ...type.heading,
  },
  tileSub: {
    fontSize: type.sizes.caption,
    color: colors.inkFaint,
    marginTop: 2,
  },

  // Wide feature tile (Featured Event)
  wideCell: {
    width: '100%',
    padding: spacing.xs,
  },
  feature: {
    width: '100%',
    aspectRatio: 1.682,   // banner ratio lives on the CONTAINER (reliable)
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.navy,
    ...shadow.card,
  },
  featureImage: {
    width: '100%',
    height: '100%',
  },
  featureOverlay: {
    position: 'absolute',
    bottom: '22%',
    left: spacing.sm,
    backgroundColor: 'rgba(18,18,31,0.92)',
    borderRadius: radius.md,
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.sm + 2,
  },
  featureEyebrow: {
    color: colors.gold,
    fontSize: type.sizes.eyebrow,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
});