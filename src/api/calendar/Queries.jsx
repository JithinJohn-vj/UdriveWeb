import { useQuery } from '@tanstack/react-query';

import { getEvent, getCarsById } from './Services';

export function useGetEvents() {
  return useQuery({
    queryKey: ['getEvent'],
    queryFn: () => getEvent(),
  });
}
export function useGetCarssById(id) {
  return useQuery({
    queryKey: ['getEvent', id],
    // eslint-disable-next-line
    queryFn: (id) => getCarsById(id),
  });
}
