import AsyncStorage from "@react-native-async-storage/async-storage";

import type { AuthTokens, AuthUser } from "./auth.types";

const ACCESS_TOKEN_KEY = "monosekai.auth.accessToken";
const REFRESH_TOKEN_KEY = "monosekai.auth.refreshToken";
const USER_KEY = "monosekai.auth.user";
const ONBOARDING_KEY = "monosekai.onboarding.completed";
const SELECTED_PROFILE_KEY = "monosekai.profile.selected";

/**
 * Token storage abstraction.
 *
 * SECURITY:
 * Refresh tokens are sensitive. AsyncStorage is NOT a secure enclave.
 * For production builds, install and switch refresh-token persistence to
 * `expo-secure-store` (keep access token short-lived; store refresh in SecureStore).
 *
 * Swap by replacing `asyncTokenStorage` with a SecureStore-backed implementation
 * of `TokenStorage` below — session.ts call sites do not need to change.
 */
export interface TokenStorage {
  getAccessToken(): Promise<string | null>;
  setAccessToken(token: string): Promise<void>;
  getRefreshToken(): Promise<string | null>;
  setRefreshToken(token: string): Promise<void>;
  clearTokens(): Promise<void>;
}

/**
 * DEV / foundation default.
 * TODO(security): Replace refresh token methods with expo-secure-store before production auth launch.
 *
 * Required dependency for production:
 *   npx expo install expo-secure-store
 *
 * Use SecureStore for:
 *   - refreshToken (required)
 *   - optionally accessToken if you want defense-in-depth
 * Keep non-secret prefs (onboarding flag, selected profile id) in AsyncStorage.
 */
const asyncTokenStorage: TokenStorage = {
  async getAccessToken() {
    return AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  },
  async setAccessToken(token: string) {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
  },
  async getRefreshToken() {
    return AsyncStorage.getItem(REFRESH_TOKEN_KEY);
  },
  async setRefreshToken(token: string) {
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, token);
  },
  async clearTokens() {
    await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
  },
};

let tokenStorage: TokenStorage = asyncTokenStorage;
let memoryAccessToken: string | null = null;
let memoryRefreshToken: string | null = null;
let memoryUser: AuthUser | null = null;
let apiBaseUrl = "";

export type PersistedSession = {
  user: AuthUser;
  tokens: AuthTokens;
};

export const session = {
  setTokenStorage(next: TokenStorage) {
    tokenStorage = next;
  },

  setApiBaseUrl(url: string) {
    apiBaseUrl = url ?? "";
  },

  getApiBaseUrl() {
    return apiBaseUrl;
  },

  getAccessToken() {
    return memoryAccessToken;
  },

  getRefreshToken() {
    return memoryRefreshToken;
  },

  getUser() {
    return memoryUser;
  },

  async hydrate(): Promise<PersistedSession | null> {
    const [accessToken, refreshToken, userRaw] = await Promise.all([
      tokenStorage.getAccessToken(),
      tokenStorage.getRefreshToken(),
      AsyncStorage.getItem(USER_KEY),
    ]);

    memoryAccessToken = accessToken;
    memoryRefreshToken = refreshToken;

    if (!accessToken || !userRaw) {
      memoryUser = null;
      return null;
    }

    try {
      memoryUser = JSON.parse(userRaw) as AuthUser;
    } catch {
      memoryUser = null;
      await this.clear();
      return null;
    }

    return {
      user: memoryUser,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  },

  async setSession(input: {
    user: AuthUser;
    accessToken: string;
    refreshToken?: string | null;
  }) {
    memoryUser = input.user;
    memoryAccessToken = input.accessToken;
    memoryRefreshToken = input.refreshToken ?? null;

    const writes: Promise<void>[] = [
      tokenStorage.setAccessToken(input.accessToken),
      AsyncStorage.setItem(USER_KEY, JSON.stringify(input.user)),
    ];

    if (input.refreshToken) {
      writes.push(tokenStorage.setRefreshToken(input.refreshToken));
    } else {
      writes.push(
        tokenStorage.setRefreshToken("").then(async () => {
          await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
        })
      );
    }

    await Promise.all(writes);
  },

  async setTokens(tokens: AuthTokens) {
    memoryAccessToken = tokens.accessToken;
    memoryRefreshToken = tokens.refreshToken;

    await Promise.all([
      tokenStorage.setAccessToken(tokens.accessToken),
      tokens.refreshToken
        ? tokenStorage.setRefreshToken(tokens.refreshToken)
        : AsyncStorage.removeItem(REFRESH_TOKEN_KEY),
    ]);
  },

  async clear() {
    memoryAccessToken = null;
    memoryRefreshToken = null;
    memoryUser = null;

    await Promise.all([
      tokenStorage.clearTokens(),
      AsyncStorage.removeItem(USER_KEY),
    ]);
  },

  async getOnboardingCompleted(): Promise<boolean> {
    const value = await AsyncStorage.getItem(ONBOARDING_KEY);
    return value === "1";
  },

  async setOnboardingCompleted(completed: boolean): Promise<void> {
    if (completed) {
      await AsyncStorage.setItem(ONBOARDING_KEY, "1");
    } else {
      await AsyncStorage.removeItem(ONBOARDING_KEY);
    }
  },

  async getSelectedProfileId(): Promise<string | null> {
    return AsyncStorage.getItem(SELECTED_PROFILE_KEY);
  },

  async setSelectedProfileId(profileId: string | null): Promise<void> {
    if (!profileId) {
      await AsyncStorage.removeItem(SELECTED_PROFILE_KEY);
      return;
    }
    await AsyncStorage.setItem(SELECTED_PROFILE_KEY, profileId);
  },
};
