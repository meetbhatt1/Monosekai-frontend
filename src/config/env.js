import Constants from "expo-constants";
import { Platform } from "react-native";

function readExtra() {
  const extra = Constants.expoConfig?.extra ?? Constants.manifest?.extra ?? {};
  return extra ?? {};
}

/**
 * Expo Go / device cannot reach the Mac via `localhost`.
 * Prefer the same LAN host Metro is already using (hostUri / debuggerHost).
 */
function resolveDevHost() {
  const hostUri =
    Constants.expoConfig?.hostUri ??
    Constants.manifest2?.extra?.expoGo?.debuggerHost ??
    Constants.manifest?.debuggerHost ??
    "";

  const host = String(hostUri).split(":")[0]?.trim();
  if (host && host !== "localhost" && host !== "127.0.0.1") {
    return host;
  }

  // Android emulator loopback to the host machine
  if (Platform.OS === "android") return "10.0.2.2";
  return "localhost";
}

function defaultApiBaseUrl() {
  return `http://${resolveDevHost()}:8000/api`;
}

/**
 * Central app configuration derived from Expo Constants / EXPO_PUBLIC_* env.
 * baseURL must include `/api` — endpoints are `/auth/...`, `/profile`, etc.
 * Do not hardcode API URLs elsewhere.
 */
export const env = {
  apiBaseUrl:
    process.env.EXPO_PUBLIC_API_BASE_URL?.trim() ||
    readExtra().apiBaseUrl?.trim() ||
    defaultApiBaseUrl(),
};

if (__DEV__) {
  // Helps diagnose Axios "Network Error" (wrong host / missing /api).
  console.log(`[api] baseURL = ${env.apiBaseUrl}`);
}
