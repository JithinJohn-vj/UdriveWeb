import { useQuery } from '@tanstack/react-query';

import { getCustomers, getCustomersById, getCustomerRevenueById } from './Services';

export function useGetCustomers() {
  return useQuery({
    queryKey: ['getCustomers'],
    queryFn: () => getCustomers(),
  });
}
export function useGetCustomersById(id) {
  return useQuery({
    queryKey: ['getCustomers', id],
    // eslint-disable-next-line
    queryFn: (id) => getCustomersById(id),
  });
}

export function useGetCustomerevenueById(id) {
  return useQuery({
    queryKey: ['getCustomers', id],
    // eslint-disable-next-line
    queryFn: (id) => getCustomerRevenueById(id),
  });
}
