import React from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { useRouter } from "expo-router";

import { Screen } from "../../src/ui/primitives/Screen";
import { Stack } from "../../src/ui/primitives/Stack";
import { AppText } from "../../src/ui/primitives/AppText";
import { AppButton } from "../../src/ui/primitives/AppButton";
import { Surface } from "../../src/ui/primitives/Surface";
import { theme } from "../../src/theme";
import { useProfilesQuery } from "../../src/auth/useProfilesQuery";
import { session } from "../../src/auth/session";
import { useLogoutMutation } from "../../src/auth/auth.mutations";
import { normalizeApiError } from "../../src/utils/api-error";

/**
 * Architectural placeholder for profile selection.
 * Fetches profiles when authenticated; selection persists locally for now.
 */
export default function ProfileSelectionRoute() {
  const router = useRouter();
  const profilesQuery = useProfilesQuery();
  const logout = useLogoutMutation();

  const profiles = profilesQuery.data ?? [];

  const selectProfile = async (profileId: string) => {
    await session.setSelectedProfileId(profileId);
    // TODO(backend-contract): Call profileService.selectProfile when confirmed.
    router.replace("/(app)");
  };

  return (
    <Screen padded>
      <Stack gap="xl" style={{ flex: 1, paddingTop: 48 }}>
        <Stack gap="xs">
          <AppText variant="h1">Who&apos;s watching?</AppText>
          <AppText variant="body" tone="secondary">
            Choose a profile to continue.
          </AppText>
        </Stack>

        {profilesQuery.isLoading ? (
          <ActivityIndicator color={theme.colors.primary} />
        ) : null}

        {profilesQuery.isError ? (
          <Stack gap="sm">
            <AppText tone="error" variant="body">
              {normalizeApiError(profilesQuery.error).message}
            </AppText>
            <AppText variant="caption" tone="secondary">
              Profiles API may be unavailable until the backend is connected.
              You can continue with a local placeholder.
            </AppText>
            <AppButton
              title="Continue anyway"
              variant="soft"
              onPress={async () => {
                await session.setSelectedProfileId("local-default");
                router.replace("/(app)");
              }}
            />
          </Stack>
        ) : null}

        {!profilesQuery.isLoading &&
        !profilesQuery.isError &&
        profiles.length === 0 ? (
          <Stack gap="sm">
            <AppText variant="body" tone="secondary">
              No profiles returned yet.
            </AppText>
            <AppButton
              title="Continue"
              variant="primary"
              onPress={async () => {
                await session.setSelectedProfileId("local-default");
                router.replace("/(app)");
              }}
            />
          </Stack>
        ) : null}

        <Stack gap="md">
          {profiles.map((profile) => (
            <Pressable
              key={profile.id}
              onPress={() => void selectProfile(profile.id)}
            >
              <Surface
                variant="outlined"
                style={{ padding: theme.spacing[4] }}
              >
                <AppText variant="h3">{profile.name}</AppText>
                {profile.isKids ? (
                  <AppText variant="caption" tone="muted">
                    Kids
                  </AppText>
                ) : null}
              </Surface>
            </Pressable>
          ))}
        </Stack>

        <AppButton
          title="Sign out"
          variant="ghost"
          loading={logout.isPending}
          onPress={() => logout.mutate()}
        />
      </Stack>
    </Screen>
  );
}
