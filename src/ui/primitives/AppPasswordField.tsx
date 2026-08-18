import React, { useState } from "react";

import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import { useResponsive, useTheme } from "../../theme";

import { Surface } from "./Surface";
import { AppText } from "./AppText";

interface Props extends TextInputProps {
  label?: string;
  boldLabel?: boolean;
  containerStyle?: object;
}

export function AppPasswordField({
  label,
  boldLabel = false,
  containerStyle,
  style,
  ...props
}: Props) {

  const theme = useTheme();
  const { width } = useResponsive()

  const [hidden, setHidden] =
    useState(true);

  return (
    <View style={[styles.container, containerStyle]}>

      {label && (
        <AppText
          variant="label"
          style={[styles.label, {
            fontWeight: boldLabel ? "bold" : "normal",
            left: -width*0.025 
          }]}
        >
          {label}
        </AppText>
      )}

      <Surface
        variant="outlined"
        style={styles.surface }
      >

        <TextInput
          {...props}
          secureTextEntry={hidden}
          placeholderTextColor={
            theme.colors.textSecondary
          }
          style={[
            styles.input,
            {
              color: theme.colors.text,
            },
            style,
          ]}
        />

        <Pressable
          onPress={() =>
            setHidden((v) => !v)
          }
        >
          <AppText
            variant="caption"
            tone="primary"
          >
            {hidden ? "Show" : "Hide"}
          </AppText>
        </Pressable>

      </Surface>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },

  label: {
    marginLeft: 4,
    marginHorizontal: 4,
  },

  surface: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },
});