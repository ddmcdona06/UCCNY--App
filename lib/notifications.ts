/**
 * notifications.ts
 *
 * TWO distinct things live here. Don't conflate them:
 *
 *  1. LOCAL notifications (scheduleEventReminder / cancelEventReminder)
 *     -> Work TODAY with no server. The phone schedules its own reminder.
 *        This powers the "Remind me" button on each calendar event.
 *
 *  2. REMOTE push (registerForPushNotificationsAsync)
 *     -> Gets an Expo push token from the device. By itself this does NOTHING
 *        visible. A SERVER must store this token and POST to
 *        https://exp.host/--/api/v2/push/send to actually deliver a push.
 *        See sendExample() at the bottom for the server-side shape, and the
 *        README for the full picture. Until that server exists, remote push
 *        is non-functional — by design, because there's no backend yet.
 *
 * Requires a DEV BUILD (eas build) for real remote push. Remote push does NOT
 * work in Expo Go on a physical device for SDK 53+. Local notifications DO.
 */

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import type { ChurchEvent } from './events';

// How the app displays a notification while it's in the foreground.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function ensurePermission(): Promise<boolean> {
  const { status: existing } = await Notifications.getPermissionsAsync();
  let status = existing;
  if (existing !== 'granted') {
    const req = await Notifications.requestPermissionsAsync();
    status = req.status;
  }
  return status === 'granted';
}

async function ensureAndroidChannel() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'UCCNY',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
}

/* ---------- 1. LOCAL REMINDERS (no backend required) ---------- */

/** Schedule a local reminder `minutesBefore` an event starts.
 *  Returns the scheduled notification id (store it to cancel later), or null. */
export async function scheduleEventReminder(
  event: ChurchEvent,
  minutesBefore = 60
): Promise<string | null> {
  if (!(await ensurePermission())) return null;
  await ensureAndroidChannel();

  const fireDate = new Date(+new Date(event.start) - minutesBefore * 60_000);
  if (fireDate.getTime() <= Date.now()) return null; // event already passed/too soon

  return Notifications.scheduleNotificationAsync({
    content: {
      title: event.title,
      body: `Starts in ${minutesBefore} minutes${event.location ? ` · ${event.location}` : ''}`,
      data: { eventId: event.id, url: event.url },
    },
    trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: fireDate },
  });
}

export async function cancelEventReminder(notificationId: string) {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
}

/* ---------- 2. REMOTE PUSH (needs a server to actually send) ---------- */

/**
 * Where device tokens are stored — the UCCNY Push WordPress plugin. The admin's
 * "Send Push" page in wp-admin reads from this same store. REGISTER_KEY must
 * match UCCNY_PUSH_REGISTER_KEY in the plugin. (The key ships in the app, so it
 * isn't a true secret — it just blocks casual junk; the plugin also validates
 * the token format.) Set endpoint to '' to disable registration.
 */
const TOKEN_REGISTER_ENDPOINT = 'https://uccny.org/wp-json/uccny/v1/register-token';
const REGISTER_KEY = 'CHANGE_ME_to_a_random_string';

/** Registers the device and returns its Expo push token.
 *  Sends it to the plugin so the admin's Send Push page can target it. */
export async function registerForPushNotificationsAsync(): Promise<string | null> {
  if (!Device.isDevice) return null; // push needs a physical device
  if (!(await ensurePermission())) return null;
  await ensureAndroidChannel();

  const projectId =
    Constants?.expoConfig?.extra?.eas?.projectId ??
    Constants?.easConfig?.projectId;

  const token = (
    await Notifications.getExpoPushTokenAsync(projectId ? { projectId } : undefined)
  ).data;

  if (TOKEN_REGISTER_ENDPOINT) {
    try {
      await fetch(TOKEN_REGISTER_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-uccny-key': REGISTER_KEY,
        },
        body: JSON.stringify({ token, platform: Platform.OS }),
      });
    } catch {
      // Non-fatal: the app still works without remote push.
    }
  }

  return token;
}

/**
 * sendExample — this runs on YOUR SERVER, not in the app. Shown here only so
 * you can see the shape. The app cannot push to other devices on its own.
 *
 *   await fetch('https://exp.host/--/api/v2/push/send', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({
 *       to: storedExpoPushToken,
 *       title: 'New from UCCNY',
 *       body: 'The weekly e-blast is out.',
 *       data: { url: 'https://uccny.org' },
 *     }),
 *   });
 */
