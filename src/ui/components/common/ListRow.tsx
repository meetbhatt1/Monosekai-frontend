import React from "react";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

import { AppText } from "../../primitives/AppText";
import { Stack } from "../../primitives/Stack";

interface ListRowProps {
  title: string;
  subtitle?: string;
  meta?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  footer?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function ListRow({
  title,
  subtitle,
  meta,
  leading,
  trailing,
  footer,
  onPress,
  style,
}: ListRowProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={onPress ? "button" : undefined}
      style={({ pressed }) => [
        {
          flexDirection: "row",
          alignItems: "center",
          gap: theme.spacing[3],
          opacity: pressed && onPress ? 0.8 : 1,
        },
        style,
      ]}
    >
      {leading}

      <View style={{ flex: 1, gap: theme.spacing[1] }}>
        <AppText variant="bodyMedium" numberOfLines={1}>
          {title}
        </AppText>

        {subtitle ? (
          <AppText variant="caption" tone="secondary" numberOfLines={1}>
            {subtitle}
          </AppText>
        ) : null}

        {meta ? (
          <AppText variant="caption" tone="muted" numberOfLines={1}>
            {meta}
          </AppText>
        ) : null}

        {footer}
      </View>

      {trailing ? <Stack align="center">{trailing}</Stack> : null}
    </Pressable>
  );
}
