import React from "react";
import {
  View,
  ViewProps,
  ViewStyle,
  StyleProp,
} from "react-native";

import { useTheme } from "../../theme";

type SpacingKey = keyof ReturnType<typeof useTheme>["spacing"];

interface StackProps extends ViewProps {
  direction?: "vertical" | "horizontal";
  gap?: SpacingKey;
  align?: ViewStyle["alignItems"];
  justify?: ViewStyle["justifyContent"];
  wrap?: boolean;
  flex?: number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export function Stack({
  direction = "vertical",
  gap = 0,
  align,
  justify,
  wrap = false,
  flex,
  style,
  children,
  ...props
}: StackProps) {
  const theme = useTheme();

  return (
    <View
      {...props}
      style={[
        {
          flexDirection:
            direction === "horizontal"
              ? "row"
              : "column",

          gap: theme.spacing[gap],

          alignItems: align,
          justifyContent: justify,

          flexWrap: wrap ? "wrap" : "nowrap",

          flex,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}