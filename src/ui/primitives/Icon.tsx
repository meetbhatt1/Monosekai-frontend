import React from "react";
import { StyleProp, TextStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../../theme";

export type IconName = keyof typeof Ionicons.glyphMap;

export type IconTone =
  | "primary"
  | "secondary"
  | "muted"
  | "brand"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "inverse";

interface IconProps {
  name: IconName;
  size?: number;
  tone?: IconTone;
  color?: string;
  style?: StyleProp<TextStyle>;
}

export function Icon({
  name,
  size = 22,
  tone = "primary",
  color,
  style,
}: IconProps) {
  const theme = useTheme();

  const tones: Record<IconTone, string> = {
    primary: theme.colors.text,
    secondary: theme.colors.textSecondary,
    muted: theme.colors.textMuted,
    brand: theme.colors.primary,
    accent: theme.colors.accent,
    success: theme.colors.success,
    warning: theme.colors.warning,
    error: theme.colors.accent,
    inverse: theme.colors.white,
  };

  return (
    <Ionicons
      name={name}
      size={size}
      color={color ?? tones[tone]}
      style={style}
    />
  );
}
