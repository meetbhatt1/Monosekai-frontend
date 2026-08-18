import React from "react";
import { ScrollView, View } from "react-native";

import {
  AppButton,
  AppText,
  Badge,
  BottomNav,
  GradientSurface,
  Icon,
  IconButton,
  MediaFrame,
  MediaPlaceholder,
  Screen,
  SettingRow,
  Stack,
  Surface,
} from "../../ui";
import { useResponsive, useTheme } from "../../theme";

const STATS = [
  { value: "124h", label: "Watch Time" },
  { value: "37", label: "Completed" },
  { value: "56", label: "Anime List" },
] as const;

const MENU_ITEMS = [
  { label: "Watch History", icon: "time-outline" as const },
  { label: "Liked Anime", icon: "heart-outline" as const },
  { label: "Account Settings", icon: "person-circle-outline" as const },
  { label: "Downloads", icon: "download-outline" as const },
] as const;

export default function ProfileScreen() {
  const theme = useTheme();
  const { horizontalPadding } = useResponsive();

  return (
    <Screen>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: horizontalPadding,
          paddingTop: theme.spacing[4],
          paddingBottom: theme.spacing[4],
          gap: theme.spacing[5],
        }}
      >
        <Stack direction="horizontal" justify="flex-end">
          <IconButton
            accessibilityLabel="Open settings"
            variant="soft"
            size="sm"
            icon={<Icon name="settings-outline" size={20} tone="brand" />}
          />
        </Stack>

        <Stack align="center" gap={3}>
          <View style={{ width: 96, height: 96 }}>
            <MediaFrame ratio="avatar" radius="pill">
              <MediaPlaceholder icon="person" tone="brand" />
            </MediaFrame>
          </View>

          <Stack direction="horizontal" align="center" gap={1}>
            <AppText variant="h2">Hikari</AppText>
            <AppText variant="h2" style={{ color: theme.colors.accent }}>
              +
            </AppText>
          </Stack>

          <AppText variant="caption" tone="muted">
            @hikari.watch
          </AppText>

          <Badge label="Premium" tone="brand" icon="sparkles" />
        </Stack>

        <Stack direction="horizontal" gap={3}>
          {STATS.map((stat) => (
            <Surface
              key={stat.label}
              variant="soft"
              radius="lg"
              padding={4}
              style={{ flex: 1 }}
            >
              <Stack align="center" gap={1}>
                <AppText variant="h3" align="center">
                  {stat.value}
                </AppText>
                <AppText variant="caption" tone="muted" align="center">
                  {stat.label}
                </AppText>
              </Stack>
            </Surface>
          ))}
        </Stack>

        <GradientSurface variant="warm" radius="xl" padding={5}>
          <Stack direction="horizontal" align="center" gap={3}>
            <Stack flex={1} gap={1}>
              <AppText variant="h3" tone="inverse">
                Go Premium
              </AppText>
              <AppText variant="caption" tone="inverse">
                Unlock exclusive features and support Monosekai
              </AppText>
            </Stack>
            <AppButton
              size="sm"
              title="Upgrade"
              variant="secondary"
              style={{ backgroundColor: theme.colors.white }}
              textStyle={{ color: theme.colors.charcoal }}
            />
          </Stack>
        </GradientSurface>

        <Surface variant="card" radius="lg" padding={4}>
          <Stack>
            {MENU_ITEMS.map((item, index) => (
              <React.Fragment key={item.label}>
                {index > 0 ? (
                  <View
                    style={{
                      height: 1,
                      backgroundColor: theme.colors.divider,
                    }}
                  />
                ) : null}
                <SettingRow label={item.label} icon={item.icon} />
              </React.Fragment>
            ))}
          </Stack>
        </Surface>
      </ScrollView>

      <BottomNav active="profile" />
    </Screen>
  );
}
