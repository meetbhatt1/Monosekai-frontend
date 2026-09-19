/**
 * Backend envelope: `{ success, message, data }`.
 */






export function unwrapData(payload) {
  if (payload?.data === undefined || payload.data === null) {
    throw new Error(payload?.message || "Empty API response");
  }
  return payload.data;
}

export function unwrapDataOrUndefined(payload) {
  return payload?.data;
}