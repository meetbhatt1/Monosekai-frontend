import React from "react";
import { Pressable, TextInput, View } from "react-native";

import { useTheme } from "../../../theme";

import { Icon } from "../../primitives/Icon";
import { Surface } from "../../primitives/Surface";







export function SearchBar({
  onClear,
  showClear = false,
  containerStyle,
  placeholder = "Search anime, movies, characters",
  style,
  ...props
}) {
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
        paddingHorizontal: theme.spacing[4]
      },
      containerStyle]
      }>
      
      <Icon name="search-outline" size={20} tone="muted" />

      <TextInput
        {...props}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        style={[
        {
          flex: 1,
          fontSize: theme.typography.sizes.md,
          color: theme.colors.text
        },
        style]
        } />
      

      {showClear ?
      <Pressable onPress={onClear} hitSlop={8}>
          <Icon name="close-circle" size={18} tone="muted" />
        </Pressable> :
      null}
    </Surface>);

}