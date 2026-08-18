import { apiClient } from "../client";
import { endpoints } from "../endpoints";
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  RefreshRequest,
  RefreshResponse,
  RegisterRequest,
  RegisterResponse,
  ResendOtpRequest,
  ResendOtpResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "../types";
import { session } from "../../auth/session";

/**
 * Auth API service.
 * UI must not call Axios directly — go through these methods.
 */
export const authService = {
  register(payload: RegisterRequest) {
    return apiClient
      .post<RegisterResponse>(endpoints.auth.register, payload)
      .then((res) => res.data);
  },

  login(payload: LoginRequest) {
    return apiClient
      .post<LoginResponse>(endpoints.auth.login, payload)
      .then((res) => res.data);
  },

  verifyOtp(payload: VerifyOtpRequest) {
    return apiClient
      .post<VerifyOtpResponse>(endpoints.auth.verifyOtp, payload)
      .then((res) => res.data);
  },

  resendOtp(payload: ResendOtpRequest) {
    return apiClient
      .post<ResendOtpResponse>(endpoints.auth.resendOtp, payload)
      .then((res) => res.data);
  },

  refresh(payload: RefreshRequest) {
    return apiClient
      .post<RefreshResponse>(endpoints.auth.refresh, payload, {
        headers: { "X-Skip-Auth-Refresh": "1" },
      })
      .then((res) => res.data);
  },

  async logout() {
    const refreshToken = session.getRefreshToken();
    return apiClient
      .post<LogoutResponse>(
        endpoints.auth.logout,
        refreshToken ? { refreshToken } : {},
        {
          headers: { "X-Skip-Auth-Refresh": "1" },
        }
      )
      .then((res) => res.data);
  },

  forgotPassword(payload: ForgotPasswordRequest) {
    return apiClient
      .post<ForgotPasswordResponse>(endpoints.auth.forgotPassword, payload)
      .then((res) => res.data);
  },

  resetPassword(payload: ResetPasswordRequest) {
    return apiClient
      .post<ResetPasswordResponse>(endpoints.auth.resetPassword, payload)
      .then((res) => res.data);
  },
};
