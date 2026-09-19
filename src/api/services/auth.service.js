import { apiClient } from "../client";
import { endpoints } from "../endpoints";
import { unwrapData, unwrapDataOrUndefined } from "../envelope";
import { normalizeProfiles, normalizeProfile, normalizeUser } from "../normalize";









export const authService = {
  async register(payload) {
    const { data } = await apiClient.post(
      endpoints.auth.register,
      payload
    );
    const inner = unwrapData(data);
    const user = normalizeUser(inner.user);
    const profile = normalizeProfile(inner.profile);
    if (!user || !inner.token) {
      throw new Error(data.message || "Registration did not return a session");
    }
    return {
      user,
      profile: profile ?? { id: "", name: user.displayName || "Profile" },
      token: inner.token
    };
  },

  async login(payload) {
    const { data } = await apiClient.post(
      endpoints.auth.login,
      payload
    );
    const inner = unwrapData(data);
    const user = normalizeUser(inner.user, payload.email);
    if (!user || !inner.token) {
      throw new Error(data.message || "Login did not return a session token");
    }
    return {
      user,
      profiles: normalizeProfiles(inner.profiles),
      token: inner.token
    };
  },

  async forgotPassword(payload) {
    const { data } = await apiClient.post(
      endpoints.auth.forgotPassword,
      payload
    );
    unwrapDataOrUndefined(data);
    return data.message || "If the account exists, a reset email has been sent.";
  },

  async selectProfile(profileId) {
    const { data } = await apiClient.post(
      endpoints.auth.selectProfile(profileId)
    );
    const inner = unwrapData(data);
    const profile = normalizeProfile(inner.profile);
    if (!profile || !inner.token) {
      throw new Error(data.message || "Profile selection did not return a session");
    }
    return { profile, token: inner.token };
  }
};