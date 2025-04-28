import { z } from 'zod';

export const logSchema = z.object({
  userId: z.number(),
  type: z.string(),
  eventId: z.number().nullable().optional(),
  toyId: z.number().nullable().optional(),
});

export type LogT = z.infer<typeof logSchema>;
