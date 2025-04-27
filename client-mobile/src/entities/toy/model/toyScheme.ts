import { z } from 'zod';

export const toySchema = z.object({
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
});

export const ToyCreateSchema = toySchema.omit({
  id: true,
});

export const ToyEventSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  effect: z.object({
    hp: z.number().optional(),
    energy: z.number().optional(),
    affection: z.number().optional(),
    boldness: z.number().optional(),
    angry: z.number().optional(),
  }),
  catId: z.number(),
  toyId: z.number(),
});


export const ToyEventCreateSchema = ToyEventSchema.omit({
  id: true,
});

export const ToyEventWithToySchema = z.object({
  event: ToyEventSchema,
  toy: toySchema,
});