import { apiClient } from "../client";
import { endpoints } from "../endpoints";
import { unwrapData } from "../envelope";
import { normalizeProfiles } from "../normalize";


export const profileService = {
  async listProfiles() {
    const { data } = await apiClient.get(
      endpoints.profiles.list
    );
    return normalizeProfiles(unwrapData(data));
  }
};