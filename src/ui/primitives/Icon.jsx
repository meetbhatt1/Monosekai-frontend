import React from "react";

import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../../theme";






















export function Icon({
  name,
  size = 22,
  tone = "primary",
  color,
  style
}) {
  const theme = useTheme();

  const tones = {
    primary: theme.colors.text,
    secondary: theme.colors.textSecondary,
    muted: theme.colors.textMuted,
    brand: theme.colors.primary,
    accent: theme.colors.accent,
    success: theme.colors.success,
    warning: theme.colors.warning,
    error: theme.colors.accent,
    inverse: theme.colors.white
  };

  return (
    <Ionicons
      name={name}
      size={size}
      color={color ?? tones[tone]}
      style={style} />);


}