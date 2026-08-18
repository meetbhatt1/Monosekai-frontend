import React from "react";
import {
  StyleProp,
  View,
  ViewStyle,
} from "react-native";

export type OverlayPosition =
  | "fill"
  | "top"
  | "bottom"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"
  | "center";

interface OverlayProps {
  children: React.ReactNode;

  position?: OverlayPosition;

  pointerEvents?: "auto" | "none" | "box-none" | "box-only";

  style?: StyleProp<ViewStyle>;
}

export function Overlay({
  children,
  position = "fill",
  pointerEvents = "box-none",
  style,
}: OverlayProps) {
  const positions: Record<OverlayPosition, ViewStyle> = {
    fill: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },

    top: {
      top: 0,
      left: 0,
      right: 0,
    },

    bottom: {
      bottom: 0,
      left: 0,
      right: 0,
    },

    topLeft: {
      top: 0,
      left: 0,
    },

    topRight: {
      top: 0,
      right: 0,
    },

    bottomLeft: {
      bottom: 0,
      left: 0,
    },

    bottomRight: {
      bottom: 0,
      right: 0,
    },

    center: {
      top: "50%",
      left: "50%",
      transform: [
        { translateX: "-50%" as any },
        { translateY: "-50%" as any },
      ],
    },
  };

  return (
    <View
      pointerEvents={pointerEvents}
      style={[
        {
          position: "absolute",
        },

        positions[position],
        style,
      ]}
    >
      {children}
    </View>
  );
}