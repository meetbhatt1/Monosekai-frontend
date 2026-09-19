import React from "react";

import { ActivityIndicator, Pressable } from "react-native";

import { useTheme } from "../../theme";
import { AppText } from "./AppText";




































export function AppButton({
  title = "",
  variant = "primary",
  size = "md",

  fullWidth = false,
  loading = false,

  disabled,

  leftIcon,
  rightIcon,

  style,
  textStyle,

  ...props
}) {

  const theme = useTheme();

  const variants =






  {

    primary: {
      backgroundColor:
      theme.colors.primary,

      textColor:
      theme.colors.white
    },

    secondary: {
      backgroundColor:
      theme.colors.accent,

      textColor:
      theme.colors.white
    },

    outline: {
      backgroundColor:
      "transparent",
      textColor:
      theme.colors.primary,
      borderColor:
      theme.colors.primary
    },

    soft: {
      backgroundColor:
      theme.colors.primarySoft,

      textColor:
      theme.colors.primary
    },

    ghost: {
      backgroundColor:
      "transparent",

      textColor:
      theme.colors.text,

      borderColor:
      theme.colors.border
    },

    destructive: {
      backgroundColor:
      theme.colors.error,

      textColor:
      theme.colors.white
    }
  };

  const sizes =





  {

    sm: {
      height: 40,
      horizontalPadding:
      theme.spacing[4]
    },

    md: {
      height:
      theme.components.button.height,

      horizontalPadding:
      theme.spacing[5]
    },

    lg: {
      height: 56,
      horizontalPadding:
      theme.spacing[6]
    }
  };

  const currentVariant =
  variants[variant];

  const currentSize =
  sizes[size];

  const isDisabled =
  disabled || loading;

  return (
    <Pressable
      {...props}

      disabled={isDisabled}

      accessibilityRole="button"

      accessibilityState={{
        disabled: isDisabled,
        busy: loading
      }}

      style={({ pressed }) => [

      {
        height:
        currentSize.height,

        paddingHorizontal:
        currentSize.horizontalPadding,

        borderRadius:
        theme.components.button.radius,

        backgroundColor:
        currentVariant.backgroundColor,

        borderWidth:
        currentVariant.borderColor ?
        1 :
        0,

        borderColor:
        currentVariant.borderColor,

        flexDirection: "row",

        alignItems: "center",
        justifyContent: "center",

        gap: theme.spacing[2],

        alignSelf:
        fullWidth ?
        "stretch" :
        "flex-start",

        opacity:
        isDisabled ?
        0.45 :
        pressed ?
        0.78 :
        1
      },

      style]
      }>
      

      {loading ?

      <ActivityIndicator
        size="small"
        color={
        currentVariant.textColor
        } /> :



      <>
          {leftIcon}

          <AppText
          variant="label"
          style={[
          {
            color:
            currentVariant.textColor
          },

          textStyle]
          }>
          
            {title}
          </AppText>

          {rightIcon}
        </>
      }

    </Pressable>);

}