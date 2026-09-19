import React from "react";
import { Pressable, View } from "react-native";

import { useTheme } from "../../../theme";

import { AppText } from "../../primitives/AppText";
import { Icon } from "../../primitives/Icon";
import { Overlay } from "../../primitives/Overlay";
import { MediaFrame } from "../../media/MediaFrame";
import { MediaPlaceholder } from "../../media/MediaPlaceholder";
import { ProgressBar } from "../common/ProgressBar";












export function ThumbCard({
  title,
  subtitle,
  progress,
  width,
  showPlay = true,
  onPress,
  style
}) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={onPress ? "button" : undefined}
      style={({ pressed }) => [
      { width, gap: theme.spacing[2], opacity: pressed && onPress ? 0.85 : 1 },
      style]
      }>
      
      <MediaFrame ratio="landscape" radius="md">
        <MediaPlaceholder label={title} icon="play-circle-outline" tone="warm" />

        {showPlay ?
        <Overlay position="center" pointerEvents="none">
            <View
            style={{
              width: 40,
              height: 40,
              borderRadius: theme.radius.pill,
              backgroundColor: theme.colors.overlay,
              alignItems: "center",
              justifyContent: "center"
            }}>
            
              <Icon name="play" size={18} tone="inverse" />
            </View>
          </Overlay> :
        null}

        {progress !== undefined ?
        <Overlay position="bottom" style={{ padding: theme.spacing[2] }}>
            <ProgressBar
            value={progress}
            color={theme.colors.accent}
            trackColor={theme.colors.overlaySoft} />
          
          </Overlay> :
        null}
      </MediaFrame>

      <AppText variant="label" numberOfLines={1}>
        {title}
      </AppText>

      {subtitle ?
      <AppText variant="caption" tone="muted" numberOfLines={1}>
          {subtitle}
        </AppText> :
      null}
    </Pressable>);

}