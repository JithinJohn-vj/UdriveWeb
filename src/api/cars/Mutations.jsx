import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useRouter } from 'src/routes/hooks';

import { toCarsList } from 'src/paths/ShowMeTheWayFrontend';

import {
  createCars,
  deleteCars,
  editCarsById,
  resetServiceKms,
  deleteMultipleCars,
  addCarServiceDetails,
  deleteServiceDetails,
} from './Services';

/* Customers */

export function useCreateCars() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createCars(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
        toast.error(error.message);
      } else {
        toast.success('Car Created successfully');
        router.push(toCarsList);
        await queryClient.invalidateQueries({ queryKey: ['getCars'] });
      }
    },
  });
}

export function useEditCars() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => editCarsById(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Car Updated successfully');
        router.push(toCarsList);
        await queryClient.invalidateQueries({ queryKey: ['getCars'] });
      }
    },
  });
}

export function useAddServiceDetails() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => addCarServiceDetails(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Service Updated successfully');
        await queryClient.invalidateQueries({ queryKey: ['getCarsByid'] });
      }
    },
  });
}

export function useDeleteServiceDetails() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => deleteServiceDetails(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Service deleted successfully');
        await queryClient.invalidateQueries({ queryKey: ['getCarsByid'] });
      }
    },
  });
}

export function useResetServiceKms() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => resetServiceKms(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Car Updated successfully');
        await queryClient.invalidateQueries({ queryKey: ['getCarsServiceOverDue'] });
      }
    },
  });
}

export function useDeleteCars() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => deleteCars(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Car Deleted successfully');
        await queryClient.invalidateQueries({ queryKey: ['getCars'] });
      }
    },
  });
}

export function useDeleteMultipleCars() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => deleteMultipleCars(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Cars Deleted successfully');
        await queryClient.invalidateQueries({ queryKey: ['getCars'] });
      }
    },
  });
}
