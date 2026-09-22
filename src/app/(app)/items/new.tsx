import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';

export default function NewItemScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const trimmed = title.trim();
    if (!trimmed) {
      Alert.alert('Required', 'Please enter a title.');
      return;
    }
    if (!user) return;

    setLoading(true);
    const { error } = await supabase.from('items').insert({
      title: trimmed,
      user_id: user.id,
    });

    setLoading(false);

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1 px-6 pt-6">
          <Text className="text-sm font-medium text-gray-700 mb-1.5">Title</Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-900 mb-6"
            placeholder="Enter a title…"
            placeholderTextColor="#9ca3af"
            value={title}
            onChangeText={setTitle}
            autoFocus
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />

          <Pressable
            className="bg-blue-600 rounded-xl py-3.5 items-center active:opacity-80"
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-base font-semibold">Save Item</Text>
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
