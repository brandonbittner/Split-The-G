import { Bell, Search } from 'lucide-react-native';
import { Image, Pressable, View } from 'react-native';

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
      className="w-12 h-12 rounded-full bg-zinc-700 items-center justify-center active:opacity-70"
    >
      {children}
    </Pressable>
  );
}

export function AppHeader({ onSearchPress, onNotificationsPress, onProfilePress }: Props) {
  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      <IconButton onPress={onSearchPress}>
        <Search size={20} stroke="#a1a1aa" />
      </IconButton>
      <View className="flex-row gap-3">
        <IconButton onPress={onNotificationsPress}>
          <Bell size={20} stroke="#a1a1aa" />
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
