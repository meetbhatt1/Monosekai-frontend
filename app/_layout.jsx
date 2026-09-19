import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider } from "../src/theme";
import { AuthProvider, useAuthRedirect } from "../src/auth";
import { QueryProvider } from "../src/query/QueryProvider";

// Ensure Axios client + interceptors initialize with the app.
import "../src/api/client";

function AuthGate({ children }) {
  useAuthRedirect();
  return <>{children}</>;
}

export default function RootLayout() {
  useEffect(() => {

    // Splash / font hide can be added later without changing route architecture.
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <QueryProvider>
            <AuthProvider>
              <AuthGate>
                <StatusBar style="auto" />
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="index" />
                  <Stack.Screen name="(auth)" />
                  <Stack.Screen name="(app)" />
                </Stack>
              </AuthGate>
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>);

}