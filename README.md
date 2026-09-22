# Split The G

A mobile-only React Native app built with Expo, TypeScript, NativeWind, and Supabase.

---

## Stack

| Layer      | Choice                   | Why                                      |
| ---------- | ------------------------ | ---------------------------------------- |
| Framework  | Expo SDK 57              | Managed workflow, OTA updates, EAS Build |
| Navigation | Expo Router (file-based) | No hand-rolled stacks; routes are files  |
| Styling    | NativeWind v4            | Tailwind class names on RN components    |
| Backend    | Supabase                 | Postgres + auth + RLS + Edge Functions   |
| Language   | TypeScript (strict)      | Catches shape mismatches at compile time |

---

## Folder structure

```
src/
  app/                    Expo Router screens (file = route)
    _layout.tsx           Root layout — AuthProvider, redirect logic
    (auth)/               Unauthenticated group
      sign-in.tsx
      sign-up.tsx
    (app)/                Authenticated group
      _layout.tsx         Stack navigator + sign-out button
      index.tsx           Items list
      items/new.tsx       New item form
  components/             Reusable UI components
  hooks/                  Custom hooks
    use-auth.tsx          Auth context + useAuth()
  lib/                    Singleton clients and utilities
    env.ts                Validated env vars
    supabase.ts           Supabase client singleton
  types/
    database.ts           Auto-generated Supabase types (see below)
  global.css              Tailwind entry point (@tailwind base/components/utilities)

supabase/
  config.toml             Local Supabase config (project ID, ports, etc.)
  migrations/             SQL migration files applied in order
```

Add new screens inside `src/app/`. Add shared UI to `src/components/`. Add Supabase query logic directly in the screen or extract into `src/hooks/`.

---

## Environment variables

Copy `.env.example` to `.env` and fill in your credentials:

```sh
cp .env.example .env
```

**Why `EXPO_PUBLIC_`?**
Metro (Expo's bundler) inlines env vars at bundle time using string replacement. Only variables prefixed with `EXPO_PUBLIC_` are included in the client bundle. Variables without this prefix are stripped entirely — they will be `undefined` at runtime, not just hidden. This is different from Vite (`VITE_`) or Next.js (`NEXT_PUBLIC_`).

Find your values in the Supabase dashboard → project → Settings → API, or in `supabase/config.toml` for the local stack.

The app validates all required variables at startup via `src/lib/env.ts` and throws immediately if any are missing, instead of failing silently later.

---

## Running the app

### Prerequisites

- Node 20+
- iOS: Xcode with iOS Simulator, or a physical iPhone with Expo Go
- Android: Android Studio with an AVD, or a physical device with Expo Go

### Install dependencies

```sh
npm install
```

### Start the development server

```sh
npm start          # interactive menu
npm run ios        # open iOS Simulator directly
npm run android    # open Android emulator directly
```

Scan the QR code with **Expo Go** (iOS App Store / Google Play) to run on a physical device.

---

## Running Supabase locally

You need Docker Desktop installed and running.

```sh
# Start all Supabase services (Postgres, Auth, Studio, etc.)
npm run supabase:start

# Apply pending migrations
npm run supabase:migrate

# Open Supabase Studio at http://localhost:54323

# Stop services when done
npm run supabase:stop
```

The local API URL is `http://127.0.0.1:54321`. Update your `.env`:

```
EXPO_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
EXPO_PUBLIC_SUPABASE_ANON_KEY=<anon key from supabase start output>
```

---

## Database migrations

Migrations live in `supabase/migrations/`. Each file is named `<timestamp>_<description>.sql` and applied in order.

```sh
# Create a new migration file
npx supabase migration new <name>

# Apply migrations to local DB
npm run supabase:migrate

# Apply migrations to the hosted (linked) project
npx supabase db push --linked
```

**Row-Level Security (RLS)** is enabled on all tables. Supabase tables are accessible via the anon key by default — RLS is the only thing preventing users from reading each other's data. See `supabase/migrations/20250101000000_create_items.sql` for the pattern. Always write RLS policies when you create a new table.

---

## Regenerating TypeScript types

After any schema change, regenerate `src/types/database.ts`:

```sh
# Against local Supabase
npm run gen:types

# Against the hosted project (requires `supabase link` first)
npx supabase gen types typescript --linked > src/types/database.ts
```

The file is committed as a stub so the project compiles without a running Supabase instance. Replace it with the generated output before shipping.

---

## NativeWind

Classes work exactly like Tailwind on the web — they're compiled to `StyleSheet.create` calls at build time:

```tsx
<View className="flex-1 items-center justify-center bg-white">
  <Text className="text-lg font-bold text-gray-900">Hello</Text>
</View>
```

**How it works:**
`babel.config.js` sets `jsxImportSource: "nativewind"` inside `babel-preset-expo`. This tells Babel to use NativeWind's JSX runtime instead of React's default, which intercepts `className` props and compiles them to native styles. `metro.config.js` wraps the Metro config with `withNativeWind` to process `src/global.css` through PostCSS/Tailwind. The result is zero-runtime overhead — styles are static at bundle time.

If classes aren't applying, the two most common causes are:

1. `src/global.css` is not imported in the root `_layout.tsx` (it is — `import '@/global.css'`)
2. The file pattern in `tailwind.config.js` doesn't match your source files (it covers `src/**`)

---

## Auth pattern

Authentication lives in `src/hooks/use-auth.tsx`:

- `AuthProvider` wraps the app in the root layout and subscribes to `supabase.auth.onAuthStateChange`
- `useAuth()` returns `{ session, user, loading, signIn, signUp, signOut }`
- The root layout redirects unauthenticated users to `/(auth)/sign-in` and redirects authenticated users away from auth screens

Protected screens live in `src/app/(app)/`. Adding a new protected screen is just a new file in that folder.

---

## Linting, formatting, and pre-commit hooks

```sh
npm run lint          # ESLint
npm run format        # Prettier (writes in-place)
npm run typecheck     # tsc --noEmit
```

Husky runs `lint-staged` on every commit via `.husky/pre-commit`. Staged `.ts`/`.tsx` files are linted and formatted automatically.

---

## Testing

```sh
npm test                        # run all tests
npm test -- --watch             # watch mode
npm test -- --coverage          # with coverage report
```

Tests live in `__tests__/`. See `__tests__/new-item.test.tsx` for the pattern:

- `jest.mock('@/lib/supabase', ...)` replaces the Supabase client with a jest mock — tests never hit a real database
- `jest.mock('@/hooks/use-auth', ...)` provides a fake session
- `jest.mock('expo-router', ...)` stubs `useRouter` to assert navigation calls
- Babel hoists all `jest.mock()` calls before `import` statements, so the component always receives the mocked version

---

## CI

GitHub Actions runs lint, typecheck, and tests on every push to `main` and every PR. See `.github/workflows/ci.yml`. Dummy env vars are injected so startup validation passes without real credentials.

---

## EAS Build (App Store / Play Store)

EAS Build is Expo's cloud build service for producing native `.ipa` and `.apk` binaries. You'll need it when you want to:

- Submit to the App Store or Google Play
- Test on physical devices without Expo Go (for features that Expo Go doesn't support, like custom native modules)
- Set up OTA (over-the-air) updates with `expo-updates`

When you're ready:

```sh
npm install -g eas-cli
eas login
eas build:configure   # creates eas.json
eas build --platform ios --profile preview
```

Don't set it up yet — `eas.json` is not committed to this repo. Add it when you're ready to cut your first TestFlight build.
