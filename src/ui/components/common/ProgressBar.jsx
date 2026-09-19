import React from "react";
import { View } from "react-native";

import { useTheme } from "../../../theme";










export function ProgressBar({
  value,
  height = 4,
  color,
  trackColor,
  style
}) {
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
        overflow: "hidden"
      },
      style]
      }>
      
      <View
        style={{
          height: "100%",
          width: `${clamped * 100}%`,
          borderRadius: theme.radius.pill,
          backgroundColor: color ?? theme.colors.primary
        }} />
      
    </View>);

}