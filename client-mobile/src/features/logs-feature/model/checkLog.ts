import { LogT } from '../schema/logSchema';
import axiosInstance from '../../../shared/api/axiosInstance';
import { AchieveT } from '@/entities/achievements/model/types';
import { achieveSchema } from '@/entities/achievements/model/schema';

export const setLogsAndGetAchieves = async (
  { userId, type, eventId = null, toyId = null }: LogT,
  callback: (achieve: AchieveT) => void,
) => {
  const response = await axiosInstance.post('/logs', { userId, type, eventId, toyId });
  const achieves = achieveSchema.array().parse(response.data);
  if (achieves.length > 0) {
    achieves.forEach((achieve) => callback(achieve));
  }
};
