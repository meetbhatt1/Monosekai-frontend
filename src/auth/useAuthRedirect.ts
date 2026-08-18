import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";

import { useAuth } from "./auth.provider";
import { session } from "./session";

/**
 * Centralized auth redirects. Do not navigate based on auth from random UI.
 * Screen-to-screen links (login ↔ signup) remain local to those screens.
 */
export function useAuthRedirect() {
  const { status } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (status === "loading") return;

    const root = segments[0];
    const inAuthGroup = root === "(auth)";
    const inAppGroup = root === "(app)";
    const onSplash = !root || root === "index";

    if (status === "unauthenticated") {
      if (inAppGroup) {
        router.replace("/(auth)/login");
      }
      return;
    }

    if (status === "authenticated") {
      if (inAuthGroup || onSplash) {
        router.replace("/(app)/profile-selection");
      }
    }
  }, [status, segments, router]);
}

export async function resolvePostSplashPath(
  status: "authenticated" | "unauthenticated"
): Promise<string> {
  if (status === "authenticated") {
    return "/(app)/profile-selection";
  }

  const seenOnboarding = await session.getOnboardingCompleted();
  return seenOnboarding ? "/(auth)/login" : "/(auth)/onboarding";
}
