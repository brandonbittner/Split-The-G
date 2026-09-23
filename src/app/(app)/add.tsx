import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddScreen() {
  return (
    <SafeAreaView className="flex-1 bg-zinc-900">
      <View className="flex-1 items-center justify-center">
        <Text className="text-zinc-400 text-lg">Add</Text>
      </View>
    </SafeAreaView>
  );
}
