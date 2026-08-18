import React from "react";
import {
  Pressable,
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

import { useTheme } from "../../../theme";

import { Icon } from "../../primitives/Icon";
import { Surface } from "../../primitives/Surface";

interface SearchBarProps extends TextInputProps {
  onClear?: () => void;
  showClear?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

export function SearchBar({
  onClear,
  showClear = false,
  containerStyle,
  placeholder = "Search anime, movies, characters",
  style,
  ...props
}: SearchBarProps) {
  const theme = useTheme();

  return (
    <Surface
      variant="soft"
      radius="pill"
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          gap: theme.spacing[3],

          height: theme.components.input.height,
          paddingHorizontal: theme.spacing[4],
        },
        containerStyle,
      ]}
    >
      <Icon name="search-outline" size={20} tone="muted" />

      <TextInput
        {...props}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        style={[
          {
            flex: 1,
            fontSize: theme.typography.sizes.md,
            color: theme.colors.text,
          },
          style,
        ]}
      />

      {showClear ? (
        <Pressable onPress={onClear} hitSlop={8}>
          <Icon name="close-circle" size={18} tone="muted" />
        </Pressable>
      ) : null}
    </Surface>
  );
}
