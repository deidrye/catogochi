import { z } from 'zod';
import { logSchema, resLogSchema } from './schema';

export type LogT = z.infer<typeof logSchema>;
export type resLogT = z.infer<typeof resLogSchema>;

export type LogSliceT = {
  list: resLogT[];
  showModal: boolean;
};
