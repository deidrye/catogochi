import { z } from 'zod';
import { userPointsSchema } from './userSchema';

export type UserPointsT = z.infer<typeof userPointsSchema>;

export type UserSliceT = {
  points: UserPointsT;
  isLoading: boolean;
  error: string | null;
};
