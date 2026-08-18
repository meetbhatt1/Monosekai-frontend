import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface ProgressBarProps {
  /** Completion between 0 and 1. */
  value: number;
  height?: number;
  color?: string;
  trackColor?: string;
  style?: StyleProp<ViewStyle>;
}

export function ProgressBar({
  value,
  height = 4,
  color,
  trackColor,
  style,
}: ProgressBarProps) {
  const theme = useTheme();

  const clamped = Math.min(Math.max(value, 0), 1);

  return (
    <View
      style={[
        {
          height,
          width: "100%",
          borderRadius: theme.radius.pill,
          backgroundColor: trackColor ?? theme.colors.border,
          overflow: "hidden",
        },
        style,
      ]}
    >
      <View
        style={{
          height: "100%",
          width: `${clamped * 100}%`,
          borderRadius: theme.radius.pill,
          backgroundColor: color ?? theme.colors.primary,
        }}
      />
    </View>
  );
}
