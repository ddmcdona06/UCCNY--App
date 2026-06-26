import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { calendarStyles as s } from '../styles/calendar.styles';
import type { ChurchEvent } from '../lib/events';

type Props = {
  event: ChurchEvent;
  reminderOn: boolean;
  onToggleReminder: () => void;
};

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export function EventListItem({ event, reminderOn, onToggleReminder }: Props) {
  const d = new Date(event.start);
  return (
    <View style={s.eventRow}>
      <View style={s.eventDate}>
        <Text style={s.eventDay}>{d.getDate()}</Text>
        <Text style={s.eventMonth}>{MONTHS[d.getMonth()]}</Text>
      </View>
      <View style={s.eventBody}>
        <Text style={s.eventTitle}>{event.title}</Text>
        <Text style={s.eventMeta}>
          {d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
          {event.location ? ` · ${event.location}` : ''}
        </Text>
        <Pressable
          onPress={onToggleReminder}
          style={[s.remindBtn, reminderOn && s.remindBtnOn]}
          accessibilityRole="button"
          accessibilityLabel={reminderOn ? 'Cancel reminder' : 'Remind me'}
        >
          <Text style={[s.remindText, reminderOn && s.remindTextOn]}>
            {reminderOn ? '✓ Reminder set' : 'Remind me'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
