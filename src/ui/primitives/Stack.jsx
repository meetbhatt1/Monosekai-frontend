import React from "react";
import { View } from "react-native";

import { useTheme } from "../../theme";














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
}) {
  const theme = useTheme();

  return (
    <View
      {...props}
      style={[
      {
        flexDirection:
        direction === "horizontal" ?
        "row" :
        "column",

        gap: theme.spacing[gap],

        alignItems: align,
        justifyContent: justify,

        flexWrap: wrap ? "wrap" : "nowrap",

        flex
      },
      style]
      }>
      
      {children}
    </View>);

}