import { BlurView } from 'expo-blur';
import { Bell, Search } from 'lucide-react-native';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import profileImage from '../../assets/profile.jpg';

// TODO: wire up onSearchPress to navigate to a search screen
// TODO: wire up onNotificationsPress to navigate to a notifications screen
// TODO: show unread badge on bell when there are unseen notifications
// TODO: replace static profile image with authenticated user's avatar

type Props = {
  onSearchPress?: () => void;
  onNotificationsPress?: () => void;
  onProfilePress?: () => void;
};

function IconButton({ onPress, children }: { onPress?: () => void; children: React.ReactNode }) {
  return (
    <Pressable
      onPress={onPress}
      className="w-12 h-12 rounded-full overflow-hidden border border-zinc-700 active:opacity-70"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 8,
      }}
    >
      <BlurView intensity={5} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(39,39,42,0.8)' }]} />
      <View style={StyleSheet.absoluteFill} className="items-center justify-center">
        {children}
      </View>
    </Pressable>
  );
}

export function AppHeader({ onSearchPress, onNotificationsPress, onProfilePress }: Props) {
  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      <IconButton onPress={onSearchPress}>
        <Search size={20} stroke="#f4f4f5" />
      </IconButton>
      <View className="flex-row gap-3">
        <IconButton onPress={onNotificationsPress}>
          <Bell size={20} stroke="#f4f4f5" />
        </IconButton>
        <Pressable
          onPress={onProfilePress}
          className="w-12 h-12 rounded-full overflow-hidden active:opacity-70"
        >
          <Image source={profileImage} className="w-full h-full" resizeMode="cover" />
        </Pressable>
      </View>
    </View>
  );
}
