/**
 * API path constants.
 * Paths only — host comes from env / Axios client baseURL.
 */
export const endpoints = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    verifyOtp: "/auth/verify-otp",
    resendOtp: "/auth/resend-otp",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },
  profiles: {
    list: "/profiles",
    /**
     * TODO(backend-contract): Confirm select-profile path and payload.
     */
    select: "/profiles/select",
  },
} as const;
