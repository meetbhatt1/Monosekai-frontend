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
  signupSchema,
  type SignupFormValues,
} from "../../validators/auth/signup.schema";
import { useRegisterMutation } from "../../auth/auth.mutations";
import { normalizeApiError } from "../../utils/api-error";

export default function SignupScreen() {
  const router = useRouter();
  const { width, height, horizontalPadding } = useResponsive();
  const registerMutation = useRegisterMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      // Backend requires username + email + password and returns a token immediately.
      await registerMutation.mutateAsync({
        username: values.username,
        email: values.email,
        password: values.password,
      });
      // Session + redirect are handled by authStore / useAuthRedirect.
    } catch {
      // Error rendered from mutation state.
    }
  });

  const apiError = registerMutation.error
    ? normalizeApiError(registerMutation.error)
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
            <AppText variant="h1">Join Monosekai</AppText>
            <AppText
              variant="body"
              tone="secondary"
              style={{ marginBottom: 12 }}
            >
              Create an account to start watching.
            </AppText>
          </Stack>

          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextField
                label="Username"
                boldLabel
                placeholder="yourname"
                autoCapitalize="none"
                autoCorrect={false}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                containerStyle={{ marginVertical: 8, width: width * 0.9 }}
              />
            )}
          />
          {errors.username ? (
            <AppText tone="error" variant="caption">
              {errors.username.message}
            </AppText>
          ) : null}

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

          {apiError ? (
            <AppText variant="label" style={{ marginVertical: 8, color: theme.colors.coral }}>
              {apiError.message}
            </AppText>
          ) : null}

          <AppButton
            variant="primary"
            title="Sign Up"
            loading={registerMutation.isPending}
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
          <AppText variant="body">Already have an account?</AppText>

          <AppText
            variant="body"
            tone="primary"
            style={{
              color: theme.colors.primary,
              textDecorationStyle: "solid",
              textDecorationLine: "underline",
            }}
            onPress={() => router.push("/(auth)/login")}
          >
            Log In
          </AppText>
        </Stack>
      </Stack>
    </Screen>
  );
}
