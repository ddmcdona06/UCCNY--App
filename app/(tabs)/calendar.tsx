import { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, type DateData } from 'react-native-calendars';
import { global } from '../../styles/global';
import { calendarStyles as s } from '../../styles/calendar.styles';
import { colors } from '../../styles/theme';
import { getEvents, type ChurchEvent } from '../../lib/events';
import { scheduleEventReminder, cancelEventReminder } from '../../lib/notifications';
import { EventListItem } from '../../components/EventListItem';

const isoDay = (d: string | Date) => new Date(d).toISOString().slice(0, 10);

export default function CalendarScreen() {
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [selected, setSelected] = useState<string>(isoDay(new Date()));
  // eventId -> scheduled notification id
  const [reminders, setReminders] = useState<Record<string, string>>({});

  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  const marked = useMemo(() => {
    const m: Record<string, any> = {};
    for (const e of events) {
      m[isoDay(e.start)] = { marked: true, dotColor: colors.navy };
    }
    m[selected] = { ...(m[selected] || {}), selected: true, selectedColor: colors.navy };
    return m;
  }, [events, selected]);

  const dayEvents = events.filter((e) => isoDay(e.start) === selected);

  const toggleReminder = async (e: ChurchEvent) => {
    const existing = reminders[e.id];
    if (existing) {
      await cancelEventReminder(existing);
      setReminders((r) => {
        const next = { ...r };
        delete next[e.id];
        return next;
      });
      return;
    }
    const id = await scheduleEventReminder(e, 60);
    if (!id) {
      Alert.alert(
        'Could not set reminder',
        'Either notifications are turned off, or the event is less than an hour away.'
      );
      return;
    }
    setReminders((r) => ({ ...r, [e.id]: id }));
  };

  return (
    <SafeAreaView style={global.screen} edges={['top']}>
      <ScrollView>
        <View style={s.calendarWrap}>
          <Calendar
            current={selected}
            onDayPress={(d: DateData) => setSelected(d.dateString)}
            markedDates={marked}
            theme={{
              todayTextColor: colors.navy,
              arrowColor: colors.navy,
              textMonthFontWeight: '700',
              monthTextColor: colors.ink,
              dayTextColor: colors.ink,
              textDisabledColor: colors.inkFaint,
              calendarBackground: colors.card,
            }}
          />
        </View>

        <Text style={s.listHeader}>
          {new Date(selected).toLocaleDateString([], {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </Text>

        {dayEvents.length === 0 ? (
          <Text style={s.empty}>No events this day.</Text>
        ) : (
          dayEvents.map((e) => (
            <EventListItem
              key={e.id}
              event={e}
              reminderOn={!!reminders[e.id]}
              onToggleReminder={() => toggleReminder(e)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
