import { apiClient } from "../client";
import { endpoints } from "../endpoints";
import type {
  ListProfilesResponse,
  Profile,
  SelectProfileRequest,
  SelectProfileResponse,
} from "../types";

function normalizeProfiles(data: ListProfilesResponse): Profile[] {
  if (Array.isArray(data.profiles)) return data.profiles;
  if (Array.isArray(data.data)) return data.data;
  return [];
}

/**
 * Profile API service (authenticated).
 * UI for selection can stay basic — this is the architectural hook.
 */
export const profileService = {
  async listProfiles(): Promise<Profile[]> {
    const { data } = await apiClient.get<ListProfilesResponse>(
      endpoints.profiles.list
    );
    return normalizeProfiles(data);
  },

  /**
   * TODO(backend-contract): Confirm whether selection is a server call
   * or purely client-side persistence.
   */
  selectProfile(payload: SelectProfileRequest) {
    return apiClient
      .post<SelectProfileResponse>(endpoints.profiles.select, payload)
      .then((res) => res.data);
  },
};
