import React, { forwardRef } from "react";

import { TextInput, StyleSheet, View } from "react-native";

import { useResponsive, useTheme } from "../../theme";

import { Surface } from "./Surface";
import { AppText } from "./AppText";







export const AppTextField = forwardRef(function AppTextField(
{
  label,
  style,
  containerStyle,
  boldLabel = false,
  ...props
},
ref)
{
  const { width } = useResponsive();

  const theme = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      {label &&
      <AppText
        variant="body"
        style={[
        styles.label,
        {
          fontWeight: boldLabel ? "bold" : "normal",
          left: -width * 0.025
        }]
        }>
        
          {label}
        </AppText>
      }

      <Surface variant="outlined" style={styles.surface}>
        <TextInput
          ref={ref}
          {...props}
          placeholderTextColor={theme.colors.textSecondary}
          style={[
          styles.input,
          {
            color: theme.colors.text
          },
          style]
          } />
        
      </Surface>
    </View>);

});

const styles = StyleSheet.create({
  container: {
    gap: 8
  },

  label: {
    marginLeft: 4
  },

  surface: {
    paddingHorizontal: 16,
    paddingVertical: 12
  },

  input: {
    fontSize: 16
  }
});