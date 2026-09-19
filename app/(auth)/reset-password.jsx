import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Screen } from "../../src/ui/primitives/Screen";
import { Stack } from "../../src/ui/primitives/Stack";
import { AppText } from "../../src/ui/primitives/AppText";
import { AppButton } from "../../src/ui/primitives/AppButton";
import { AppTextField } from "../../src/ui/primitives/AppTextField";
import { AppPasswordField } from "../../src/ui/primitives/AppPasswordField";
import { useResponsive, theme } from "../../src/theme";
import { hp } from "../../src/theme/responsive";
import {
  resetPasswordSchema } from

"../../src/validators/auth/reset-password.schema";

/**
 * Temporary placeholder UI — visual polish comes later.
 * TODO(backend-contract): Confirm whether reset uses token, OTP code, or both.
 */
export default function ResetPasswordRoute() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { width, height, horizontalPadding } = useResponsive();
  const [info, setInfo] = React.useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: typeof params.email === "string" ? params.email : "",
      token: typeof params.token === "string" ? params.token : "",
      code: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = handleSubmit(async () => {
    // Backend has forgot-password (emails a token) but no reset-password route yet.
    setInfo("Password reset confirmation is not enabled on the server yet.");
  });

  return (
    <Screen>
      <Stack
        flex={1}
        gap="xl"
        style={{
          paddingHorizontal: horizontalPadding,
          paddingTop: hp(height, 10),
          paddingBottom: hp(height, 4)
        }}>
        
        <Stack gap="xs">
          <AppText variant="h1">Reset password</AppText>
          <AppText variant="body" tone="secondary">
            Choose a new password for your account.
          </AppText>
        </Stack>

        <Controller
          control={control}
          name="code"
          render={({ field: { onChange, onBlur, value } }) =>
          <AppTextField
            label="Reset code"
            boldLabel
            placeholder="Code from email"
            autoCapitalize="none"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            containerStyle={{ marginVertical: 8, width: width * 0.9 }} />

          } />
        

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) =>
          <AppPasswordField
            label="New password"
            boldLabel
            placeholder="••••••••"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            containerStyle={{ marginVertical: 8, width: width * 0.9 }} />

          } />
        
        {errors.password ?
        <AppText tone="error" variant="caption">
            {errors.password.message}
          </AppText> :
        null}

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) =>
          <AppPasswordField
            label="Confirm password"
            boldLabel
            placeholder="••••••••"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            containerStyle={{ marginVertical: 8, width: width * 0.9 }} />

          } />
        
        {errors.confirmPassword ?
        <AppText tone="error" variant="caption">
            {errors.confirmPassword.message}
          </AppText> :
        null}

        {errors.token ?
        <AppText tone="error" variant="caption">
            {errors.token.message}
          </AppText> :
        null}

        {info ?
        <AppText tone="secondary" variant="caption">
            {info}
          </AppText> :
        null}

        <AppButton
          variant="primary"
          title="Update password"
          onPress={onSubmit}
          style={{
            height: height / 14,
            width: width * 0.9,
            borderRadius: theme.radius.md,
            marginVertical: 8
          }} />
        
      </Stack>
    </Screen>);

}