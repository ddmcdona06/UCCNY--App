# App assets

Built from the real UCCNY logo (rainbow New York State + heart), composited on
the brand navy `#1A1A2E`. Ready for development, Expo Go, and store builds.

## Files and required sizes

| File | Size | Notes |
|---|---|---|
| `icon.png` | 1024×1024 | Main app icon. **No transparency** (iOS fills the square). |
| `adaptive-icon.png` | 1024×1024 | Android foreground, **transparent**. Logo stays inside the center ~66% "safe zone" (Android crops to circle/squircle). Background color is set in `app.json`. |
| `splash-icon.png` | 1024×1024 | Transparent logo; `expo-splash-screen` centers it on the navy background at `imageWidth: 220`. |
| `notification-icon.png` | 256×256 | Android status-bar icon. **Must be monochrome white on transparent** or Android renders a solid square. |
| `favicon.png` | 96×96 | Web only. |

## To drop in the real logo

1. Export your logo as PNG at the sizes above.
2. Keep the **same filenames** — no `app.json` change needed.
3. For `icon.png`, flatten onto a navy background (no alpha).
4. For `adaptive-icon.png` and `splash-icon.png`, keep transparency and leave
   generous padding so nothing gets cropped.
5. For `notification-icon.png`, make it a flat white silhouette on transparent.
6. Re-run your build (`npx expo prebuild` / EAS) — Expo Go shows the default
   splash, custom splash/icon appear in dev and production builds.
