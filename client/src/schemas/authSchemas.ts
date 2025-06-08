import { z } from "zod";

export const userRegisterSchema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string().min(1, "Name is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  organizationCode: z.string().min(1, "Organization code is required"),
});

export const adminRegisterSchema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string().min(1, "Name is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  organizationName: z.string().min(1, "Organization name is required"),
  organizationDescription: z
    .string()
    .min(1, "Organization description is required"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string(),
});

export type UserRegisterPayload = z.infer<typeof userRegisterSchema>;
export type AdminRegisterPayload = z.infer<typeof adminRegisterSchema>;
export type LoginSchemaPayload = z.infer<typeof loginSchema>;
