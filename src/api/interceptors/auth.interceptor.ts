import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import { endpoints } from "../endpoints";
import type { RefreshResponse } from "../types";
import { session } from "../../auth/session";
import { authStore } from "../../auth/auth.store";

type RetriableConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let refreshPromise: Promise<string | null> | null = null;

/**
 * Bare client for token refresh — avoids recursive interceptor loops.
 */
const refreshClient = axios.create({
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

function getBaseURL(configBaseURL?: string): string {
  if (typeof configBaseURL === "string" && configBaseURL.length > 0) {
    return configBaseURL;
  }
  return session.getApiBaseUrl();
}

function shouldSkipAuthRefresh(config: RetriableConfig): boolean {
  const header = config.headers?.["X-Skip-Auth-Refresh"];
  return header === "1" || header === 1 || header === true;
}

async function refreshAccessToken(baseURL: string): Promise<string | null> {
  const refreshToken = session.getRefreshToken();
  if (!refreshToken) {
    return null;
  }

  try {
    const { data } = await refreshClient.post<RefreshResponse>(
      endpoints.auth.refresh,
      { refreshToken },
      { baseURL }
    );

    const accessToken = data.tokens?.accessToken ?? data.accessToken ?? null;
    const nextRefresh =
      data.tokens?.refreshToken ?? data.refreshToken ?? refreshToken;

    if (!accessToken) {
      return null;
    }

    await session.setTokens({
      accessToken,
      refreshToken: nextRefresh,
    });

    return accessToken;
  } catch {
    await session.clear();
    authStore.setUnauthenticated();
    return null;
  }
}

function refreshAccessTokenOnce(baseURL: string): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken(baseURL).finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

export function attachAuthInterceptor(
  client: ReturnType<typeof axios.create>
): void {
  client.interceptors.request.use((config) => {
    const token = session.getAccessToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const original = error.config as RetriableConfig | undefined;

      if (!original) {
        return Promise.reject(error);
      }

      const status = error.response?.status;
      const isUnauthorized = status === 401;
      const alreadyRetried = original._retry === true;
      const skipRefresh = shouldSkipAuthRefresh(original);
      const isRefreshCall = original.url?.includes(endpoints.auth.refresh);

      if (!isUnauthorized || alreadyRetried || skipRefresh || isRefreshCall) {
        return Promise.reject(error);
      }

      original._retry = true;

      const nextAccessToken = await refreshAccessTokenOnce(
        getBaseURL(
          typeof original.baseURL === "string" ? original.baseURL : undefined
        )
      );

      if (!nextAccessToken) {
        return Promise.reject(error);
      }

      original.headers = original.headers ?? {};
      original.headers.Authorization = `Bearer ${nextAccessToken}`;

      return client.request(original);
    }
  );
}
