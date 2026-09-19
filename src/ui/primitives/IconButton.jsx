import React from "react";

import { Pressable } from "react-native";

import { useTheme } from "../../theme";





















export function IconButton({
  icon,

  variant = "default",
  size = "md",

  disabled,

  style,

  accessibilityLabel,

  ...props
}) {

  const theme = useTheme();

  const sizes =


  {
    sm: 36,

    md:
    theme.components.iconButton.size,

    lg: 52
  };

  const backgrounds =


  {

    default:
    theme.colors.surface,

    soft:
    theme.colors.primarySoft,

    ghost:
    "transparent",

    overlay:
    theme.colors.overlay
  };

  const buttonSize =
  sizes[size];

  return (
    <Pressable
      {...props}

      disabled={disabled}

      accessibilityRole="button"

      accessibilityLabel={
      accessibilityLabel
      }

      accessibilityState={{
        disabled
      }}

      hitSlop={8}

      style={({ pressed }) => [

      {
        width: buttonSize,
        height: buttonSize,

        borderRadius:
        theme.radius.pill,

        backgroundColor:
        backgrounds[variant],

        justifyContent:
        "center",

        alignItems:
        "center",

        opacity:
        disabled ?
        0.4 :
        pressed ?
        0.7 :
        1
      },

      variant === "default" &&
      theme.shadows.sm,

      style]
      }>
      
      {icon}
    </Pressable>);

}