import { z } from "zod";

const baseAuthSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = baseAuthSchema.extend({
  name: z.string().optional(),
});

export const loginSchema = baseAuthSchema.extend({
  password: z.string(),
});

export type RegisterSchemaPayload = z.infer<typeof registerSchema>;
export type LoginSchemaPayload = z.infer<typeof loginSchema>;
