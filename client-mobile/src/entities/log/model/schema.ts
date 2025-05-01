import { z } from 'zod';

export const logSchema = z.object({
  userId: z.number(),
  type: z.string(),
  eventId: z.number().nullable().optional(),
  toyId: z.number().nullable().optional(),
  achievementId: z.number().nullable().optional(),
  nowPoints: z.number(),
});

export const resLogSchema = z.object({
  userId: z.number(),
  type: z.string(),
  eventId: z.number().nullable().optional(),
  toyId: z.number().nullable().optional(),
  achievementId: z.number().nullable().optional(),
  createdAt: z.string(),
  Toy: z
    .object({
      id: z.number(),
      name: z.string(),
      price: z.number(),
      effect: z.object({
        hp: z.number().optional(),
        energy: z.number().optional(),
        affection: z.number().optional(),
        boldness: z.number().optional(),
        angry: z.number().optional(),
      }),
      img: z.string(),
    })
    .nullable()
    .optional(),
});
