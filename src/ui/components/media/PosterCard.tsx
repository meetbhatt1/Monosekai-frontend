import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

import { AppText } from "../../primitives/AppText";
import { Overlay } from "../../primitives/Overlay";
import { MediaFrame } from "../../media/MediaFrame";
import { MediaPlaceholder } from "../../media/MediaPlaceholder";
import { Badge, BadgeTone } from "../common/Badge";

interface PosterCardProps {
  title: string;
  meta?: string;
  width?: number;
  badge?: string;
  badgeTone?: BadgeTone;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function PosterCard({
  title,
  meta,
  width,
  badge,
  badgeTone = "dark",
  onPress,
  style,
}: PosterCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={onPress ? "button" : undefined}
      style={({ pressed }) => [
        { width, gap: theme.spacing[2], opacity: pressed && onPress ? 0.85 : 1 },
        style,
      ]}
    >
      <MediaFrame ratio="poster" radius="md">
        <MediaPlaceholder label={title} icon="film-outline" />

        {badge ? (
          <Overlay position="topLeft" style={{ margin: theme.spacing[2] }}>
            <Badge label={badge} tone={badgeTone} />
          </Overlay>
        ) : null}
      </MediaFrame>

      <AppText variant="label" numberOfLines={1}>
        {title}
      </AppText>

      {meta ? (
        <AppText variant="caption" tone="muted" numberOfLines={1}>
          {meta}
        </AppText>
      ) : null}
    </Pressable>
  );
}
