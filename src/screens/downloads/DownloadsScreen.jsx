import React, { useState } from "react";
import { ScrollView, View } from "react-native";

import {
  AppSwitch,
  AppText,
  Icon,
  ListRow,
  MediaFrame,
  MediaPlaceholder,
  ProgressBar,
  Screen,
  Stack,
  Surface } from
"../../ui";
import { AppBottomNav } from "../../navigation/AppBottomNav";
import { useResponsive, useTheme } from "../../theme";

const DOWNLOADS = [
{
  id: "1",
  title: "Demon Slayer",
  subtitle: "S3 • 12 Episodes",
  meta: "2.1 GB",
  status: "complete"
},
{
  id: "2",
  title: "Jujutsu Kaisen",
  subtitle: "S1 • 24 Episodes",
  meta: "3.4 GB",
  status: "complete"
},
{
  id: "3",
  title: "One Piece",
  subtitle: "S22 • 1102 Episodes",
  meta: "6.2 GB",
  status: "complete"
},
{
  id: "4",
  title: "Tokyo Revengers",
  subtitle: "S1 • 24 Episodes",
  meta: "1.8 GB",
  status: "downloading",
  progress: 0.62
}];


function PosterLeading() {
  return (
    <View style={{ width: 48 }}>
      <MediaFrame ratio="poster" radius="sm">
        <MediaPlaceholder compact />
      </MediaFrame>
    </View>);

}

export default function DownloadsScreen() {
  const theme = useTheme();
  const { horizontalPadding } = useResponsive();
  const [smartDownloads, setSmartDownloads] = useState(true);

  return (
    <Screen>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: horizontalPadding,
          paddingTop: theme.spacing[4],
          paddingBottom: theme.spacing[4],
          gap: theme.spacing[5]
        }}>
        
        <AppText variant="h1">Downloads</AppText>

        <Surface variant="soft" radius="lg" padding={4}>
          <Stack direction="horizontal" align="center" gap={3}>
            <Stack flex={1} gap={1}>
              <AppText variant="bodyMedium">Smart Downloads</AppText>
              <AppText variant="caption" tone="muted">
                Automatically download the next episode
              </AppText>
            </Stack>
            <AppSwitch
              value={smartDownloads}
              onValueChange={setSmartDownloads} />
            
          </Stack>
        </Surface>

        <Stack gap={4}>
          {DOWNLOADS.map((item) =>
          <ListRow
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            meta={item.meta}
            leading={<PosterLeading />}
            trailing={
            item.status === "complete" ?
            <Icon name="checkmark-circle" size={22} tone="success" /> :

            <Icon name="pause-circle" size={22} tone="accent" />

            }
            footer={
            item.status === "downloading" ?
            <ProgressBar
              value={item.progress}
              style={{ marginTop: theme.spacing[1] }} /> :

            undefined
            } />

          )}
        </Stack>

        <Surface variant="card" radius="lg" padding={4}>
          <Stack gap={3}>
            <Stack direction="horizontal" justify="space-between">
              <AppText variant="caption" tone="muted">
                Used 19.2 GB
              </AppText>
              <AppText variant="caption" tone="muted">
                Free 48.8 GB
              </AppText>
            </Stack>
            <ProgressBar value={0.28} />
          </Stack>
        </Surface>
      </ScrollView>

      <AppBottomNav active="downloads" />
    </Screen>);

}