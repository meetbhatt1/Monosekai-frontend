import React from "react";
import { View } from "react-native";

import { useTheme } from "../../theme";





















export function Surface({
  variant = "default",
  radius = "lg",
  padding,
  style,
  children,
  ...props
}) {
  const theme = useTheme();

  const variants = {
    default: {
      backgroundColor: theme.colors.surface
    },

    outlined: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: theme.colors.border
    },

    soft: {
      backgroundColor: theme.colors.surfaceSoft
    },

    card: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border
    },

    elevated: {
      backgroundColor: theme.colors.surface,
      ...theme.shadows.md
    },

    transparent: {
      backgroundColor: "transparent"
    }
  };

  return (
    <View
      {...props}
      style={[
      variants[variant],

      {
        borderRadius: theme.radius[radius],

        padding:
        padding !== undefined ?
        theme.spacing[padding] :
        undefined
      },

      style]
      }>
      
      {children}
    </View>);

}