import axios from "axios";

import { env } from "../config/env";
import { attachAuthInterceptor } from "./interceptors/auth.interceptor";
import { session } from "../auth/session";

/**
 * Central Axios instance.
 * baseURL comes from Expo env / Constants — never hardcode hosts in features.
 */
export const apiClient = axios.create({
  baseURL: env.apiBaseUrl || undefined,
  timeout: 20000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // TODO(backend-contract): Enable withCredentials if the API uses cookie sessions.
  withCredentials: false,
});

session.setApiBaseUrl(env.apiBaseUrl);
attachAuthInterceptor(apiClient);

export function setApiBaseUrl(baseURL: string): void {
  apiClient.defaults.baseURL = baseURL || undefined;
  session.setApiBaseUrl(baseURL);
}
