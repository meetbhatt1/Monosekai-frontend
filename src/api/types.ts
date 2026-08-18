/**
 * Shared API types.
 *
 * IMPORTANT: Backend response contracts are NOT confirmed.
 * Fields marked optional / TODO are placeholders for easy revision.
 */

export type AuthTokens = {
  accessToken: string;
  /**
   * Refresh tokens are sensitive. Prefer SecureStore for persistence.
   * TODO(backend-contract): Confirm whether refresh tokens are issued.
   */
  refreshToken?: string | null;
  /**
   * TODO(backend-contract): Confirm expiry field names (expiresIn vs expiresAt).
   */
  expiresIn?: number | null;
};

/**
 * TODO(backend-contract): Confirm user payload shape from auth endpoints.
 */
export type AuthUser = {
  id: string;
  email: string;
  emailVerified?: boolean;
  displayName?: string | null;
  [key: string]: unknown;
};

/**
 * Matches backend `registerSchema`: username + email + password.
 */
export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

/**
 * Backend envelope: `{ success, message, data: { user, profile, token } }`.
 * Register currently issues a session token immediately (no OTP endpoint yet).
 */
export type RegisterResponse = {
  success?: boolean;
  message?: string;
  data?: {
    user?: AuthUser & { username?: string };
    profile?: Profile;
    token?: string;
  };
  // Flat fallbacks if envelope is ever unwrapped upstream
  email?: string;
  user?: AuthUser;
  profile?: Profile;
  token?: string;
  requiresOtp?: boolean;
  tokens?: AuthTokens;
};

/**
 * TODO(backend-contract): Confirm login identifier (email vs username).
 */
export type LoginRequest = {
  email: string;
  password: string;
};

/**
 * TODO(backend-contract): Confirm login success payload.
 */
export type LoginResponse = {
  user?: AuthUser;
  tokens?: AuthTokens;
  accessToken?: string;
  refreshToken?: string;
  requiresOtp?: boolean;
  message?: string;
};

/**
 * TODO(backend-contract): Confirm OTP verify payload (email + code vs challengeId).
 */
export type VerifyOtpRequest = {
  email: string;
  code: string;
};

/**
 * TODO(backend-contract): Confirm whether verify-otp authenticates the session.
 */
export type VerifyOtpResponse = {
  user?: AuthUser;
  tokens?: AuthTokens;
  accessToken?: string;
  refreshToken?: string;
  message?: string;
};

export type ResendOtpRequest = {
  email: string;
};

export type ResendOtpResponse = {
  message?: string;
};

/**
 * TODO(backend-contract): Confirm refresh request/response field names.
 */
export type RefreshRequest = {
  refreshToken: string;
};

export type RefreshResponse = {
  tokens?: AuthTokens;
  accessToken?: string;
  refreshToken?: string;
};

export type LogoutRequest = {
  refreshToken?: string;
};

export type LogoutResponse = {
  message?: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ForgotPasswordResponse = {
  message?: string;
};

/**
 * TODO(backend-contract): Confirm reset fields (token vs code + email).
 */
export type ResetPasswordRequest = {
  email?: string;
  token?: string;
  code?: string;
  password: string;
};

export type ResetPasswordResponse = {
  message?: string;
};

/**
 * TODO(backend-contract): Confirm profile model.
 */
export type Profile = {
  id: string;
  name: string;
  avatarUrl?: string | null;
  isKids?: boolean;
  [key: string]: unknown;
};

export type ListProfilesResponse = {
  profiles?: Profile[];
  data?: Profile[];
};

export type SelectProfileRequest = {
  profileId: string;
};

export type SelectProfileResponse = {
  profile?: Profile;
  message?: string;
};
