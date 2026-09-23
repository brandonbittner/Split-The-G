import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/AppHeader';
import { FeedCard, type FeedCardProps } from '@/components/FeedCard';
import pint1 from '../../../assets/pints/pint1.png';
import pint2 from '../../../assets/pints/pint2.png';
import pint3 from '../../../assets/pints/pint3.png';

// TODO: replace with real-time Supabase subscription to friends' splits
//       query: supabase.from('splits').select('*, user(*), pub(*)').order('created_at', { ascending: false })
const DUMMY_FEED: FeedCardProps[] = [
  {
    id: '1',
    username: 'james_o',
    initials: 'JO',
    avatarColor: '#3B82F6',
    timeAgo: '32m',
    pub: 'The Porterhouse',
    score: 87,
    tag: 'friend',
    photo: pint1,
  },
  {
    id: '2',
    username: 'sarah_m',
    initials: 'SM',
    avatarColor: '#8B5CF6',
    timeAgo: '2hr',
    pub: "Mulligan's",
    score: 64,
    tag: 'local drunk',
    photo: pint2,
  },
  {
    id: '3',
    username: 'dan_k',
    initials: 'DK',
    avatarColor: '#10B981',
    timeAgo: '5hr',
    pub: "The Stag's Head",
    score: 91,
    tag: 'friend',
    photo: pint3,
  },
  {
    id: '4',
    username: 'lucy_b',
    initials: 'LB',
    avatarColor: '#F59E0B',
    timeAgo: '1d',
    pub: "O'Donoghue's",
    score: 52,
    photo: pint1,
  },
  {
    id: '5',
    username: 'conor_f',
    initials: 'CF',
    avatarColor: '#EF4444',
    timeAgo: '1d',
    pub: "Kehoe's",
    score: 78,
    tag: 'regular',
    photo: pint2,
  },
];

export default function HomeScreen() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-zinc-900">
      <FlatList
        data={DUMMY_FEED}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FeedCard {...item} />}
        contentContainerStyle={{ paddingTop: insets.top + headerHeight + 8, paddingBottom: 96 }}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      />
      {/* Solid zinc-800 block covering the status bar area */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: insets.top,
          backgroundColor: '#18181b',
        }}
      />

      {/* Gradient fade from opaque zinc-800 (top) to transparent (bottom), with buttons sitting inside */}
      <LinearGradient
        colors={['#18181b', 'rgba(24,24,27,0)']}
        style={{ position: 'absolute', top: insets.top, left: 0, right: 0 }}
        onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
      >
        <AppHeader />
      </LinearGradient>
    </View>
  );
}
