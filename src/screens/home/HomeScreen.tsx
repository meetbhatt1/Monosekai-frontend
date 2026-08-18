import React from "react";
import { ScrollView } from "react-native";

import {
  AppButton,
  AppText,
  BottomNav,
  BrandHeader,
  GradientSurface,
  Icon,
  IconButton,
  MediaFrame,
  MediaPlaceholder,
  Overlay,
  PosterCard,
  Screen,
  SectionHeader,
  Stack,
  ThumbCard,
} from "../../ui";

import { useResponsive, useTheme } from "../../theme";
import { hp } from "../../theme/responsive";

const CONTINUE_WATCHING = [
  { title: "Demon Slayer", subtitle: "S3 • E7", progress: 0.55 },
  { title: "Jujutsu Kaisen", subtitle: "S1 • E16", progress: 0.3 },
  { title: "One Piece", subtitle: "S22 • E1102", progress: 0.8 },
];

const TOP_PICKS = [
  { title: "Frieren", meta: "Fantasy • 2023" },
  { title: "Bocchi the Rock", meta: "Music • 2022" },
  { title: "Violet Evergarden", meta: "Drama • 2018" },
  { title: "Cyberpunk Edgerunners", meta: "Sci-Fi • 2022" },
];

export default function HomeScreen() {
  const theme = useTheme();
  const { width, height, horizontalPadding, gap, posterWidth } =
    useResponsive();

  const thumbWidth = width * 0.42;

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: horizontalPadding,
          paddingTop: hp(height, 1),
          paddingBottom: theme.spacing[6],
          gap: theme.spacing[8],
        }}
      >
        <BrandHeader
          right={
            <IconButton
              icon={<Icon name="search-outline" size={20} />}
              variant="soft"
              accessibilityLabel="Search anime"
            />
          }
        />

        <MediaFrame ratio="hero" radius="xl">
          <MediaPlaceholder
            label="Featured artwork"
            icon="sparkles-outline"
            tone="brand"
          />

          <Overlay position="fill" pointerEvents="none">
            <GradientSurface
              variant="artworkFade"
              direction="vertical"
              radius="xl"
              style={{ flex: 1 }}
            />
          </Overlay>

          <Overlay position="bottom" style={{ padding: theme.spacing[4] }}>
            <Stack gap={3} align="flex-start">
              <AppText variant="h2" tone="inverse">
                Your next favorite anime is here.
              </AppText>

              <AppButton
                title="Watch Now"
                variant="primary"
                size="sm"
                leftIcon={<Icon name="play" size={16} tone="inverse" />}
              />
            </Stack>
          </Overlay>
        </MediaFrame>

        <Stack gap={4}>
          <SectionHeader title="Continue Watching" actionLabel="View all" />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: -horizontalPadding }}
            contentContainerStyle={{
              paddingHorizontal: horizontalPadding,
              gap,
            }}
          >
            {CONTINUE_WATCHING.map((item) => (
              <ThumbCard
                key={item.title}
                title={item.title}
                subtitle={item.subtitle}
                progress={item.progress}
                width={thumbWidth}
              />
            ))}
          </ScrollView>
        </Stack>

        <Stack gap={4}>
          <SectionHeader title="Top Picks for You" actionLabel="View all" />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: -horizontalPadding }}
            contentContainerStyle={{
              paddingHorizontal: horizontalPadding,
              gap,
            }}
          >
            {TOP_PICKS.map((item) => (
              <PosterCard
                key={item.title}
                title={item.title}
                meta={item.meta}
                width={posterWidth}
              />
            ))}
          </ScrollView>
        </Stack>
      </ScrollView>

      <BottomNav active="home" />
    </Screen>
  );
}
