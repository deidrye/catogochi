import axiosInstance from '../../../shared/api/axiosInstance';
import { AchieveT } from '@/entities/achievements/model/types';
import { achieveSchema } from '@/entities/achievements/model/schema';
import { LogT } from '@/entities/log/model/types';
const responseAchieveSchema = achieveSchema.optional();

export const setLogsAndGetAchieves = async (
  { userId, type, eventId = null, toyId = null, achievementId = null, nowPoints }: LogT,
  callbackAchieve: (achieve: AchieveT) => void,
  callbackPoints: (points: AchieveT['reward']) => void,
) => {
  const response = await axiosInstance.post('/logs', {
    userId,
    type,
    eventId,
    toyId,
    achievementId,
  });
  console.log('step1', response.data);

  const achieves = responseAchieveSchema.array().parse(response.data);
  if (achieves.length > 0) {
    achieves.forEach((achieve) => {
      callbackAchieve(achieve!);
    });
    const sumPoints = achieves.reduce((acc, achieve) => acc + achieve!.reward, 0);
    console.log('step2');

    const pointsResponse = await axiosInstance.put(`/users/${userId}`, {
      points: nowPoints + sumPoints,
    });
    if (pointsResponse.status === 200) {
      callbackPoints(sumPoints);
    }
  }
};
