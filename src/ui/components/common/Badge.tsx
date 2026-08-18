import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

import { AppText } from "../../primitives/AppText";
import { Icon, IconName } from "../../primitives/Icon";

export type BadgeTone =
  | "neutral"
  | "brand"
  | "accent"
  | "success"
  | "warning"
  | "dark";

interface BadgeProps {
  label: string;
  tone?: BadgeTone;
  icon?: IconName;
  style?: StyleProp<ViewStyle>;
}

export function Badge({
  label,
  tone = "neutral",
  icon,
  style,
}: BadgeProps) {
  const theme = useTheme();

  const tones: Record<BadgeTone, { background: string; content: string }> = {
    neutral: {
      background: theme.colors.surfaceSoft,
      content: theme.colors.textSecondary,
    },
    brand: {
      background: theme.colors.primarySoft,
      content: theme.colors.primary,
    },
    accent: {
      background: theme.colors.accentSoft,
      content: theme.colors.accent,
    },
    success: {
      background: theme.colors.successSoft,
      content: theme.colors.success,
    },
    warning: {
      background: theme.colors.warningSoft,
      content: theme.colors.charcoal,
    },
    dark: {
      background: theme.colors.overlay,
      content: theme.colors.white,
    },
  };

  const current = tones[tone];

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          gap: theme.spacing[1],

          paddingHorizontal: theme.spacing[2],
          paddingVertical: 3,

          borderRadius: theme.radius.xs,

          backgroundColor: current.background,
        },
        style,
      ]}
    >
      {icon ? <Icon name={icon} size={12} color={current.content} /> : null}

      <AppText variant="caption" style={{ color: current.content, fontWeight: "600" }}>
        {label}
      </AppText>
    </View>
  );
}
