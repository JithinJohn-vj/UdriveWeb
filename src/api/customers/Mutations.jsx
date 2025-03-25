import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useRouter } from 'src/routes/hooks';

import { toCustomerList } from 'src/paths/ShowMeTheWayFrontend';

import {
  createCustomer,
  deleteCustomer,
  editCustomerById,
  deleteMultipleCustomers,
} from './Services';

/* Customers */

export function useCreateCustomers() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createCustomer(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
        toast.error(error.message);
      } else {
        toast.success('Customer Created successfully');
        router.push(toCustomerList);
        await queryClient.invalidateQueries({ queryKey: ['getCustomers'] });
      }
    },
  });
}

export function useCreateCustomersOnBookingTime() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createCustomer(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
        toast.error(error.message);
      } else {
        toast.success('Customer Created successfully');
        // router.push(toCustomerList);
        await queryClient.invalidateQueries({ queryKey: ['getCustomers'] });
      }
    },
  });
}

export function useEditCustomers() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => editCustomerById(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Customer Updated successfully');
        router.push(toCustomerList);
        await queryClient.invalidateQueries({ queryKey: ['getCustomers'] });
      }
    },
  });
}

export function useDeleteCustomers() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => deleteCustomer(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Customer Deleted successfully');
        await queryClient.invalidateQueries({ queryKey: ['getCustomers'] });
      }
    },
  });
}

export function useDeleteMultipleCustomers() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => deleteMultipleCustomers(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Customers Deleted successfully');
        await queryClient.invalidateQueries({ queryKey: ['getCustomers'] });
      }
    },
  });
}
