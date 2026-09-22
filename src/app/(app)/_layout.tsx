import { Stack, useRouter } from 'expo-router';
import { Pressable, Text } from 'react-native';

import { useAuth } from '@/hooks/use-auth';

export default function AppLayout() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/(auth)/sign-in');
  };

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Items',
          headerRight: () => (
            <Pressable onPress={handleSignOut} className="mr-2">
              <Text className="text-blue-600 font-medium">Sign Out</Text>
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="items/new"
        options={{
          title: 'New Item',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
