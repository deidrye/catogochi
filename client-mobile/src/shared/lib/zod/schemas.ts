import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const registerSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
});

export const userSchema = z.object({
  user: z.object({
    id: z.number(),
    email: z.string(),
    name: z.string(),
    points: z.number(),
  }),
  accessToken: z.string(),
});

export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type User = z.infer<typeof userSchema>;
