import { StyleSheet } from 'react-native';
import { colors, spacing, radius, type, shadow } from './theme';

export const calendarStyles = StyleSheet.create({
  calendarWrap: {
    margin: spacing.md,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadow.card,
  },
  listHeader: {
    fontSize: type.sizes.section,
    color: colors.ink,
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
    ...type.heading,
  },
  eventRow: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
  },
  eventDate: {
    width: 64,
    backgroundColor: colors.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
  },
  eventDay: {
    fontSize: 22,
    color: colors.navy,
    ...type.display,
  },
  eventMonth: {
    fontSize: type.sizes.eyebrow,
    color: colors.inkFaint,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  eventBody: {
    flex: 1,
    padding: spacing.md,
  },
  eventTitle: {
    fontSize: type.sizes.body,
    color: colors.ink,
    ...type.bodyBold,
  },
  eventMeta: {
    fontSize: type.sizes.caption,
    color: colors.inkFaint,
    marginTop: 2,
  },
  remindBtn: {
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.navy,
  },
  remindBtnOn: {
    backgroundColor: colors.navy,
  },
  remindText: {
    fontSize: type.sizes.caption,
    color: colors.navy,
    fontWeight: '700',
  },
  remindTextOn: {
    color: colors.white,
  },
  empty: {
    textAlign: 'center',
    color: colors.inkFaint,
    marginTop: spacing.lg,
  },
});
