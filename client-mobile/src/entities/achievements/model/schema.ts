import { z } from 'zod';

export const achieveSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  reward: z.number(),
  created_at: z.string(),
});

export const newAchieveSchema = z.object({
  name: z.string(),
  description: z.string(),
  reward: z.number(),
});

