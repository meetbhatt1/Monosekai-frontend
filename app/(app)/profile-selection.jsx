import React from "react";
import { ActivityIndicator, Pressable } from "react-native";

import { Screen } from "../../src/ui/primitives/Screen";
import { Stack } from "../../src/ui/primitives/Stack";
import { AppText } from "../../src/ui/primitives/AppText";
import { AppButton } from "../../src/ui/primitives/AppButton";
import { Surface } from "../../src/ui/primitives/Surface";
import { theme } from "../../src/theme";
import {
  useLogoutMutation,
  useProfilesQuery,
  useSelectProfileMutation } from
"../../src/auth";
import { normalizeApiError } from "../../src/utils/api-error";

export default function ProfileSelectionRoute() {
  const profilesQuery = useProfilesQuery();
  const selectProfile = useSelectProfileMutation();
  const logout = useLogoutMutation();

  const profiles = profilesQuery.data ?? [];
  const busy = selectProfile.isPending;
  const selectError = selectProfile.error ?
  normalizeApiError(selectProfile.error).message :
  null;

  return (
    <Screen padded>
      <Stack gap="xl" style={{ flex: 1, paddingTop: 48 }}>
        <Stack gap="xs">
          <AppText variant="h1">Who&apos;s watching?</AppText>
          <AppText variant="body" tone="secondary">
            Choose a profile to continue.
          </AppText>
        </Stack>

        {profilesQuery.isLoading ?
        <ActivityIndicator color={theme.colors.primary} /> :
        null}

        {profilesQuery.isError ?
        <Stack gap="sm">
            <AppText tone="error" variant="body">
              {normalizeApiError(profilesQuery.error).message}
            </AppText>
            <AppButton
            title="Try again"
            variant="soft"
            onPress={() => void profilesQuery.refetch()} />
          
          </Stack> :
        null}

        {!profilesQuery.isLoading &&
        !profilesQuery.isError &&
        profiles.length === 0 ?
        <AppText variant="body" tone="secondary">
            No profiles on this account yet.
          </AppText> :
        null}

        {selectError ?
        <AppText tone="error" variant="caption">
            {selectError}
          </AppText> :
        null}

        <Stack gap="md">
          {profiles.map((profile) =>
          <Pressable
            key={profile.id}
            disabled={busy}
            onPress={() => selectProfile.mutate(profile.id)}>
            
              <Surface
              variant="outlined"
              style={{ padding: theme.spacing[4], opacity: busy ? 0.6 : 1 }}>
              
                <AppText variant="h3">{profile.name}</AppText>
                {profile.isKids ?
              <AppText variant="caption" tone="muted">
                    Kids
                  </AppText> :
              null}
              </Surface>
            </Pressable>
          )}
        </Stack>

        {busy ? <ActivityIndicator color={theme.colors.primary} /> : null}

        <AppButton
          title="Sign out"
          variant="ghost"
          loading={logout.isPending}
          onPress={() => logout.mutate()} />
        
      </Stack>
    </Screen>);

}