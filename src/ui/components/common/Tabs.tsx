import React from "react";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

import { AppText } from "../../primitives/AppText";

interface TabsProps {
  tabs: string[];
  active?: string;
  onChange?: (tab: string) => void;
  style?: StyleProp<ViewStyle>;
}

export function Tabs({ tabs, active, onChange, style }: TabsProps) {
  const theme = useTheme();

  const current = active ?? tabs[0];

  return (
    <View
      style={[
        {
          flexDirection: "row",
          gap: theme.spacing[6],
          borderBottomWidth: 1,
          borderColor: theme.colors.divider,
        },
        style,
      ]}
    >
      {tabs.map((tab) => {
        const isActive = tab === current;

        return (
          <Pressable
            key={tab}
            onPress={() => onChange?.(tab)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            style={{
              paddingBottom: theme.spacing[3],
              borderBottomWidth: 2,
              borderColor: isActive ? theme.colors.primary : "transparent",
            }}
          >
            <AppText
              variant="label"
              style={{
                color: isActive ? theme.colors.primary : theme.colors.textSecondary,
              }}
            >
              {tab}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}
