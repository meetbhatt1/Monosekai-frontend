import { Tabs } from "expo-router";

export default function AppTabsLayout() {
  return (
    <Tabs tabBar={() => null} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="browse" />
      <Tabs.Screen name="watchlist" />
      <Tabs.Screen name="downloads" />
      <Tabs.Screen name="profile" />
    </Tabs>);

}