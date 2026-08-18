import React from "react";

import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";

import { useTheme } from "../../theme";
import { AppText } from "./AppText";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "soft"
  | "ghost"
  | "destructive";

export type ButtonSize =
  | "sm"
  | "md"
  | "lg";

interface ButtonProps
  extends Omit<PressableProps, "style"> {

  title: string;

  variant?: ButtonVariant;

  size?: ButtonSize;

  fullWidth?: boolean;

  loading?: boolean;

  leftIcon?: React.ReactNode;

  rightIcon?: React.ReactNode;

  style?: StyleProp<ViewStyle>;

  textStyle?: StyleProp<TextStyle>;
}

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
}: ButtonProps) {

  const theme = useTheme();

  const variants: Record<
    ButtonVariant,
    {
      backgroundColor: string;
      textColor: string;
      borderColor?: string;
    }
  > = {

    primary: {
      backgroundColor:
        theme.colors.primary,

      textColor:
        theme.colors.white,
    },

    secondary: {
      backgroundColor:
        theme.colors.accent,

      textColor:
        theme.colors.white,
    },

    outline: {
      backgroundColor:
        "transparent",
      textColor:
        theme.colors.primary,
      borderColor:
        theme.colors.primary,
    },

    soft: {
      backgroundColor:
        theme.colors.primarySoft,

      textColor:
        theme.colors.primary,
    },

    ghost: {
      backgroundColor:
        "transparent",

      textColor:
        theme.colors.text,

      borderColor:
        theme.colors.border,
    },

    destructive: {
      backgroundColor:
        theme.colors.error,

      textColor:
        theme.colors.white,
    },
  };

  const sizes: Record<
    ButtonSize,
    {
      height: number;
      horizontalPadding: number;
    }
  > = {

    sm: {
      height: 40,
      horizontalPadding:
        theme.spacing[4],
    },

    md: {
      height:
        theme.components.button.height,

      horizontalPadding:
        theme.spacing[5],
    },

    lg: {
      height: 56,
      horizontalPadding:
        theme.spacing[6],
    },
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
        busy: loading,
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
            currentVariant.borderColor
              ? 1
              : 0,

          borderColor:
            currentVariant.borderColor,

          flexDirection: "row",

          alignItems: "center",
          justifyContent: "center",

          gap: theme.spacing[2],

          alignSelf:
            fullWidth
              ? "stretch"
              : "flex-start",

          opacity:
            isDisabled
              ? 0.45
              : pressed
                ? 0.78
                : 1,
        },

        style,
      ]}
    >

      {loading ? (

        <ActivityIndicator
          size="small"
          color={
            currentVariant.textColor
          }
        />

      ) : (
        <>
          {leftIcon}

          <AppText
            variant="label"
            style={[
              {
                color:
                  currentVariant.textColor,
              },

              textStyle,
            ]}
          >
            {title}
          </AppText>

          {rightIcon}
        </>
      )}

    </Pressable>
  );
}