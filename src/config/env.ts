import Constants from "expo-constants";

type ExtraConfig = {
  apiBaseUrl?: string;
};

function readExtra(): ExtraConfig {
  const extra =
    (Constants.expoConfig?.extra as ExtraConfig | undefined) ??
    ((Constants as { manifest?: { extra?: ExtraConfig } }).manifest?.extra ??
      {});

  return extra ?? {};
}

/**
 * Central app configuration derived from Expo Constants / EXPO_PUBLIC_* env.
 * Do not hardcode API URLs elsewhere.
 */
export const env = {
  apiBaseUrl:
    process.env.EXPO_PUBLIC_API_BASE_URL?.trim() ||
    readExtra().apiBaseUrl?.trim() ||
    "",
} as const;
