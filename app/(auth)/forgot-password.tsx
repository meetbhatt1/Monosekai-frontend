import React from "react";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Screen } from "../../src/ui/primitives/Screen";
import { Stack } from "../../src/ui/primitives/Stack";
import { AppText } from "../../src/ui/primitives/AppText";
import { AppButton } from "../../src/ui/primitives/AppButton";
import { AppTextField } from "../../src/ui/primitives/AppTextField";
import { useResponsive, theme } from "../../src/theme";
import { hp } from "../../src/theme/responsive";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "../../src/validators/auth/forgot-password.schema";
import { useForgotPasswordMutation } from "../../src/auth/auth.mutations";
import { normalizeApiError } from "../../src/utils/api-error";

/**
 * Temporary placeholder UI — visual polish comes later.
 * Wired to forgot-password API + validation.
 */
export default function ForgotPasswordRoute() {
  const router = useRouter();
  const { width, height, horizontalPadding } = useResponsive();
  const mutation = useForgotPasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await mutation.mutateAsync(values);
      router.push({
        pathname: "/(auth)/reset-password",
        params: { email: values.email },
      });
    } catch {
      // Error surfaced via mutation.error
    }
  });

  const apiError = mutation.error
    ? normalizeApiError(mutation.error).message
    : null;

  return (
    <Screen>
      <Stack
        flex={1}
        justify="space-between"
        style={{
          paddingHorizontal: horizontalPadding,
          paddingTop: hp(height, 10),
          paddingBottom: hp(height, 4),
        }}
      >
        <Stack gap="xl">
          <Stack gap="xs">
            <AppText variant="h1">Forgot password</AppText>
            <AppText variant="body" tone="secondary">
              Enter your email and we will send reset instructions.
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

          {apiError ? (
            <AppText tone="error" variant="caption">
              {apiError}
            </AppText>
          ) : null}

          {mutation.isSuccess ? (
            <AppText tone="success" variant="caption">
              If an account exists, reset instructions were sent.
            </AppText>
          ) : null}

          <AppButton
            variant="primary"
            title="Send reset link"
            loading={mutation.isPending}
            onPress={onSubmit}
            style={{
              height: height / 14,
              width: width * 0.9,
              borderRadius: theme.radius.md,
              marginVertical: 8,
            }}
          />
        </Stack>

        <AppText
          variant="body"
          tone="primary"
          style={{
            color: theme.colors.primary,
            textDecorationLine: "underline",
            alignSelf: "center",
          }}
          onPress={() => router.replace("/(auth)/login")}
        >
          Back to Log In
        </AppText>
      </Stack>
    </Screen>
  );
}
