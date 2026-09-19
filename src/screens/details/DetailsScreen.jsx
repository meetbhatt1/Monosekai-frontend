import React, { useState } from "react";
import { Pressable, View } from "react-native";

import {
  AppButton,
  AppText,
  Badge,
  Icon,
  IconButton,
  ListRow,
  MediaFrame,
  MediaPlaceholder,
  Overlay,
  Screen,
  Stack,
  Surface,
  Tabs } from
"../../ui";

import { useResponsive, useTheme } from "../../theme";

const TABS = ["Episodes", "Details", "More Like This"];

const EPISODES = [
{ title: "Swordsmith Village Arc", meta: "E1 • 23m" },
{ title: "Yoriichi Type Zero", meta: "E2 • 23m" },
{ title: "A Sword from Over 300 Years Ago", meta: "E3 • 24m" },
{ title: "Mist Hashira, Muichiro Tokito", meta: "E4 • 23m" }];


export default function DetailsScreen() {
  const theme = useTheme();
  const { horizontalPadding } = useResponsive();

  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <Screen
      scroll
      contentStyle={{
        paddingBottom: theme.spacing[10],
        gap: theme.spacing[6]
      }}>
      
      <MediaFrame ratio="hero" radius="xxl">
        <MediaPlaceholder
          label="Demon Slayer key art"
          icon="sparkles-outline"
          tone="brand" />
        

        <Overlay position="topLeft" style={{ padding: theme.spacing[4] }}>
          <IconButton
            icon={<Icon name="chevron-back" size={20} tone="inverse" />}
            variant="overlay"
            accessibilityLabel="Go back" />
          
        </Overlay>

        <Overlay position="topRight" style={{ padding: theme.spacing[4] }}>
          <IconButton
            icon={<Icon name="tv-outline" size={20} tone="inverse" />}
            variant="overlay"
            accessibilityLabel="Cast to device" />
          
        </Overlay>
      </MediaFrame>

      <Stack gap={6} style={{ paddingHorizontal: horizontalPadding }}>
        <Stack gap={2}>
          <Stack gap={1}>
            <AppText variant="h1">Demon Slayer</AppText>

            <AppText variant="body" tone="secondary">
              Kimetsu no Yaiba
            </AppText>
          </Stack>

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

        <Stack direction="horizontal" gap={3} align="center">
          <AppButton
            title="Play"
            variant="primary"
            leftIcon={<Icon name="play" size={18} tone="inverse" />}
            style={{ flex: 1 }} />
          

          <AppButton
            title="My List"
            variant="outline"
            leftIcon={<Icon name="add" size={18} tone="brand" />} />
          
        </Stack>

        <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

        {activeTab === TABS[0] ?
        <Stack gap={5}>
            <Pressable accessibilityRole="button" onPress={() => {}}>
              <Surface
              variant="soft"
              radius="md"
              padding={4}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
              
                <AppText variant="bodyMedium">Season 3</AppText>

                <Icon name="chevron-down" size={18} tone="secondary" />
              </Surface>
            </Pressable>

            <Stack gap={5}>
              {EPISODES.map((episode) =>
            <ListRow
              key={episode.title}
              title={episode.title}
              meta={episode.meta}
              onPress={() => {}}
              leading={
              <View style={{ width: 92 }}>
                      <MediaFrame ratio="landscape" radius="sm">
                        <MediaPlaceholder compact />
                      </MediaFrame>
                    </View>
              }
              trailing={
              <IconButton
                icon={
                <Icon name="download-outline" size={18} tone="secondary" />
                }
                variant="ghost"
                size="sm"
                accessibilityLabel={`Download ${episode.title}`} />

              } />

            )}
            </Stack>
          </Stack> :

        <Surface variant="soft" radius="md" padding={5}>
            <AppText variant="body" tone="secondary" align="center">
              Nothing here yet.
            </AppText>
          </Surface>
        }
      </Stack>
    </Screen>);

}