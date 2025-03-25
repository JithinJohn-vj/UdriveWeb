import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useRouter } from 'src/routes/hooks';

import { toLogin, toEmployeeList } from 'src/paths/ShowMeTheWayFrontend';

import {
  blockEmployee,
  deleteEmployee,
  forgotPassword,
  updatePassword,
  createEmployees,
  editEmployeeById,
  enterNewPassword,
  deleteEmployeeMultiple,
} from './Services';

/* Employees */

export function useCreateEmployees() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createEmployees(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
        toast.error(error.message);
      } else {
        toast.success('Employee Created successfully');
        router.push(toEmployeeList);
        await queryClient.invalidateQueries({ queryKey: ['getEmployees'] });
      }
    },
  });
}
export function useForgotPassword() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => forgotPassword(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
        toast.error(error.message);
      } else {
        toast.success('Mail sent successfully');
        // router.push(toEmployeeList);
        await queryClient.invalidateQueries({ queryKey: ['getEmployees'] });
      }
    },
  });
}

export function useEnterNewPassword() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => enterNewPassword(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
        toast.error(error.message);
      } else {
        toast.success('password reset successfully');
        router.push(toLogin);
        await queryClient.invalidateQueries({ queryKey: ['getEmployees'] });
      }
    },
  });
}

export function useUpdatePassword() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updatePassword(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
        toast.error(error.message);
      } else {
        toast.success('password Updated successfully');
        // router.push(toLogin);
        await queryClient.invalidateQueries({ queryKey: ['getEmployees'] });
      }
    },
  });
}

export function useEditEmployees() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => editEmployeeById(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Employee Updated successfully');
        router.push(toEmployeeList);
        await queryClient.invalidateQueries({ queryKey: ['getEmployees'] });
      }
    },
  });
}

export function useBlockEmployees() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => blockEmployee(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        toast.error(error.message);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['getEmployees'] });
      }
    },
  });
}

export function useDeleteEmployees() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => deleteEmployee(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Employee Deleted successfully');
        await queryClient.invalidateQueries({ queryKey: ['getEmployees'] });
      }
    },
  });
}

export function useDeleteMultipleEmployees() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => deleteEmployeeMultiple(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Employees Deleted successfully');
        await queryClient.invalidateQueries({ queryKey: ['getEmployees'] });
      }
    },
  });
}
