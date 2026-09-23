import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/AppHeader';

export default function PubsScreen() {
  // TODO: replace with real pubs data
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-zinc-900">
      <AppHeader />
      <View className="flex-1 items-center justify-center">
        <Text className="text-zinc-400 dark:text-zinc-600 text-lg">Pubs</Text>
      </View>
    </SafeAreaView>
  );
}
