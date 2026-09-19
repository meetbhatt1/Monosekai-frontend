import { StyleSheet, View } from "react-native";
import { Stack, AppText } from "../..";
import React from "react";







export function AuthHeader({ title, subtitle, align }) {
  return (
    <Stack gap={2}>
      <Stack gap={1}>
        <AppText variant="h2" tone="primary">
          {title}
        </AppText>
        {subtitle &&
        <AppText variant="body" tone="secondary">
            {subtitle}
          </AppText>
        }
        {align &&
        <View style={styles.align}>
            {align}
          </View>
        }
      </Stack>
    </Stack>);

}

const styles = StyleSheet.create({
  align: {
    alignItems: "center"
  }
});