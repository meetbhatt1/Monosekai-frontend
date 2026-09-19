import axios from "axios";

/**
 * Normalized API error for UI consumption.
 * Backend field names are not confirmed — mapper is intentionally flexible.
 *
 * TODO(backend-contract): Align `code`, `message`, and `fieldErrors` mapping
 * with the final API error envelope once confirmed.
 */








function asRecord(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value;
  }
  return null;
}

function pickMessage(data, fallback) {
  if (!data) return fallback;

  const candidates = [data.message, data.error, data.detail, data.title];
  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate;
    }
  }

  return fallback;
}

function pickCode(data) {
  if (!data) return null;

  const candidates = [data.code, data.errorCode, data.error_code];
  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate;
    }
  }

  return null;
}

/**
 * TODO(backend-contract): Confirm validation error shape
 * (e.g. `errors: { email: ["..."] }` vs `fieldErrors` vs Zod-style issues).
 */
function pickFieldErrors(
data)
{
  if (!data) return {};

  const source =
  asRecord(data.fieldErrors) ??
  asRecord(data.errors) ??
  asRecord(data.fields);

  if (!source) return {};

  const result = {};

  for (const [key, value] of Object.entries(source)) {
    if (typeof value === "string") {
      result[key] = value;
    } else if (Array.isArray(value) && typeof value[0] === "string") {
      result[key] = value[0];
    }
  }

  return result;
}

export function normalizeApiError(error) {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? null;
    const data = asRecord(error.response?.data);

    return {
      message: pickMessage(data, error.message || "Request failed"),
      code: pickCode(data),
      status,
      fieldErrors: pickFieldErrors(data),
      raw: error.response?.data ?? error
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message || "Something went wrong",
      code: null,
      status: null,
      fieldErrors: {},
      raw: error
    };
  }

  return {
    message: "Something went wrong",
    code: null,
    status: null,
    fieldErrors: {},
    raw: error
  };
}

export function getErrorMessage(error, fallback) {
  return normalizeApiError(error).message || fallback || "Something went wrong";
}