/**
 * API path constants.
 * Host comes from env / Axios client baseURL (`.../api`).
 */
export const endpoints = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    forgotPassword: "/auth/forgot-password",
    selectProfile: (profileId) =>
    `/auth/profiles/${encodeURIComponent(profileId)}/select`
  },
  profiles: {
    list: "/profile"
  },
  catalog: {
    anime: "/catalog/anime",
    animeById: (animeId) => `/catalog/anime/${encodeURIComponent(animeId)}`,
    movies: "/catalog/movies"
  }
};