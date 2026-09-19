import Constants from "expo-constants";





function readExtra() {
  const extra =
  Constants.expoConfig?.extra ??
  Constants.manifest?.extra ??
  {};

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
  ""
};