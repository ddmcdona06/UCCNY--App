import { useEffect, useRef } from 'react';
import { Stack, router } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import {
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';
import {
  DMSans_400Regular,
  DMSans_500Medium,
} from '@expo-google-fonts/dm-sans';
import { colors } from '../styles/theme';
import { registerForPushNotificationsAsync } from '../lib/notifications';

export default function RootLayout() {
  const responseListener =
    useRef<ReturnType<typeof Notifications.addNotificationResponseReceivedListener> | null>(null);

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    DMSans_400Regular,
    DMSans_500Medium,
  });

  useEffect(() => {
    // Ask for a push token on launch (no-op until a backend stores it).
    registerForPushNotificationsAsync().catch(() => {});

    // When the user taps a notification, deep-link if it carried a url.
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data as { url?: string };
        if (data?.url) router.push('/'); // adjust to a real in-app route as needed
      }
    );

    return () => responseListener.current?.remove();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.cream },
          headerTintColor: colors.ink,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.cream },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
