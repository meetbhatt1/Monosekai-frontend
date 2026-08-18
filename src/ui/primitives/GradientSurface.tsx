import React from "react";
import {
  StyleProp,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useTheme } from "../../theme";

export type GradientVariant =
  | "primary"
  | "warm"
  | "fresh"
  | "hero"
  | "artworkFade";

interface GradientSurfaceProps {
  children?: React.ReactNode;

  variant?: GradientVariant;

  radius?: keyof ReturnType<typeof useTheme>["radius"];
  padding?: keyof ReturnType<typeof useTheme>["spacing"];

  direction?: "horizontal" | "vertical" | "diagonal";

  style?: StyleProp<ViewStyle>;
}

export function GradientSurface({
  children,
  variant = "primary",
  radius = "lg",
  padding,
  direction = "diagonal",
  style,
}: GradientSurfaceProps) {
  const theme = useTheme();

  const directions = {
    horizontal: {
      start: { x: 0, y: 0.5 },
      end: { x: 1, y: 0.5 },
    },

    vertical: {
      start: { x: 0.5, y: 0 },
      end: { x: 0.5, y: 1 },
    },

    diagonal: {
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
  };

  const gradient = theme.gradients[variant];
  const selectedDirection = directions[direction];

  return (
    <LinearGradient
      colors={gradient}
      start={selectedDirection.start}
      end={selectedDirection.end}
      style={[
        {
          borderRadius: theme.radius[radius],

          padding:
            padding !== undefined
              ? theme.spacing[padding]
              : undefined,

          overflow: "hidden",
        },

        style,
      ]}
    >
      {children}
    </LinearGradient>
  );
}