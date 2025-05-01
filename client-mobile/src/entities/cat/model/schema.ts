import { z } from 'zod';

export const catPresetSchema = z.object({
  id: z.number(),
  name: z.string(),
  imgMain: z.string(),
  imgSleep: z.string(),
  imgPlay: z.string(),
  imgEat: z.string(),
  imgWeasel: z.string(),
  imgCreate: z.string(),
});

export const catSchema = z.object({
  id: z.number(),
  name: z.string(),
  userId: z.number(),
  catPresetId: z.number(),
  angry: z.number(),
  hp: z.number(),
  energy: z.number(),
  affection: z.number(),
  boldness: z.number(),
  level: z.number(),
  CatPreset: catPresetSchema,
});

export const createCatSchema = z.object({
  name: z.string(),
  catPresetId: z.number(),
  userId: z.number(),
});

export const catActionSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  effect: z.object({
    hp: z.number().optional(),
    energy: z.number().optional(),
    affection: z.number().optional(),
    boldness: z.number().optional(),
    angry: z.number().optional(),
  }),
});

export const catSliceSchema = z.object({
  presets: z.array(catPresetSchema),
  selectedPresetIndex: z.number(),
  isLoading: z.boolean(),
  error: z.string().nullable(),
  cat: catSchema.nullable(),
  isCatOnline: z.boolean(),
  actions: z.array(catActionSchema),
});
