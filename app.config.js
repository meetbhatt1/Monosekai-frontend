/**
 * Dynamic Expo config.
 * Reads EXPO_PUBLIC_API_BASE_URL so the API base URL is never hardcoded in app code.
 */
module.exports = ({ config }) => ({
  ...config,
  scheme: config.scheme ?? "monosekai",
  web: {
    ...(config.web ?? {}),
    bundler: "metro",
  },
  extra: {
    ...(config.extra ?? {}),
    apiBaseUrl:
      process.env.EXPO_PUBLIC_API_BASE_URL ??
      config.extra?.apiBaseUrl ??
      // Empty = runtime resolves LAN host + :8000/api in src/config/env.js
      "",
  },
});
