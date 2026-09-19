import React from "react";

import { StyleSheet, View } from "react-native";

import { useTheme } from "../../theme";

import { AppText } from "./AppText";





export function Divider({
  text = ""
}) {

  const theme = useTheme();

  return (
    <View style={styles.container}>

      <View
        style={[
        styles.line,
        {
          backgroundColor:
          theme.colors.border
        }]
        } />
      

      {text ?
      <AppText
        variant="label"
        tone="secondary"
        style={styles.text}>
        
          {text}
        </AppText> :
      null}

      <View
        style={[
        styles.line,
        {
          backgroundColor:
          theme.colors.border
        }]
        } />
      

    </View>);

}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  },

  line: {
    flex: 1,
    height: 1
  },

  text: {
    margin: 12
  }
});