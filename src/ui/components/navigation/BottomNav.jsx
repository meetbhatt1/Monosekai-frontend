import React from "react";
import { Pressable } from "react-native";

import { useTheme } from "../../../theme";

import { AppText } from "../../primitives/AppText";
import { Icon, IconName } from "../../primitives/Icon";
import { Stack } from "../../primitives/Stack";
import { Surface } from "../../primitives/Surface";








const TABS =




[
{ key: "home", label: "Home", icon: "home-outline", activeIcon: "home" },
{ key: "browse", label: "Browse", icon: "search-outline", activeIcon: "search" },
{ key: "watchlist", label: "Watchlist", icon: "bookmark-outline", activeIcon: "bookmark" },
{ key: "downloads", label: "Downloads", icon: "download-outline", activeIcon: "download" },
{ key: "profile", label: "Profile", icon: "person-outline", activeIcon: "person" }];








export function BottomNav({ active = "home", onChange, style }) {
  const theme = useTheme();

  return (
    <Surface
      variant="default"
      radius="xl"
      style={[
      {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        height: theme.components.bottomNav.height,
        paddingHorizontal: theme.spacing[3],

        borderTopWidth: 1,
        borderColor: theme.colors.border
      },
      style]
      }>
      
      {TABS.map((tab) => {
        const isActive = tab.key === active;

        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange?.(tab.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            style={{ flex: 1 }}>
            
            <Stack align="center" gap={1}>
              <Icon
                name={isActive ? tab.activeIcon : tab.icon}
                size={22}
                color={isActive ? theme.colors.primary : theme.colors.textMuted} />
              

              <AppText
                variant="caption"
                style={{
                  color: isActive ? theme.colors.primary : theme.colors.textMuted,
                  fontWeight: isActive ? "600" : "400"
                }}>
                
                {tab.label}
              </AppText>
            </Stack>
          </Pressable>);

      })}
    </Surface>);

}