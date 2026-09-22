import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { AuthProvider, useAuth } from '@/hooks/use-auth';
import '@/global.css';

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { session, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    SplashScreen.hideAsync();

    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup) {
      // Not signed in and not on an auth screen — send to sign-in
      router.replace('/(auth)/sign-in');
    } else if (session && inAuthGroup) {
      // Already signed in but still on an auth screen — send to app
      router.replace('/(app)');
    }
    // router and segments are stable refs from expo-router; excluding them
    // avoids an infinite redirect loop on every navigation event.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, loading]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
