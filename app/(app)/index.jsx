import { Redirect } from "expo-router";

import { useAuth } from "../../src/auth";

export default function AppIndexRoute() {
  const { selectedProfileId } = useAuth();

  if (!selectedProfileId) {
    return <Redirect href="/(app)/profile-selection" />;
  }

  return <Redirect href="/(app)/(tabs)" />;
}