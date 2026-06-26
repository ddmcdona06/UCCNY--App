# UCCNY App (Expo SDK 54)

Companion app for [uccny.org](https://uccny.org), using the website's design
system: Navy `#1A1A2E`, Gold `#E8C97A`, Charcoal `#1A1A1A`, Cream `#F9F7F3`,
Playfair Display + DM Sans. **All styling lives in `/styles`** — edit
`styles/theme.ts` to re-skin everything.

## Screens
- **Home** — hero + featured event + grid of tiles mapped to website sections.
- **Calendar** — month view + agenda; each event has a **Remind me** button
  (local notification, no server needed).
- **Together in Love** — pride bar, Equip/Encourage/Empower pillars, navy
  Open & Affirming section, Donate/Pledge CTAs.
- **More** — links to the rest of the site.

## Run it in Expo Go (SDK 54)

The Expo Go app from the App/Play Store is pinned to **SDK 54**, so the project
must be SDK 54 too. `create-expo-app@latest` gives you SDK 56, so you scaffold
then **downgrade to 54**:

```bash
# 1. Scaffold, then pin to SDK 54
npx create-expo-app@latest UCCNY-App
cd UCCNY-App
npm install expo@~54.0.0
npx expo install --fix          # downgrades React/RN/all expo-* to SDK 54

# 2. Confirm it says 54
npx expo config --type public | grep sdkVersion   # should show 54.x.x

# 3. Drop these in, replacing the scaffold defaults:
#    app/  styles/  components/  lib/  assets/  app.json  eas.json
#    babel.config.js  tsconfig.json
#    KEEP the scaffold's package.json after the downgrade — do NOT overwrite it
#    with the one in this repo (that one is only a dependency reference).

# 4. Add the extra libraries at SDK-54-correct versions
npx expo install expo-notifications expo-device expo-constants expo-font \
  expo-splash-screen expo-dev-client react-native-calendars \
  @expo-google-fonts/playfair-display @expo-google-fonts/dm-sans

# 5. Start and scan with Expo Go
npx expo start
```

To check what SDK YOUR Expo Go supports: open the Expo Go app — it lists the
supported SDK, or it errors with the supported version when you load a too-new
project. Match the project to that number.

Use `npx expo install` (not `npm install`) for native modules so versions match
the SDK.

## What works in Expo Go vs. what needs a dev build

| Feature | Expo Go (SDK 54) |
|---|---|
| All screens, calendar, navigation | ✅ Works |
| **Local reminders** ("Remind me" on events) | ✅ Works — no server |
| **Remote push (broadcast announcements), Android** | ❌ Not in Expo Go — needs `eas build` |
| **Remote push, iOS** | ✅ Works in Expo Go (Expo auto-configures iOS credentials) |

This is a deliberate Expo change starting in SDK 53: remote push was removed
from Android Expo Go to stop the "worked in Expo Go, broke in production"
confusion. The app still *fetches* a push token in `lib/notifications.ts`; it
just can't deliver an Android remote push until you're on a development build.

### To enable broadcast push later
1. `eas build --profile development --platform android` (and/or iOS) for a dev build.
2. Set up FCM (Android) + APNs (iOS) credentials — EAS can manage these.
3. Stand up a server that stores device tokens and POSTs to
   `https://exp.host/--/api/v2/push/send`. The `TODO` seam is in
   `lib/notifications.ts`. **Decide who composes/sends announcements first** —
   a small WordPress hook firing on new-event publish is the lightest option.

## Live event data
`lib/events.ts` ships static seed events so the calendar works offline.
Uncomment the fetch to the WordPress Events REST endpoint
(`/wp-json/tribe/events/v1/events`) and map the fields to go live.

## Assets
`app.json` ships without icon/splash so it runs in Expo Go immediately. Add
`icon`, `splash`, and an Android `adaptiveIcon` (the comma logo on navy works)
before building for the stores. The Android notification icon must be a
monochrome white-on-transparent PNG or it renders as a solid square.
