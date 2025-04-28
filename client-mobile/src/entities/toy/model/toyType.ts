import { z } from 'zod';
import { OwnedToySchema, ToyCreateSchema, ToyEventCreateSchema, ToyEventSchema, toySchema } from './toyScheme';

export type ToyType = z.infer<typeof toySchema>;
export type ToyCreateType = z.infer<typeof ToyCreateSchema>;

export type ToyEventType = z.infer<typeof ToyEventSchema>;
export type ToyEventCreateType = z.infer<typeof ToyEventCreateSchema>;

export type ToyEventWithToy = {
  event: ToyEventType;
  toy: ToyType;
};

export type OwnedToyType = z.infer<typeof OwnedToySchema>;

export type ToySliceType = {
  shopToys: ToyType[];
  ownedToys: OwnedToyType[];
  currentToy: ToyType | null;
  isLoading: boolean;
  error: string | null;
};


