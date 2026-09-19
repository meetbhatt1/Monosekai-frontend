import React from "react";
import { View } from "react-native";





















export function Overlay({
  children,
  position = "fill",
  pointerEvents = "box-none",
  style
}) {
  const positions = {
    fill: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },

    top: {
      top: 0,
      left: 0,
      right: 0
    },

    bottom: {
      bottom: 0,
      left: 0,
      right: 0
    },

    topLeft: {
      top: 0,
      left: 0
    },

    topRight: {
      top: 0,
      right: 0
    },

    bottomLeft: {
      bottom: 0,
      left: 0
    },

    bottomRight: {
      bottom: 0,
      right: 0
    },

    center: {
      top: "50%",
      left: "50%",
      transform: [
      { translateX: "-50%" },
      { translateY: "-50%" }]

    }
  };

  return (
    <View
      pointerEvents={pointerEvents}
      style={[
      {
        position: "absolute"
      },

      positions[position],
      style]
      }>
      
      {children}
    </View>);

}