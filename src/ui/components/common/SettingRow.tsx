import React from "react";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

import { AppText } from "../../primitives/AppText";
import { Icon, IconName } from "../../primitives/Icon";

interface SettingRowProps {
  label: string;
  description?: string;
  value?: string;
  icon?: IconName;
  trailing?: React.ReactNode;
  showChevron?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function SettingRow({
  label,
  description,
  value,
  icon,
  trailing,
  showChevron = true,
  onPress,
  style,
}: SettingRowProps) {
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

          paddingVertical: theme.spacing[3],

          opacity: pressed && onPress ? 0.8 : 1,
        },
        style,
      ]}
    >
      {icon ? <Icon name={icon} size={20} tone="secondary" /> : null}

      <View style={{ flex: 1, gap: 2 }}>
        <AppText variant="body">{label}</AppText>

        {description ? (
          <AppText variant="caption" tone="muted">
            {description}
          </AppText>
        ) : null}
      </View>

      {value ? (
        <AppText variant="caption" tone="secondary">
          {value}
        </AppText>
      ) : null}

      {trailing}

      {showChevron ? (
        <Icon name="chevron-forward" size={18} tone="muted" />
      ) : null}
    </Pressable>
  );
}
