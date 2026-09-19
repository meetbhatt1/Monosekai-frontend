import React from "react";

import { ScrollView, View } from "react-native";

import {
  SafeAreaView } from
"react-native-safe-area-context";

import {
  useTheme,
  useResponsive } from
"../../theme";










export function Screen({
  children,
  scroll = false,
  padded = false,
  style,
  contentStyle,
  scrollProps
}) {
  const theme = useTheme();

  const {
    horizontalPadding
  } = useResponsive();

  const baseContentStyle = {
    flexGrow: scroll ? undefined : 1,

    paddingHorizontal:
    padded ?
    horizontalPadding :
    0
  };

  return (
    <SafeAreaView
      style={[
      {
        flex: 1,
        maxWidth: "100%",
        backgroundColor:
        theme.colors.background
      },
      style]
      }>
      
      {scroll ?
      <ScrollView
        {...scrollProps}
        contentContainerStyle={[
        baseContentStyle,
        contentStyle]
        }
        showsVerticalScrollIndicator={false}>
        
          {children}
        </ScrollView> :

      <View
        style={[
        {
          flex: 1,
          position: "relative"
        },
        baseContentStyle,
        contentStyle]
        }>
        
          {children}
        </View>
      }
    </SafeAreaView>);

}