import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import { auth, session } from "../../auth";





/**
 * Backend has no refresh-token endpoint yet.
 * On 401: clear session once and reject. Do not loop.
 */
export function attachAuthInterceptor(
client)
{
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
    async (error) => {
      const original = error.config;
      const status = error.response?.status;

      if (
      status === 401 &&
      original &&
      !original._retry &&
      session.getAccessToken())
      {
        original._retry = true;
        await auth.signOut();
      }

      return Promise.reject(error);
    }
  );
}