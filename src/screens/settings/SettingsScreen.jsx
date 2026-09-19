import React from "react";
import { View } from "react-native";

import {
  AppText,
  Icon,
  Screen,
  ScreenHeader,
  SettingRow,
  Stack,
  Surface } from
"../../ui";
import { useResponsive, useTheme } from "../../theme";

function SectionCard({
  title,
  children



}) {
  const theme = useTheme();

  return (
    <Stack gap={2}>
      <AppText variant="label" tone="muted">
        {title}
      </AppText>
      <Surface variant="card" radius="lg" padding={4}>
        {children}
      </Surface>
    </Stack>);

}

function Hairline() {
  const theme = useTheme();

  return (
    <View
      style={{
        height: 1,
        backgroundColor: theme.colors.divider
      }} />);


}

export default function SettingsScreen() {
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
      
      <ScreenHeader title="Settings" showBack />

      <SectionCard title="Account">
        <SettingRow label="Personal Information" icon="person-outline" />
        <Hairline />
        <SettingRow label="Change Password" icon="lock-closed-outline" />
        <Hairline />
        <SettingRow
          label="Email Address"
          icon="mail-outline"
          value="hikari@email.com"
          trailing={<Icon name="checkmark-circle" size={18} tone="success" />} />
        
        <Hairline />
        <SettingRow
          label="Subscription"
          icon="card-outline"
          value="Premium Plan" />
        
      </SectionCard>

      <SectionCard title="Preferences">
        <SettingRow
          label="App Language"
          icon="language-outline"
          value="English" />
        
        <Hairline />
        <SettingRow
          label="Theme"
          icon="color-palette-outline"
          value="Light" />
        
        <Hairline />
        <SettingRow label="Playback Settings" icon="play-circle-outline" />
      </SectionCard>

      <SectionCard title="Support">
        <SettingRow label="Help & Support" icon="help-circle-outline" />
      </SectionCard>
    </Screen>);

}