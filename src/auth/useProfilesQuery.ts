import { useQuery } from "@tanstack/react-query";

import { profileService } from "../api/services/profile.service";
import { useAuth } from "./auth.provider";

export const profileKeys = {
  all: ["profiles"] as const,
  list: () => [...profileKeys.all, "list"] as const,
};

export function useProfilesQuery(enabled = true) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: profileKeys.list(),
    queryFn: () => profileService.listProfiles(),
    enabled: enabled && isAuthenticated,
  });
}
