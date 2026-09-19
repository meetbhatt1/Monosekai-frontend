import React from "react";
import { Pressable } from "react-native";

import { useTheme } from "../../../theme";

import { AppText } from "../../primitives/AppText";
import { Icon, IconName } from "../../primitives/Icon";









export function Chip({
  label,
  selected = false,
  icon,
  onPress,
  style
}) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={({ pressed }) => [
      {
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing[2],

        height: 36,
        paddingHorizontal: theme.spacing[4],

        borderRadius: theme.radius.pill,

        backgroundColor: selected ?
        theme.colors.primary :
        theme.colors.surface,

        borderWidth: 1,
        borderColor: selected ?
        theme.colors.primary :
        theme.colors.border,

        opacity: pressed ? 0.8 : 1
      },
      style]
      }>
      
      {icon ?
      <Icon
        name={icon}
        size={16}
        color={selected ? theme.colors.white : theme.colors.textSecondary} /> :

      null}

      <AppText
        variant="label"
        style={{
          color: selected ? theme.colors.white : theme.colors.textSecondary
        }}>
        
        {label}
      </AppText>
    </Pressable>);

}