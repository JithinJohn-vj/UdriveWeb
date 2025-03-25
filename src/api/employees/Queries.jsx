import { useQuery } from '@tanstack/react-query';

import { getEmployees, getEmployeeById, getEmployeeRevenueById } from './Services';

export function useGetEmployees() {
  return useQuery({
    queryKey: ['getEmployees'],
    queryFn: () => getEmployees(),
  });
}
export function useGetEmployeeById(id) {
  return useQuery({
    queryKey: ['getEmployees', id],
    // eslint-disable-next-line
    queryFn: (id) => getEmployeeById(id),
  });
}

export function useGetEmployeeRevenueById(id) {
  return useQuery({
    queryKey: ['getEmployees', id],
    // eslint-disable-next-line
    queryFn: (id) => getEmployeeRevenueById(id),
  });
}
