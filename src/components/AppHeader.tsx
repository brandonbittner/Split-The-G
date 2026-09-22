import { Bell, Search } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

// TODO: wire up onSearchPress to navigate to a search screen
// TODO: wire up onNotificationsPress to navigate to a notifications screen
// TODO: show unread badge on bell when there are unseen notifications

type Props = {
  onSearchPress?: () => void;
  onNotificationsPress?: () => void;
};

function IconButton({ onPress, children }: { onPress?: () => void; children: React.ReactNode }) {
  return (
    <Pressable
      onPress={onPress}
      className="w-10 h-10 rounded-full bg-zinc-700 items-center justify-center active:opacity-70"
    >
      {children}
    </Pressable>
  );
}

export function AppHeader({ onSearchPress, onNotificationsPress }: Props) {
  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      <IconButton onPress={onSearchPress}>
        <Search size={18} stroke="#a1a1aa" />
      </IconButton>
      <IconButton onPress={onNotificationsPress}>
        <Bell size={18} stroke="#a1a1aa" />
      </IconButton>
    </View>
  );
}
