import { z } from 'zod';
import { ToyCreateSchema, ToyEventCreateSchema, ToyEventSchema, toySchema } from './toyScheme';

export type ToyType = z.infer<typeof toySchema>;
export type ToyCreateType = z.infer<typeof ToyCreateSchema>;

export type ToySliceType = {
  shopToys: ToyType[];
  ownedToys: ToyEventCreateType[];
  currentToy: ToyType | null;
  isLoading: boolean;
  error: string | null;
};

export type ToyEventType = z.infer<typeof ToyEventSchema>;
export type ToyEventCreateType = z.infer<typeof ToyEventCreateSchema>;
