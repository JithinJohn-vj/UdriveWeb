import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createEvent, deleteEvent, editEventById } from './Services';
/* Customers */

export function useCreateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createEvent(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
        toast.error(error.message);
      } else {
        toast.success('Event Created successfully');
        await queryClient.invalidateQueries({ queryKey: ['getEvent'] });
      }
    },
  });
}

export function useEditEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => editEventById(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Event Updated successfully');
        await queryClient.invalidateQueries({ queryKey: ['getCars'] });
      }
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => deleteEvent(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Event Deleted successfully');
        await queryClient.invalidateQueries({ queryKey: ['getCars'] });
      }
    },
  });
}
