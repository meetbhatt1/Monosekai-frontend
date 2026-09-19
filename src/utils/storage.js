import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Thin AsyncStorage helpers for non-secret app preferences.
 * Do NOT use this for refresh tokens in production — see session token storage.
 */
export async function getString(key) {
  return AsyncStorage.getItem(key);
}

export async function setString(key, value) {
  await AsyncStorage.setItem(key, value);
}

export async function remove(key) {
  await AsyncStorage.removeItem(key);
}

export async function getJson(key) {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function setJson(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}