import { MapPin } from 'lucide-react-native';
import { Image, Text, View } from 'react-native';

// TODO: replace FeedCardProps with a type derived from the Supabase 'splits' table row + joined user/pub data
export type FeedCardProps = {
  id: string;
  username: string;
  initials: string;
  avatarColor: string;
  timeAgo: string;
  pub: string;
  score: number;
  // TODO: replace with a Supabase storage URL string once real uploads are wired up
  photo?: number;
};

export function FeedCard({
  username,
  initials,
  avatarColor,
  timeAgo,
  pub,
  score,
  photo,
}: FeedCardProps) {
  return (
    <View className="bg-zinc-900 rounded-2xl overflow-hidden mx-4 mb-4">
      {/* Header row */}
      <View className="flex-row items-center justify-between px-4 pt-4 pb-3">
        <View className="flex-row items-center gap-3">
          {/* TODO: replace initials avatar with user's profile photo from Supabase storage */}
          <View
            className="w-11 h-11 rounded-full items-center justify-center"
            style={{ backgroundColor: avatarColor }}
          >
            <Text className="text-white text-sm font-bold">{initials}</Text>
          </View>

          <View>
            {/* TODO: make username tappable — navigate to user profile */}
            <Text className="text-white font-semibold text-sm">{username}</Text>
            <View className="flex-row items-center gap-1 mt-0.5">
              <MapPin size={11} stroke="#71717a" />
              {/* TODO: make pub name tappable — navigate to pub page */}
              <Text className="text-zinc-500 text-xs">{pub}</Text>
            </View>
          </View>
        </View>

        <Text className="text-zinc-500 text-xs">{timeAgo}</Text>
      </View>

      {/* Pint photo */}
      <View className="w-full bg-zinc-800" style={{ aspectRatio: 4 / 3 }}>
        {photo ? (
          // TODO: swap static require() for expo-image <Image> with a Supabase storage URI
          <Image source={photo} className="w-full h-full" resizeMode="cover" />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-zinc-700 text-sm">Pint photo</Text>
          </View>
        )}
      </View>

      {/* Score footer */}
      <View className="flex-row items-baseline gap-1.5 px-4 py-3">
        {/* TODO: derive score from uploaded photo analysis or manual user input */}
        <Text className="text-white text-3xl font-bold">{score}</Text>
        <Text className="text-zinc-500 text-base">/100</Text>
        <Text className="text-zinc-500 text-sm ml-1">Split Score</Text>
      </View>
    </View>
  );
}
