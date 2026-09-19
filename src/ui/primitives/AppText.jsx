import React from "react";
import { Text } from "react-native";

import { useTheme } from "../../theme";




























export function AppText({
  variant = "body",
  tone = "primary",
  align,
  style,
  children,
  ...props
}) {
  const theme = useTheme();

  const variants = {
    display: {
      fontFamily: theme.typography.body.family,
      fontSize: theme.typography.sizes.hero,
      fontWeight: theme.typography.weights.extraBold,
      lineHeight: 42,
      letterSpacing: -1
    },

    h1: {
      fontFamily: theme.typography.body.family,
      fontSize: theme.typography.sizes.xxl,
      fontWeight: theme.typography.weights.bold,
      lineHeight: 34,
      letterSpacing: -0.5
    },

    h2: {
      fontFamily: theme.typography.body.family,
      fontSize: theme.typography.sizes.xl,
      fontWeight: theme.typography.weights.bold,
      lineHeight: 28
    },

    h3: {
      fontFamily: theme.typography.body.family,
      fontSize: theme.typography.sizes.lg,
      fontWeight: theme.typography.weights.semiBold,
      lineHeight: 24
    },

    body: {
      fontFamily: theme.typography.body.family,
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.regular,
      lineHeight: 22
    },

    bodyMedium: {
      fontFamily: theme.typography.body.family,
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.medium,
      lineHeight: 22
    },

    label: {
      fontFamily: theme.typography.body.family,
      fontSize: theme.typography.sizes.sm,
      fontWeight: theme.typography.weights.semiBold,
      lineHeight: 18
    },

    caption: {
      fontFamily: theme.typography.body.family,
      fontSize: theme.typography.sizes.xs,
      fontWeight: theme.typography.weights.regular,
      lineHeight: 16
    }
  };

  const tones = {
    primary: theme.colors.text,
    secondary: theme.colors.textSecondary,
    muted: theme.colors.textMuted,
    brand: theme.colors.primary,
    error: theme.colors.error,
    success: theme.colors.success,
    inverse: theme.colors.surface
  };

  return (
    <Text
      {...props}
      style={[
      variants[variant],
      {
        color: tones[tone],
        textAlign: align
      },
      style]
      }>
      
      {children}
    </Text>);

}