import { apiClient } from "../client";
import { endpoints } from "../endpoints";
import { unwrapData } from "../envelope";











function withId(raw) {
  return {
    ...raw,
    id: String(raw.id ?? raw._id ?? ""),
    title: String(raw.title ?? "Untitled")
  };
}

export const catalogService = {
  async listAnime() {
    const { data } = await apiClient.get(
      endpoints.catalog.anime
    );
    const inner = unwrapData(data);
    if (!Array.isArray(inner)) return [];
    return inner.
    filter((item) => Boolean(item) && typeof item === "object").
    map(withId).
    filter((item) => item.id);
  }
};