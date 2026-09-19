import React, { useState } from "react";
import { ScrollView, View } from "react-native";

import {
  AppText,
  Badge,
  Chip,
  Icon,
  IconButton,
  ListRow,
  MediaFrame,
  MediaPlaceholder,
  Screen,
  SectionHeader,
  Stack,
  Surface } from
"../../ui";
import { AppBottomNav } from "../../navigation/AppBottomNav";



import { useResponsive, useTheme } from "../../theme";
import { hp } from "../../theme/responsive";

const FILTERS = ["All", "TV Shows", "Movies", "OVA", "Specials"];

const GENRES =



[
{ label: "Action", icon: "flame-outline", tone: "accent" },
{ label: "Adventure", icon: "compass-outline", tone: "warning" },
{ label: "Drama", icon: "sad-outline", tone: "brand" },
{ label: "Fantasy", icon: "sparkles-outline", tone: "success" },
{ label: "Romance", icon: "heart-outline", tone: "accent" }];


const TRENDING = [
{
  rank: "1",
  title: "Attack on Titan",
  subtitle: "Final Season",
  meta: "S4 • 16 Episodes",
  rating: "9.8"
},
{
  rank: "2",
  title: "One Piece",
  meta: "S22 • 1102 Episodes",
  rating: "9.4"
},
{
  rank: "3",
  title: "Mob Psycho 100",
  meta: "S3 • 12 Episodes",
  rating: "9.5"
}];


export default function BrowseScreen() {
  const theme = useTheme();
  const { height, horizontalPadding, gap } = useResponsive();

  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0]);

  const genreTints = {
    accent: theme.colors.accentSoft,
    warning: theme.colors.warningSoft,
    brand: theme.colors.primarySoft,
    success: theme.colors.successSoft
  };

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: horizontalPadding,
          paddingTop: hp(height, 1),
          paddingBottom: theme.spacing[6],
          gap: theme.spacing[8]
        }}>
        
        <Stack
          direction="horizontal"
          align="center"
          justify="space-between">
          
          <AppText variant="h1">Browse</AppText>

          <IconButton
            icon={<Icon name="search-outline" size={20} />}
            variant="soft"
            accessibilityLabel="Search anime" />
          
        </Stack>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginHorizontal: -horizontalPadding }}
          contentContainerStyle={{
            paddingHorizontal: horizontalPadding,
            gap: theme.spacing[2]
          }}>
          
          {FILTERS.map((filter) =>
          <Chip
            key={filter}
            label={filter}
            selected={filter === selectedFilter}
            onPress={() => setSelectedFilter(filter)} />

          )}
        </ScrollView>

        <Stack gap={4}>
          <SectionHeader title="Genres" actionLabel="See all" />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: -horizontalPadding }}
            contentContainerStyle={{
              paddingHorizontal: horizontalPadding,
              gap
            }}>
            
            {GENRES.map((genre) =>
            <Surface
              key={genre.label}
              variant="soft"
              radius="lg"
              padding={3}
              style={{ width: 92, alignItems: "center" }}>
              
                <Stack gap={2} align="center">
                  <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: theme.radius.pill,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor:
                    genreTints[genre.tone] ?? theme.colors.surface
                  }}>
                  
                    <Icon name={genre.icon} size={20} tone={genre.tone} />
                  </View>

                  <AppText variant="caption" tone="secondary" align="center">
                    {genre.label}
                  </AppText>
                </Stack>
              </Surface>
            )}
          </ScrollView>
        </Stack>

        <Stack gap={4}>
          <SectionHeader title="Trending Now" actionLabel="See all" />

          <Stack gap={5}>
            {TRENDING.map((item) =>
            <ListRow
              key={item.title}
              title={item.title}
              subtitle={item.subtitle}
              meta={item.meta}
              leading={
              <Stack direction="horizontal" align="center" gap={3}>
                    <AppText
                  variant="display"
                  tone="muted"
                  style={{ width: 30 }}
                  align="center">
                  
                      {item.rank}
                    </AppText>

                    <MediaFrame
                  ratio="poster"
                  radius="sm"
                  style={{ width: 44, height: 62 }}>
                  
                      <MediaPlaceholder icon="film-outline" compact />
                    </MediaFrame>
                  </Stack>
              }
              trailing={
              <Badge label={item.rating} tone="warning" icon="star" />
              } />

            )}
          </Stack>
        </Stack>
      </ScrollView>

      <AppBottomNav active="browse" />
    </Screen>);

}