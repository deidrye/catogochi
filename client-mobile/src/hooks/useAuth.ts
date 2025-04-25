import { useAppSelector } from '@/app/store';

export const useAuth = () => {
  const user = useAppSelector((state) => state.auth.user);
  return { user };
};
