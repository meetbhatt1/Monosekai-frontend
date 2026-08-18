import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { useTheme } from "../../theme";

import { AppText } from "../primitives/AppText";
import { Icon, IconName } from "../primitives/Icon";

export type PlaceholderTone = "soft" | "warm" | "brand" | "dark";

interface MediaPlaceholderProps {
  label?: string;
  icon?: IconName;
  tone?: PlaceholderTone;
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** Stand-in for artwork until real assets are dropped into the asset registry. */
export function MediaPlaceholder({
  label,
  icon = "image-outline",
  tone = "soft",
  compact = false,
  style,
}: MediaPlaceholderProps) {
  const theme = useTheme();

  const tones: Record<PlaceholderTone, { background: string; content: string }> = {
    soft: {
      background: theme.colors.surfaceSoft,
      content: theme.colors.textMuted,
    },
    warm: {
      background: theme.colors.surfaceWarm,
      content: theme.colors.textSecondary,
    },
    brand: {
      background: theme.colors.primarySoft,
      content: theme.colors.primary,
    },
    dark: {
      background: theme.colors.charcoal,
      content: theme.colors.white,
    },
  };

  const current = tones[tone];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: current.background, gap: compact ? 0 : theme.spacing[2] },
        style,
      ]}
    >
      <Icon name={icon} size={compact ? 18 : 26} color={current.content} />

      {!compact && label ? (
        <AppText variant="caption" align="center" style={{ color: current.content }}>
          {label}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
});
