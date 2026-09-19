import React, { useRef, useState } from "react";
import { TextInput } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { Screen } from "../../ui/primitives/Screen";
import { Stack } from "../../ui/primitives/Stack";
import { AppText } from "../../ui/primitives/AppText";
import { AppButton } from "../../ui/primitives/AppButton";
import { AppTextField } from "../../ui/primitives/AppTextField";

import { ThemeCharacter } from "../../ui/components/auth/ThemeCharacter";

import { theme, useResponsive } from "../../theme";
import { hp } from "../../theme/responsive";
import { otpSchema } from "../../validators/auth/otp.schema";

const OTP_LENGTH = 6;

export default function OTPScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = typeof params.email === "string" ? params.email : "";

  const { width, height, horizontalPadding } = useResponsive();
  const inputs = useRef([]);
  const [digits, setDigits] = useState(
    Array.from({ length: OTP_LENGTH }, () => "")
  );
  const [localError, setLocalError] = useState(null);

  const code = digits.join("");

  const onVerify = async () => {
    setLocalError(null);

    const parsed = otpSchema.safeParse({ email, code });
    if (!parsed.success) {
      setLocalError(parsed.error.issues[0]?.message ?? "Invalid code");
      return;
    }

    // Backend has no /auth/verify-otp route yet.
    setLocalError("Email OTP is not enabled on the server yet.");
  };

  const onResend = async () => {
    setLocalError(null);
    if (!email) {
      setLocalError("Missing email for resend");
      return;
    }

    setLocalError("Email OTP is not enabled on the server yet.");
  };

  return (
    <Screen>
      <ThemeCharacter
        page="login"
        style={{
          position: "absolute",
          top: hp(height, 2),
          right: horizontalPadding,
          width: 96,
          height: 96
        }} />
      

      <Stack
        flex={1}
        justify="space-between"
        style={{
          paddingHorizontal: horizontalPadding,
          flexWrap: "nowrap",
          paddingTop: hp(height, 10),
          paddingBottom: hp(height, 4)
        }}>
        
        <Stack gap="xl">
          <Stack gap="xs">
            <AppText variant="h1">Verify your email</AppText>
            <AppText
              variant="body"
              tone="secondary"
              style={{ marginBottom: 12 }}>
              
              We sent a 6-digit code to your email. Enter it below to continue.
            </AppText>
            {email ?
            <AppText variant="caption" tone="muted">
                {email}
              </AppText> :

            <AppText
              variant="caption"
              tone="error"
              onPress={() => router.replace("/(auth)/signup")}>
              
                Missing email — go back to Sign Up
              </AppText>
            }
          </Stack>

          <Stack gap="sm">
            <AppText
              variant="body"
              style={{ fontWeight: "bold", marginLeft: 4 }}>
              
              Verification Code
            </AppText>

            <Stack
              direction="horizontal"
              justify="space-between"
              gap="sm"
              style={{ width: width * 0.9 }}>
              
              {Array.from({ length: OTP_LENGTH }).map((_, index) =>
              <AppTextField
                key={index}
                ref={(ref) => {
                  inputs.current[index] = ref;
                }}
                value={digits[index]}
                maxLength={1}
                keyboardType="number-pad"
                autoCapitalize="none"
                autoCorrect={false}
                containerStyle={{ flex: 1, marginVertical: 8 }}
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "700"
                }}
                onChangeText={(text) => {
                  const nextChar = text.replace(/\D/g, "").slice(-1);
                  setDigits((prev) => {
                    const next = [...prev];
                    next[index] = nextChar;
                    return next;
                  });
                  if (nextChar && index < OTP_LENGTH - 1) {
                    inputs.current[index + 1]?.focus();
                  }
                }}
                onKeyPress={({ nativeEvent }) => {
                  if (
                  nativeEvent.key === "Backspace" &&
                  !digits[index] &&
                  index > 0)
                  {
                    inputs.current[index - 1]?.focus();
                  }
                }} />

              )}
            </Stack>
          </Stack>

          {localError ?
          <AppText tone="error" variant="caption">
              {localError}
            </AppText> :
          null}

          <AppButton
            variant="primary"
            title="Verify & Continue"
            onPress={() => void onVerify()}
            style={{
              height: height / 14,
              width: width * 0.9,
              borderRadius: theme.radius.md,
              borderWidth: 1,
              borderColor: theme.colors.border,
              marginVertical: 8
            }} />
          

          <Stack gap="xs" align="center" style={{ width: width * 0.9 }}>
            <AppText variant="body" tone="secondary" align="center">
              Didn't receive the code?
            </AppText>

            <AppText
              variant="body"
              tone="primary"
              style={{
                color: theme.colors.primary,
                fontWeight: "700",
                textDecorationStyle: "solid",
                textDecorationLine: "underline"
              }}
              onPress={() => void onResend()}>
              
              Resend OTP
            </AppText>
          </Stack>
        </Stack>
      </Stack>
    </Screen>);

}