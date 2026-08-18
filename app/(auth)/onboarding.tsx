import React from "react";
import { useRouter } from "expo-router";

import OnboardingScreen from "../../src/screens/onboarding/OnboardingScreen";
import { session } from "../../src/auth/session";

export default function OnboardingRoute() {
  const router = useRouter();

  return (
    <OnboardingScreen
      onGetStarted={async () => {
        await session.setOnboardingCompleted(true);
        router.replace("/(auth)/signup");
      }}
      onExplore={async () => {
        await session.setOnboardingCompleted(true);
        router.replace("/(auth)/login");
      }}
    />
  );
}
