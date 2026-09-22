// EXPO_PUBLIC_ prefix is mandatory — Metro strips any var without it from the
// client bundle entirely, so the value would be undefined regardless of .env.
//
// Static property access is required by the expo/no-dynamic-env-var rule;
// Metro's bundler inlines these values at build time using string replacement.

const missingEnvError = (key: string): never => {
  throw new Error(
    `Missing required environment variable: ${key}\n` +
      `Copy .env.example to .env and fill in your Supabase credentials.`,
  );
};

export const SUPABASE_URL =
  process.env.EXPO_PUBLIC_SUPABASE_URL ?? missingEnvError('EXPO_PUBLIC_SUPABASE_URL');

export const SUPABASE_ANON_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? missingEnvError('EXPO_PUBLIC_SUPABASE_ANON_KEY');
