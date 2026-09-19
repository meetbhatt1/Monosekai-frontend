import React, { useState } from "react";
import { ScrollView, View } from "react-native";

import {
  Chip,
  Icon,
  IconButton,
  ListRow,
  MediaFrame,
  MediaPlaceholder,
  BottomNav,
  Screen,
  SearchBar,
  Stack } from
"../../ui";

import { useResponsive, useTheme } from "../../theme";
import { hp } from "../../theme/responsive";

const FILTERS = ["All", "TV Shows", "Movies", "OVA", "Characters"];

const RESULTS = [
{ title: "Jujutsu Kaisen", meta: "TV Show • 2019 • 3 Seasons" },
{ title: "Jujutsu Kaisen 0", meta: "Movie • 2021" },
{ title: "Jujutsu Kaisen (TV)", meta: "S1 • 24 Episodes" },
{
  title: "Jujutsu Kaisen: Hidden Inventory / Premature Death",
  meta: "Special • 2024"
},
{ title: "Jujutsu Kaisen: Shibuya Incident Arc", meta: "S2 • 23 Episodes" }];


export default function SearchScreen() {
  const theme = useTheme();
  const { height, horizontalPadding } = useResponsive();

  const [query, setQuery] = useState("jujutsu kaisen");
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);

  return (
    <Screen>
      <Stack
        flex={1}
        gap={4}
        style={{
          paddingHorizontal: horizontalPadding,
          paddingTop: hp(height, 1)
        }}>
        
        <Stack direction="horizontal" gap={3} align="center">
          <IconButton
            icon={<Icon name="chevron-back" size={20} tone="brand" />}
            variant="soft"
            accessibilityLabel="Go back" />
          

          <SearchBar
            value={query}
            onChangeText={setQuery}
            placeholder="Search anime, movies, characters"
            showClear={query.length > 0}
            onClear={() => setQuery("")}
            containerStyle={{ flex: 1 }} />
          
        </Stack>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginHorizontal: -horizontalPadding, flexGrow: 0 }}
          contentContainerStyle={{
            paddingHorizontal: horizontalPadding,
            gap: theme.spacing[2]
          }}>
          
          {FILTERS.map((filter) =>
          <Chip
            key={filter}
            label={filter}
            selected={filter === activeFilter}
            onPress={() => setActiveFilter(filter)} />

          )}
        </ScrollView>

        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: theme.spacing[5],
            paddingBottom: theme.spacing[4]
          }}>
          
          {RESULTS.map((result) =>
          <ListRow
            key={result.title}
            title={result.title}
            meta={result.meta}
            onPress={() => {}}
            leading={
            <View style={{ width: 48 }}>
                  <MediaFrame ratio="poster" radius="sm">
                    <MediaPlaceholder compact />
                  </MediaFrame>
                </View>
            } />

          )}
        </ScrollView>
      </Stack>

      <BottomNav active="browse" />
    </Screen>);

}