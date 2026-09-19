import React from "react";

import { View } from "react-native";

import { useTheme } from "../../theme";



















export function MediaFrame({
  children,
  ratio = "landscape",
  radius = "md",
  style
}) {

  const theme = useTheme();

  const ratios =


  {

    // width / height

    poster: 2 / 3,

    landscape: 16 / 9,

    hero: 16 / 8.5,

    square: 1,

    avatar: 1
  };

  return (
    <View
      style={[
      {
        width: "100%",

        aspectRatio:
        ratios[ratio],

        borderRadius:
        ratio === "avatar" ?
        theme.radius.pill :
        theme.radius[radius],

        overflow: "hidden",

        backgroundColor:
        theme.colors.surfaceSoft,

        position: "relative"
      },

      style]
      }>
      
      {children}
    </View>);

}