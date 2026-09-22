import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';

function TabIcon({ focused }: { focused: boolean }) {
  return (
    <View
      style={{
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: focused ? '#3B82F6' : 'transparent',
        borderWidth: 2,
        borderColor: focused ? '#3B82F6' : '#52525b',
      }}
    />
  );
}

function AddIcon() {
  return (
    <View
      style={{
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#3B82F6',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: '#fff', fontSize: 28, lineHeight: 32, fontWeight: '300' }}>+</Text>
    </View>
  );
}

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#52525b',
        tabBarStyle: {
          backgroundColor: '#18181b',
          paddingHorizontal: 16,
          borderTopWidth: 1,
          borderTopColor: '#09090b',
          height: 80,
          paddingBottom: 32,
          paddingTop: 14,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 16,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Home', tabBarIcon: ({ focused }) => <TabIcon focused={focused} /> }}
      />
      <Tabs.Screen
        name="community"
        options={{ title: 'Community', tabBarIcon: ({ focused }) => <TabIcon focused={focused} /> }}
      />
      <Tabs.Screen
        name="add"
        options={{ title: '', tabBarIcon: () => <AddIcon />, tabBarLabel: () => null }}
      />
      <Tabs.Screen
        name="stats"
        options={{ title: 'Stats', tabBarIcon: ({ focused }) => <TabIcon focused={focused} /> }}
      />
      <Tabs.Screen
        name="you"
        options={{ title: 'You', tabBarIcon: ({ focused }) => <TabIcon focused={focused} /> }}
      />
      <Tabs.Screen name="items/new" options={{ href: null }} />
    </Tabs>
  );
}
