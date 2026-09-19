import React, { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

import {
  AppText,
  Badge,
  Icon,
  IconButton,
  MediaPlaceholder,
  Overlay,
  ProgressBar,
  Screen,
  Stack,
  Surface,
  Tabs } from
"../../ui";

import { useResponsive, useTheme } from "../../theme";

const TABS = ["Episodes", "Next Up", "Comments"];

const ACTIONS = [
{ label: "My List", icon: "add" },
{ label: "Download", icon: "download-outline" },
{ label: "Share", icon: "share-social-outline" }];


export default function PlayerScreen() {
  const theme = useTheme();
  const { width, horizontalPadding } = useResponsive();

  const [activeTab, setActiveTab] = useState(TABS[0]);

  const videoHeight = width * 0.5625;

  return (
    <Screen>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: theme.spacing[6] }}>
        
        <View
          style={{
            height: videoHeight,
            backgroundColor: theme.colors.charcoal,
            position: "relative"
          }}>
          
          <MediaPlaceholder
            label="Video"
            icon="videocam-outline"
            tone="dark" />
          

          <Overlay position="topLeft" style={{ padding: theme.spacing[3] }}>
            <IconButton
              icon={<Icon name="chevron-back" size={20} tone="inverse" />}
              variant="overlay"
              accessibilityLabel="Go back" />
            
          </Overlay>

          <Overlay position="topRight" style={{ padding: theme.spacing[3] }}>
            <IconButton
              icon={<Icon name="scan-outline" size={20} tone="inverse" />}
              variant="overlay"
              accessibilityLabel="Expand video" />
            
          </Overlay>

          <Overlay position="center">
            <Stack direction="horizontal" gap={6} align="center">
              <IconButton
                icon={<Icon name="play-skip-back" size={20} tone="inverse" />}
                variant="overlay"
                accessibilityLabel="Previous episode" />
              

              <IconButton
                icon={<Icon name="play" size={28} tone="inverse" />}
                accessibilityLabel="Play"
                style={{
                  width: 64,
                  height: 64,
                  backgroundColor: theme.colors.accent
                }} />
              

              <IconButton
                icon={
                <Icon name="play-skip-forward" size={20} tone="inverse" />
                }
                variant="overlay"
                accessibilityLabel="Next episode" />
              
            </Stack>
          </Overlay>
        </View>

        <Surface
          variant="transparent"
          radius="lg"
          style={{
            backgroundColor: theme.colors.charcoal,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            paddingHorizontal: horizontalPadding,
            paddingVertical: theme.spacing[4],
            gap: theme.spacing[3]
          }}>
          
          <ProgressBar
            value={0.45}
            height={4}
            color={theme.colors.accent}
            trackColor={theme.colors.overlaySoft} />
          

          <Stack direction="horizontal" align="center" justify="space-between">
            <AppText variant="caption" tone="inverse">
              10:45
            </AppText>

            <AppText variant="caption" tone="inverse">
              23:51
            </AppText>
          </Stack>

          <Stack direction="horizontal" gap={2} align="center" justify="flex-end">
            <IconButton
              icon={<Icon name="settings-outline" size={18} tone="inverse" />}
              variant="ghost"
              size="sm"
              accessibilityLabel="Playback settings" />
            

            <IconButton
              icon={<Icon name="chatbubble-outline" size={18} tone="inverse" />}
              variant="ghost"
              size="sm"
              accessibilityLabel="Comments" />
            

            <IconButton
              icon={<Icon name="expand" size={18} tone="inverse" />}
              variant="ghost"
              size="sm"
              accessibilityLabel="Full screen" />
            
          </Stack>
        </Surface>

        <Stack
          gap={5}
          style={{
            paddingHorizontal: horizontalPadding,
            paddingTop: theme.spacing[5]
          }}>
          
          <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

          <Stack gap={2}>
            <AppText variant="h3">Demon Slayer: Kimetsu no Yaiba</AppText>

            <AppText variant="caption" tone="muted">
              TV Show • 2019 • 3 Seasons
            </AppText>

            <Stack direction="horizontal" gap={2} align="center">
              <Badge label="9.7" icon="star" tone="warning" />
              <Badge label="HD" />
              <Badge label="CC" />
              <Badge label="16+" />
            </Stack>
          </Stack>

          <AppText variant="body" tone="secondary">
            Tanjiro sets out on a journey to become a Demon Slayer and turn his
            sister Nezuko back into a human.
          </AppText>
        </Stack>
      </ScrollView>

      <Surface
        variant="transparent"
        radius="xl"
        style={{
          backgroundColor: theme.colors.charcoal,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: horizontalPadding,
          paddingVertical: theme.spacing[4]
        }}>
        
        {ACTIONS.map((action) =>
        <Pressable
          key={action.label}
          accessibilityRole="button"
          accessibilityLabel={action.label}
          onPress={() => {}}
          style={{ flex: 1 }}>
          
            <Stack gap={1} align="center">
              <Icon name={action.icon} size={20} tone="inverse" />

              <AppText variant="caption" tone="inverse">
                {action.label}
              </AppText>
            </Stack>
          </Pressable>
        )}
      </Surface>
    </Screen>);

}