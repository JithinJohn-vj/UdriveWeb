import { useQuery } from '@tanstack/react-query';

import { loggedInUser, refreshToken } from './Services';

export function useGetRefreshToken() {
  return useQuery({
    queryKey: ['refreshToken'],
    queryFn: () => refreshToken(),
  });
}

export function useGetLoggedInUser() {
  return useQuery({
    queryKey: ['loggedInUser'],
    queryFn: () => loggedInUser(),
  });
}
