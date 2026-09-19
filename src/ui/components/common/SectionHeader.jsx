import React from "react";
import { Pressable } from "react-native";

import { useTheme } from "../../../theme";

import { AppText } from "../../primitives/AppText";
import { Stack } from "../../primitives/Stack";








export function SectionHeader({
  title,
  actionLabel,
  onAction,
  style
}) {
  const theme = useTheme();

  return (
    <Stack
      direction="horizontal"
      align="center"
      justify="space-between"
      style={style}>
      
      <AppText variant="h3">{title}</AppText>

      {actionLabel ?
      <Pressable onPress={onAction} hitSlop={8}>
          <AppText variant="label" style={{ color: theme.colors.primary }}>
            {actionLabel}
          </AppText>
        </Pressable> :
      null}
    </Stack>);

}