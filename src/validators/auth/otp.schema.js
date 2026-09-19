import { z } from "zod";

export const otpSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  code: z.
  string().
  trim().
  regex(/^\d{6}$/, "Enter the 6-digit code")
});