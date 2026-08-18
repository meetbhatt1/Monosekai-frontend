import axios from "axios";

/**
 * Normalized API error for UI consumption.
 * Backend field names are not confirmed — mapper is intentionally flexible.
 *
 * TODO(backend-contract): Align `code`, `message`, and `fieldErrors` mapping
 * with the final API error envelope once confirmed.
 */
export type ApiError = {
  message: string;
  code: string | null;
  status: number | null;
  fieldErrors: Record<string, string>;
  raw?: unknown;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

function pickMessage(data: Record<string, unknown> | null, fallback: string) {
  if (!data) return fallback;

  const candidates = [data.message, data.error, data.detail, data.title];
  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate;
    }
  }

  return fallback;
}

function pickCode(data: Record<string, unknown> | null): string | null {
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
  data: Record<string, unknown> | null
): Record<string, string> {
  if (!data) return {};

  const source =
    asRecord(data.fieldErrors) ??
    asRecord(data.errors) ??
    asRecord(data.fields);

  if (!source) return {};

  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(source)) {
    if (typeof value === "string") {
      result[key] = value;
    } else if (Array.isArray(value) && typeof value[0] === "string") {
      result[key] = value[0];
    }
  }

  return result;
}

export function normalizeApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? null;
    const data = asRecord(error.response?.data);

    return {
      message: pickMessage(data, error.message || "Request failed"),
      code: pickCode(data),
      status,
      fieldErrors: pickFieldErrors(data),
      raw: error.response?.data ?? error,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message || "Something went wrong",
      code: null,
      status: null,
      fieldErrors: {},
      raw: error,
    };
  }

  return {
    message: "Something went wrong",
    code: null,
    status: null,
    fieldErrors: {},
    raw: error,
  };
}

export function getErrorMessage(error: unknown, fallback?: string): string {
  return normalizeApiError(error).message || fallback || "Something went wrong";
}
