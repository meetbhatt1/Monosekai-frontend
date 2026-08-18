import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    email: z.string().trim().email("Enter a valid email").optional().or(z.literal("")),
    token: z.string().optional(),
    code: z.string().optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((values) => Boolean(values.token || values.code), {
    message: "Reset token or code is required",
    path: ["token"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
