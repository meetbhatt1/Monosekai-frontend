import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

import { authStore } from "./auth.store";
import type { AuthState, AuthUser } from "./auth.types";
import { session } from "./session";

type AuthContextValue = AuthState & {
  isLoading: boolean;
  isAuthenticated: boolean;
  setAuthenticated: (input: {
    user: AuthUser;
    accessToken: string;
    refreshToken?: string | null;
  }) => Promise<void>;
  signOutLocal: () => Promise<void>;
  markOnboardingComplete: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function useAuthStoreState(): AuthState {
  return useSyncExternalStore(
    authStore.subscribe,
    authStore.getState,
    authStore.getState
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const state = useAuthStoreState();

  useEffect(() => {
    void authStore.hydrate();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      isLoading: state.status === "loading",
      isAuthenticated: state.status === "authenticated",
      setAuthenticated: (input) => authStore.setAuthenticated(input),
      signOutLocal: () => authStore.clearSession(),
      markOnboardingComplete: () => session.setOnboardingCompleted(true),
    }),
    [state]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
