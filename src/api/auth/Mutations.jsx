import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useRouter } from 'src/routes/hooks';

import { toLogin, toDashboard } from 'src/paths/ShowMeTheWayFrontend';

import { logoutUser, loginEmployees } from './Services';

/* Customers */

export function useLoginEmployees() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => loginEmployees(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
        toast.error(error.message);
      } else {
        toast.success('Welcome to U drive');
        router.push(toDashboard);
        await queryClient.invalidateQueries({ queryKey: ['getEmployees'] });
      }
    },
  });
}

export function useLogoutEmployees() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => logoutUser(),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
        toast.error(error.message);
      } else {
        toast.success('Logout success');
        router.push(toLogin);
        await queryClient.invalidateQueries({ queryKey: ['getEmployees'] });
      }
    },
  });
}
