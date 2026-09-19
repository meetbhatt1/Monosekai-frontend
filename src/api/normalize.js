

function asRecord(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value;
  }
  return null;
}

export function asId(value) {
  if (typeof value === "string" && value.trim()) return value;
  if (value && typeof value === "object") {
    const record = value;
    if (typeof record.toString === "function") {
      const text = record.toString();
      if (text && text !== "[object Object]") return text;
    }
  }
  return "";
}

export function normalizeUser(raw, fallbackEmail) {
  const record = asRecord(raw);
  if (!record) {
    return fallbackEmail ? { id: "unknown", email: fallbackEmail } : null;
  }

  const id = asId(record.id ?? record._id);
  const email =
  typeof record.email === "string" ? record.email : fallbackEmail ?? "";

  if (!id || !email) return null;

  const username =
  typeof record.username === "string" ? record.username : null;

  return {
    id,
    email,
    displayName: username ?? (typeof record.displayName === "string" ? record.displayName : null),
    emailVerified: typeof record.emailVerified === "boolean" ? record.emailVerified : undefined
  };
}

export function normalizeProfile(raw) {
  const record = asRecord(raw);
  if (!record) return null;

  const id = asId(record.id ?? record._id);
  if (!id) return null;

  const name = typeof record.name === "string" && record.name.trim() ? record.name : "Profile";

  return {
    ...record,
    id,
    name,
    avatarUrl:
    typeof record.avatar === "string" && record.avatar ||
    typeof record.avatarUrl === "string" && record.avatarUrl ||
    null,
    isKids: Boolean(record.isKidsProfile ?? record.isKids)
  };
}

export function normalizeProfiles(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.
  map((item) => normalizeProfile(item)).
  filter((item) => item !== null);
}