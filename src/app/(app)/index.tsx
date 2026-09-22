import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type Item = Database['public']['Tables']['items']['Row'];

export default function ItemsListScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchItems = async () => {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        Alert.alert('Error', error.message);
        return;
      }

      setItems(data ?? []);
      setLoading(false);
    };

    fetchItems();
  }, [user]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-4 py-4"
        ItemSeparatorComponent={() => <View className="h-2" />}
        ListEmptyComponent={
          <View className="items-center justify-center py-24">
            <Text className="text-gray-400 text-base">No items yet.</Text>
            <Text className="text-gray-400 text-sm mt-1">Tap + to add your first one.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View className="bg-white rounded-xl px-4 py-3.5 shadow-sm">
            <Text className="text-gray-900 text-base font-medium">{item.title}</Text>
            <Text className="text-gray-400 text-xs mt-1">
              {new Date(item.created_at).toLocaleDateString()}
            </Text>
          </View>
        )}
      />

      {/* Floating action button */}
      <Pressable
        className="absolute bottom-8 right-6 bg-blue-600 w-14 h-14 rounded-full items-center justify-center shadow-lg active:opacity-80"
        onPress={() => router.push('/(app)/items/new')}
      >
        <Text className="text-white text-3xl font-light leading-none">+</Text>
      </Pressable>
    </SafeAreaView>
  );
}
