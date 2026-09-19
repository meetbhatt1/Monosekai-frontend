import React from "react";
import { Pressable, View } from "react-native";

import {
  AppButton,
  AppText,
  Badge,
  BrandHeader,
  Icon,
  IconButton,
  MediaFrame,
  MediaPlaceholder,
  Screen,
  Stack,
  Surface } from
"../../ui";
import { useResponsive, useTheme } from "../../theme";

const BENEFITS = [
{ label: "Ad-free streaming", icon: "close-circle-outline" },
{ label: "Watch on multiple devices", icon: "phone-portrait-outline" },
{ label: "Offline downloads", icon: "cloud-download-outline" },
{ label: "Early access to new episodes", icon: "time-outline" },
{ label: "Premium badge & emotes", icon: "sparkles-outline" }];


export default function PremiumScreen() {
  const theme = useTheme();
  const { horizontalPadding } = useResponsive();

  return (
    <Screen
      scroll
      contentStyle={{
        paddingHorizontal: horizontalPadding,
        paddingTop: theme.spacing[3],
        paddingBottom: theme.spacing[8],
        gap: theme.spacing[5]
      }}>
      
      <Stack direction="horizontal" align="center" gap={3}>
        <IconButton
          accessibilityLabel="Go back"
          variant="soft"
          size="sm"
          icon={<Icon name="chevron-back" size={20} tone="brand" />} />
        
        <View style={{ flex: 1 }}>
          <BrandHeader
            right={<Badge label="Premium" tone="brand" />} />
          
        </View>
      </Stack>

      <Stack gap={1}>
        <AppText variant="display">More anime.</AppText>
        <AppText variant="display">More features.</AppText>
        <AppText variant="display" tone="brand">
          More you.
        </AppText>
      </Stack>

      <Surface variant="card" radius="xl" padding={5}>
        <Stack gap={4}>
          {BENEFITS.map((benefit) =>
          <Stack
            key={benefit.label}
            direction="horizontal"
            align="center"
            gap={3}>
            
              <View
              style={{
                width: 40,
                height: 40,
                borderRadius: theme.radius.pill,
                backgroundColor: theme.colors.surfaceSoft,
                alignItems: "center",
                justifyContent: "center"
              }}>
              
                <Icon name={benefit.icon} size={20} tone="brand" />
              </View>
              <AppText variant="body" style={{ flex: 1 }}>
                {benefit.label}
              </AppText>
            </Stack>
          )}
        </Stack>
      </Surface>

      <MediaFrame ratio="landscape" radius="xl">
        <MediaPlaceholder tone="warm" label="Premium character art" />
      </MediaFrame>

      <AppButton
        variant="primary"
        fullWidth
        title="Go Premium"
        leftIcon={<Icon name="star" size={18} tone="inverse" />} />
      

      <Pressable accessibilityRole="button" accessibilityLabel="Restore purchases">
        <AppText variant="caption" tone="muted" align="center">
          Restore Purchases
        </AppText>
      </Pressable>
    </Screen>);

}