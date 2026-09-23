import { MapPin, MoreHorizontal } from 'lucide-react-native';
import { Image, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

// TODO: replace FeedCardProps with a type derived from the Supabase 'splits' table row + joined user/pub data
export type FeedCardProps = {
  id: string;
  username: string;
  initials: string;
  avatarColor: string;
  timeAgo: string;
  pub: string;
  score: number;
  // TODO: derive tag from relationship type (friend, follower) or user-set label from Supabase
  tag?: string;
  // TODO: replace with a Supabase storage URL string once real uploads are wired up
  photo?: number;
};

// TODO: drive tag colors from a server-defined tag type enum once tags are in Supabase
const TAG_STYLES: Record<string, { bg: string; text: string }> = {
  friend: { bg: '#1d4ed8', text: '#bfdbfe' }, // blue
  'local drunk': { bg: '#78350f', text: '#fde68a' }, // amber
  regular: { bg: '#14532d', text: '#86efac' }, // green
  legend: { bg: '#581c87', text: '#e9d5ff' }, // purple
};
const DEFAULT_TAG_STYLE = { bg: '#3f3f46', text: '#d4d4d8' }; // zinc fallback

function tagStyle(tag: string) {
  return TAG_STYLES[tag.toLowerCase()] ?? DEFAULT_TAG_STYLE;
}

const STAMP_SIZE = 72;
const STROKE_WIDTH = 3;
const RADIUS = (STAMP_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function ScoreStamp({ score }: { score: number }) {
  const progress = score / 100;
  const offset = CIRCUMFERENCE * (1 - progress);

  return (
    <View
      style={{
        position: 'absolute',
        top: 10,
        right: 10,
        width: STAMP_SIZE,
        height: STAMP_SIZE,
      }}
    >
      {/* SVG circular progress ring */}
      <Svg width={STAMP_SIZE} height={STAMP_SIZE} style={{ position: 'absolute' }}>
        {/* Background track */}
        <Circle
          cx={STAMP_SIZE / 2}
          cy={STAMP_SIZE / 2}
          r={RADIUS}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={STROKE_WIDTH}
          fill="rgba(0,0,0,0.55)"
        />
        {/* Progress arc — starts at 12 o'clock, traces clockwise by score% */}
        <Circle
          cx={STAMP_SIZE / 2}
          cy={STAMP_SIZE / 2}
          r={RADIUS}
          stroke="rgba(255,255,255,0.85)"
          strokeWidth={STROKE_WIDTH}
          fill="transparent"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90, ${STAMP_SIZE / 2}, ${STAMP_SIZE / 2})`}
        />
      </Svg>

      {/* Score label centered inside the ring */}
      <View
        style={{ position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text style={{ color: '#fff', fontSize: 26, fontWeight: '700', lineHeight: 30 }}>
          {score}
        </Text>
      </View>
    </View>
  );
}

export function FeedCard({
  username,
  initials,
  avatarColor,
  timeAgo,
  pub,
  score,
  tag,
  photo,
}: FeedCardProps) {
  return (
    <View
      className="bg-zinc-850 rounded-[32px] mx-4 mb-4 border border-zinc-700"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.45,
        shadowRadius: 16,
        elevation: 12,
      }}
    >
      {/* Header row */}
      {/* Avatar · username · time — all on one line */}
      <View className="flex-row items-center gap-3 px-5 pt-5 pb-1">
        {/* TODO: replace initials avatar with user's profile photo from Supabase storage */}
        <View
          className="w-9 h-9 rounded-full items-center justify-center"
          style={{ backgroundColor: avatarColor }}
        >
          <Text className="text-white text-sm font-bold">{initials}</Text>
        </View>
        {/* TODO: make username tappable — navigate to user profile */}
        <View className="flex-1 flex-row items-center gap-2">
          <Text className="text-white font-semibold text-xl">{username}</Text>
          {tag && (
            <View
              style={{ backgroundColor: tagStyle(tag).bg }}
              className="rounded-full px-2.5 py-1"
            >
              <Text style={{ color: tagStyle(tag).text }} className="text-sm font-medium">
                {tag}
              </Text>
            </View>
          )}
        </View>
        <Text className="text-zinc-400 text-base">{timeAgo}</Text>
        {/* TODO: wire up to a context menu (report, hide, share) */}
        <MoreHorizontal size={20} stroke="#71717a" />
      </View>

      {/* Pub name */}
      <View className="flex-row items-center gap-1.5 px-5 pb-3">
        <MapPin size={13} stroke="#a1a1aa" />
        {/* TODO: make pub name tappable — navigate to pub page */}
        <Text className="text-white text-xl font-bold">{pub}</Text>
      </View>

      {/* Pint photo with score stamp */}
      {/* TODO: derive score from uploaded photo analysis or manual user input */}
      <View
        className="mx-4 mb-4 rounded-3xl overflow-hidden bg-zinc-750"
        style={{ aspectRatio: 4 / 3 }}
      >
        {photo ? (
          // TODO: swap static require() for expo-image <Image> with a Supabase storage URI
          <Image source={photo} className="w-full h-full" resizeMode="cover" />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-zinc-700 text-sm">Pint photo</Text>
          </View>
        )}

        <ScoreStamp score={score} />
      </View>
    </View>
  );
}
