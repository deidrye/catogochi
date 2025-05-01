import { z } from 'zod';
import { achieveSchema, newAchieveSchema } from './schema';

export type AchieveT = z.infer<typeof achieveSchema>;

export type NewAchieveT = z.infer<typeof newAchieveSchema>;

export type AchieveSliceT = {
  list: AchieveT[];
  userAchieves: AchieveT[];
  showAchieveToggle: boolean;
};
