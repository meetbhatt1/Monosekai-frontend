import React, { useState } from "react";

import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { useTheme } from "../../theme";

















export function AppImage({
  source,
  containerStyle,
  fit = "cover",
  showLoader = true,
  fallback,
  style,
  onLoadStart,
  onLoadEnd,
  onError,
  ...props
}) {

  const theme = useTheme();

  const [loading, setLoading] =
  useState(false);

  const [failed, setFailed] =
  useState(false);

  return (
    <View
      style={[
      styles.container,
      containerStyle,
      {
        backgroundColor: "transparent"
      }]
      }>
      

      {!failed &&
      <Image
        {...props}

        source={source}

        resizeMode={fit}

        style={[
        StyleSheet.absoluteFill,
        style]
        }

        onLoadStart={(event) => {
          setLoading(true);
          setFailed(false);

          onLoadStart?.(event);
        }}

        onLoadEnd={(event) => {
          setLoading(false);

          onLoadEnd?.(event);
        }}

        onError={(event) => {
          setLoading(false);
          setFailed(true);

          onError?.(event);
        }} />

      }

      {loading && showLoader &&
      <View
        style={[
        StyleSheet.absoluteFill,
        styles.center]
        }>
        
          <ActivityIndicator
          color={theme.colors.primary} />
        
        </View>
      }

      {failed &&
      <View
        style={[
        StyleSheet.absoluteFill,
        styles.center]
        }>
        
          {fallback ??
        <View
          style={[
          styles.fallbackDot,
          {
            backgroundColor:
            theme.colors.primarySoft
          }]
          } />

        }
        </View>
      }

    </View>);

}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    overflow: "hidden"
  },

  center: {
    justifyContent: "center",
    alignItems: "center"
  },

  fallbackDot: {
    width: 36,
    height: 36,
    borderRadius: 18
  }
});