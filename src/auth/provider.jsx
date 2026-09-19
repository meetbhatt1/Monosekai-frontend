import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore } from
"react";
import { useRouter, useSegments } from "expo-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { authService } from "../api/services/auth.service";
import { profileService } from "../api/services/profile.service";

import { auth, session } from "./auth";

// --- context ---









const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const state = useSyncExternalStore(auth.subscribe, auth.getState, auth.getState);

  useEffect(() => {
    void auth.hydrate();
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      isLoading: state.status === "loading",
      isAuthenticated: state.status === "authenticated",
      hasSelectedProfile: Boolean(state.selectedProfileId),
      signOut: () => auth.signOut(),
      markOnboardingComplete: () => session.setOnboardingCompleted(true)
    }),
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

// --- routing ---

export function useAuthRedirect() {
  const { status, selectedProfileId } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (status === "loading") return;

    const root = segments[0];
    const leaf = segments[segments.length - 1];
    const inAuth = root === "(auth)";
    const inApp = root === "(app)";
    const onSplash = !root || root === "index";
    const onProfilePick = inApp && leaf === "profile-selection";
    const inTabs = segments.includes("(tabs)");

    if (status === "unauthenticated") {
      if (inApp) router.replace("/(auth)/login");
      return;
    }

    if (!selectedProfileId) {
      if (!onProfilePick) router.replace("/(app)/profile-selection");
      return;
    }

    if (inAuth || onSplash || onProfilePick) {
      router.replace("/(app)/(tabs)");
    } else if (inApp && !inTabs && !onProfilePick) {
      router.replace("/(app)/(tabs)");
    }
  }, [status, selectedProfileId, segments, router]);
}

export async function resolvePostSplashPath(
status)
{
  if (status === "authenticated") {
    const selected = await session.getSelectedProfileId();
    return selected ? "/(app)/(tabs)" : "/(app)/profile-selection";
  }
  const seen = await session.getOnboardingCompleted();
  return seen ? "/(auth)/login" : "/(auth)/onboarding";
}

// --- profiles query ---

const profileKeys = {
  all: ["profiles"],
  list: () => [...profileKeys.all, "list"]
};

export function useProfilesQuery(enabled = true) {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: profileKeys.list(),
    queryFn: () => profileService.listProfiles(),
    enabled: enabled && isAuthenticated
  });
}

// --- auth mutations ---

export function useLoginMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: (input) => authService.login(input),
    onSuccess: async (data) => {
      await auth.signIn({
        user: data.user,
        accessToken: data.token,
        selectedProfileId: null
      });
      queryClient.setQueryData(profileKeys.list(), data.profiles);
    }
  });
}

export function useRegisterMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["auth", "register"],
    mutationFn: (input) => authService.register(input),
    onSuccess: async (data) => {
      await auth.signIn({
        user: data.user,
        accessToken: data.token,
        selectedProfileId: data.profile.id || null
      });
      if (data.profile.id) {
        queryClient.setQueryData(profileKeys.list(), [data.profile]);
      }
    }
  });
}

export function useSelectProfileMutation() {
  return useMutation({
    mutationKey: ["auth", "select-profile"],
    mutationFn: (profileId) => authService.selectProfile(profileId),
    onSuccess: (data) => auth.selectProfile(data.profile.id, data.token)
  });
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationKey: ["auth", "forgot-password"],
    mutationFn: (input) => authService.forgotPassword(input)
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["auth", "logout"],
    mutationFn: async () => {
      await auth.signOut();
      queryClient.clear();
    }
  });
}