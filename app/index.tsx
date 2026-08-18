import React, { useEffect, useRef } from "react";
import { useRouter } from "expo-router";

import AnimatedLogoScreen from "../src/screens/startup/AnimatedLogoScreen";
import { useAuth } from "../src/auth/auth.provider";
import { resolvePostSplashPath } from "../src/auth/useAuthRedirect";

const SPLASH_MIN_MS = 2200;

/**
 * Animated splash entry. Redirects once auth hydration finishes
 * and the minimum splash duration elapses.
 */
export default function SplashRoute() {
  const router = useRouter();
  const { status } = useAuth();
  const startedAt = useRef(Date.now());
  const navigated = useRef(false);

  useEffect(() => {
    if (status === "loading" || navigated.current) return;

    let cancelled = false;

    const go = async () => {
      const elapsed = Date.now() - startedAt.current;
      const wait = Math.max(0, SPLASH_MIN_MS - elapsed);

      await new Promise((resolve) => setTimeout(resolve, wait));
      if (cancelled || navigated.current) return;

      const path = await resolvePostSplashPath(
        status === "authenticated" ? "authenticated" : "unauthenticated"
      );

      navigated.current = true;
      router.replace(path as never);
    };

    void go();

    return () => {
      cancelled = true;
    };
  }, [status, router]);

  return <AnimatedLogoScreen />;
}
