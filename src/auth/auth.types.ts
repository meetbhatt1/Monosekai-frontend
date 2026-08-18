/**
 * Auth domain types (client-side).
 * Keep separate from transport DTOs in src/api/types.ts where useful.
 */

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

/**
 * TODO(backend-contract): Confirm canonical user fields after login / OTP.
 */
export type AuthUser = {
  id: string;
  email: string;
  emailVerified?: boolean;
  displayName?: string | null;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string | null;
};

export type AuthState = {
  status: AuthStatus;
  user: AuthUser | null;
  accessToken: string | null;
};

/**
 * Selected profile is client/global state (not server cache).
 * TODO(backend-contract): Confirm profile selection persistence model.
 */
export type SelectedProfile = {
  id: string;
  name: string;
  avatarUrl?: string | null;
};
