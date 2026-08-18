import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

import { AppText } from "../../primitives/AppText";

interface BrandHeaderProps {
  right?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function BrandHeader({ right, style }: BrandHeaderProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: theme.components.iconButton.size,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: theme.spacing[1] }}>
        <AppText variant="h2" style={{ letterSpacing: -0.6 }}>
          monosekai
        </AppText>

        <AppText variant="h2" style={{ color: theme.colors.accent }}>
          +
        </AppText>
      </View>

      {right}
    </View>
  );
}
