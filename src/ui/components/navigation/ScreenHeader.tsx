import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

import { AppText } from "../../primitives/AppText";
import { Icon } from "../../primitives/Icon";
import { IconButton } from "../../primitives/IconButton";

interface ScreenHeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  right?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function ScreenHeader({
  title,
  subtitle,
  showBack = true,
  onBack,
  right,
  style,
}: ScreenHeaderProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          gap: theme.spacing[3],

          minHeight: theme.components.iconButton.size,
        },
        style,
      ]}
    >
      {showBack ? (
        <IconButton
          accessibilityLabel="Go back"
          variant="soft"
          size="sm"
          icon={<Icon name="chevron-back" size={20} tone="brand" />}
          onPress={onBack}
        />
      ) : null}

      <View style={{ flex: 1, gap: 2 }}>
        {title ? (
          <AppText variant="h3" numberOfLines={1}>
            {title}
          </AppText>
        ) : null}

        {subtitle ? (
          <AppText variant="caption" tone="muted" numberOfLines={1}>
            {subtitle}
          </AppText>
        ) : null}
      </View>

      {right}
    </View>
  );
}
