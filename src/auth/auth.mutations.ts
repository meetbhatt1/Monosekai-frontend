import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authService } from "../api/services/auth.service";
import { normalizeApiError } from "../utils/api-error";
import { authStore } from "./auth.store";
import type { AuthUser } from "./auth.types";
import type {
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  ResendOtpRequest,
  VerifyOtpRequest,
} from "../api/types";

/**
 * TODO(backend-contract): Tighten token/user extraction once API shapes are final.
 */
function extractTokens(payload: {
  tokens?: { accessToken?: string; refreshToken?: string | null };
  accessToken?: string;
  refreshToken?: string | null;
}) {
  const accessToken = payload.tokens?.accessToken ?? payload.accessToken;
  const refreshToken =
    payload.tokens?.refreshToken ?? payload.refreshToken ?? null;

  return {
    accessToken: accessToken ?? null,
    refreshToken,
  };
}

function extractUser(
  payload: { user?: AuthUser },
  fallbackEmail?: string
): AuthUser | null {
  if (payload.user?.id && payload.user?.email) {
    return {
      id: payload.user.id,
      email: payload.user.email,
      emailVerified: payload.user.emailVerified,
      displayName: payload.user.displayName ?? null,
    };
  }

  if (fallbackEmail) {
    // Placeholder user when backend returns tokens without a user object.
    return {
      id: "unknown",
      email: fallbackEmail,
    };
  }

  return null;
}

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: (input: LoginRequest) => authService.login(input),
    onSuccess: async (data, variables) => {
      // TODO(backend-contract): If login returns requiresOtp, do not authenticate yet.
      if (data.requiresOtp) {
        return;
      }

      const tokens = extractTokens(data);
      const user = extractUser(data, variables.email);

      if (tokens.accessToken && user) {
        await authStore.setAuthenticated({
          user,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        });
        await queryClient.invalidateQueries({ queryKey: ["profiles"] });
      }
    },
  });
}

export function useRegisterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["auth", "register"],
    mutationFn: (input: RegisterRequest) => authService.register(input),
    onSuccess: async (response) => {
      // Backend: `{ success, message, data: { user, profile, token } }`
      const nested = response.data;
      const token = nested?.token ?? response.token ?? response.tokens?.accessToken;
      const rawUser = nested?.user ?? response.user;

      if (!token || !rawUser?.id || !rawUser?.email) {
        return;
      }

      const username =
        "username" in rawUser && typeof rawUser.username === "string"
          ? rawUser.username
          : null;

      await authStore.setAuthenticated({
        user: {
          id: String(rawUser.id),
          email: String(rawUser.email),
          displayName: username ?? rawUser.displayName ?? null,
        },
        accessToken: token,
      });
      await queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
}

export function useVerifyOtpMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["auth", "verify-otp"],
    mutationFn: (input: VerifyOtpRequest) => authService.verifyOtp(input),
    onSuccess: async (data, variables) => {
      const tokens = extractTokens(data);
      const user = extractUser(data, variables.email);

      if (tokens.accessToken && user) {
        await authStore.setAuthenticated({
          user,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        });
        await queryClient.invalidateQueries({ queryKey: ["profiles"] });
      }
    },
  });
}

export function useResendOtpMutation() {
  return useMutation({
    mutationKey: ["auth", "resend-otp"],
    mutationFn: (input: ResendOtpRequest) => authService.resendOtp(input),
  });
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationKey: ["auth", "forgot-password"],
    mutationFn: (input: ForgotPasswordRequest) =>
      authService.forgotPassword(input),
  });
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationKey: ["auth", "reset-password"],
    mutationFn: (input: ResetPasswordRequest) =>
      authService.resetPassword(input),
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["auth", "logout"],
    mutationFn: async () => {
      try {
        await authService.logout();
      } catch (error) {
        // Still clear local session if network logout fails.
        normalizeApiError(error);
      } finally {
        await authStore.clearSession();
        queryClient.clear();
      }
    },
  });
}

export function getMutationStatus(
  mutation: {
    isIdle: boolean;
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
  }
): "idle" | "loading" | "success" | "error" {
  if (mutation.isPending) return "loading";
  if (mutation.isSuccess) return "success";
  if (mutation.isError) return "error";
  return "idle";
}
