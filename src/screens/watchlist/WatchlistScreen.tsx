import React, { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

import {
  AppText,
  BottomNav,
  Chip,
  Icon,
  IconButton,
  ListRow,
  MediaFrame,
  MediaPlaceholder,
  Screen,
  Stack,
} from "../../ui";
import { useResponsive, useTheme } from "../../theme";

const FILTERS = ["All", "TV Shows", "Movies", "OVA"] as const;

const WATCHLIST_ITEMS = [
  { id: "1", title: "Demon Slayer", meta: "S2 • 7 Episodes" },
  { id: "2", title: "Jujutsu Kaisen", meta: "S1 • 16 Episodes" },
  { id: "3", title: "Your Name", meta: "Movie • 1h 46m" },
  { id: "4", title: "Frieren: Beyond Journey's End", meta: "S1 • 28 Episodes" },
  { id: "5", title: "Spy x Family", meta: "S2 • 12 Episodes" },
] as const;

function PosterLeading() {
  return (
    <View style={{ width: 48 }}>
      <MediaFrame ratio="poster" radius="sm">
        <MediaPlaceholder compact />
      </MediaFrame>
    </View>
  );
}

export default function WatchlistScreen() {
  const theme = useTheme();
  const { horizontalPadding } = useResponsive();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  return (
    <Screen>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: horizontalPadding,
          paddingTop: theme.spacing[4],
          paddingBottom: theme.spacing[4],
          gap: theme.spacing[4],
        }}
      >
        <Stack direction="horizontal" align="center" justify="space-between">
          <AppText variant="h1">My Watchlist</AppText>
          <Pressable accessibilityRole="button" accessibilityLabel="Edit watchlist">
            <AppText variant="label" tone="brand">
              Edit
            </AppText>
          </Pressable>
        </Stack>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: theme.spacing[2] }}
        >
          {FILTERS.map((item) => (
            <Chip
              key={item}
              label={item}
              selected={filter === item}
              onPress={() => setFilter(item)}
            />
          ))}
        </ScrollView>

        <Stack gap={4}>
          {WATCHLIST_ITEMS.map((item) => (
            <ListRow
              key={item.id}
              title={item.title}
              meta={item.meta}
              leading={<PosterLeading />}
              trailing={
                <IconButton
                  accessibilityLabel={`More options for ${item.title}`}
                  variant="ghost"
                  size="sm"
                  icon={<Icon name="ellipsis-vertical" size={18} tone="muted" />}
                />
              }
            />
          ))}
        </Stack>
      </ScrollView>

      <BottomNav active="watchlist" />
    </Screen>
  );
}
