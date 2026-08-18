import React from "react";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Screen } from "../../ui/primitives/Screen";
import { Stack } from "../../ui/primitives/Stack";
import { AppText } from "../../ui/primitives/AppText";
import { AppButton } from "../../ui/primitives/AppButton";
import { AppTextField } from "../../ui/primitives/AppTextField";
import { AppPasswordField } from "../../ui/primitives/AppPasswordField";
import { Divider } from "../../ui/primitives/AppDivider";

import { ThemeCharacter } from "../../ui/components/auth/ThemeCharacter";

import { theme, useResponsive } from "../../theme";
import { hp } from "../../theme/responsive";
import SocialButtons from "../../ui/components/auth/SocialButtons";
import {
  loginSchema,
  type LoginFormValues,
} from "../../validators/auth/login.schema";
import { useLoginMutation } from "../../auth/auth.mutations";
import { normalizeApiError } from "../../utils/api-error";

export default function LoginScreen() {
  const router = useRouter();
  const { width, height, horizontalPadding } = useResponsive();
  const loginMutation = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [contractHint, setContractHint] = React.useState<string | null>(null);

  const onSubmit = handleSubmit(async (values) => {
    setContractHint(null);
    try {
      const result = await loginMutation.mutateAsync(values);

      // TODO(backend-contract): Confirm requiresOtp behavior after login.
      if (result.requiresOtp) {
        router.push({
          pathname: "/(auth)/otp",
          params: { email: values.email },
        });
        return;
      }

      const accessToken = result.tokens?.accessToken ?? result.accessToken;
      if (!accessToken) {
        // Success without tokens — wait for backend contract confirmation.
        setContractHint(
          result.message ??
            "Login succeeded but no session tokens were returned yet."
        );
      }
      // Authenticated redirect is handled centrally by useAuthRedirect.
    } catch {
      // Error rendered below from mutation state.
    }
  });

  const apiError = loginMutation.error
    ? normalizeApiError(loginMutation.error)
    : null;

  return (
    <Screen>
      <ThemeCharacter
        page="login"
        style={{
          position: "absolute",
          top: hp(height, 2),
          right: horizontalPadding,
          width: 96,
          height: 96,
        }}
      />

      <Stack
        flex={1}
        justify="space-between"
        style={{
          paddingHorizontal: horizontalPadding,
          flexWrap: "nowrap",
          paddingTop: hp(height, 10),
          paddingBottom: hp(height, 4),
        }}
      >
        <Stack gap="xl">
          <Stack gap="xs">
            <AppText variant="h1">Welcome back!</AppText>
            <AppText
              variant="body"
              tone="secondary"
              style={{ marginBottom: 12 }}
            >
              Login to continue your journey.
            </AppText>
          </Stack>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextField
                label="Email"
                boldLabel
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                containerStyle={{ marginVertical: 8, width: width * 0.9 }}
              />
            )}
          />
          {errors.email ? (
            <AppText tone="error" variant="caption">
              {errors.email.message}
            </AppText>
          ) : null}
          {apiError?.fieldErrors.email ? (
            <AppText tone="error" variant="caption">
              {apiError.fieldErrors.email}
            </AppText>
          ) : null}

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppPasswordField
                label="Password"
                boldLabel
                placeholder="••••••••"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                containerStyle={{ marginVertical: 8, width: width * 0.9 }}
              />
            )}
          />
          {errors.password ? (
            <AppText tone="error" variant="caption">
              {errors.password.message}
            </AppText>
          ) : null}
          {apiError?.fieldErrors.password ? (
            <AppText tone="error" variant="caption">
              {apiError.fieldErrors.password}
            </AppText>
          ) : null}

          <AppText
            variant="label"
            tone="primary"
            style={{ color: theme.colors.primary, fontWeight: "700" }}
            align="right"
            onPress={() => router.push("/(auth)/forgot-password")}
          >
            Forgot Password?
          </AppText>

          {apiError?.message && !apiError.fieldErrors.email && !apiError.fieldErrors.password ? (
            <AppText tone="error" variant="caption">
              {apiError.message}
            </AppText>
          ) : null}

          {contractHint ? (
            <AppText tone="secondary" variant="caption">
              {contractHint}
            </AppText>
          ) : null}

          <AppButton
            variant="primary"
            title="Log In"
            loading={loginMutation.isPending}
            onPress={onSubmit}
            style={{
              height: height / 14,
              width: width * 0.9,
              borderRadius: theme.radius.md,
              borderWidth: 1,
              borderColor: theme.colors.border,
              marginVertical: 8,
            }}
          />

          <Divider text="or continue with" />

          <Stack gap="md" direction="horizontal" justify="space-between">
            <SocialButtons provider="google" onPress={() => {}} />
            <SocialButtons provider="apple" onPress={() => {}} />
            <SocialButtons provider="discord" onPress={() => {}} />
          </Stack>
        </Stack>

        <Stack direction="horizontal" justify="center" gap="xs">
          <AppText variant="body">Don't have an account?</AppText>

          <AppText
            variant="body"
            tone="primary"
            style={{
              color: theme.colors.primary,
              textDecorationStyle: "solid",
              textDecorationLine: "underline",
            }}
            onPress={() => router.push("/(auth)/signup")}
          >
            Sign Up
          </AppText>
        </Stack>
      </Stack>
    </Screen>
  );
}
