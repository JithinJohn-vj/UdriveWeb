import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useRouter } from 'src/routes/hooks';

import { toBookingList } from 'src/paths/ShowMeTheWayFrontend';

import {
  bookingStatus,
  createBooking,
  deleteBooking,
  MarkAllAsSeen,
  checkBookedCar,
  editBookingById,
  addCarsKilometers,
  deleteMultipleBookings,
  addBookingInvoiceAfterAdvance,
} from './Services';

/* Customers */

export function useCreateBooking() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createBooking(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
        toast.error(error.message);
      } else {
        toast.success('Booking Created successfully');
        router.push(toBookingList);
        await queryClient.invalidateQueries({ queryKey: ['getAllBookings'] });
      }
    },
  });
}

export function useAddBookingInvoiceAfterAdvance() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data) => addBookingInvoiceAfterAdvance(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        toast.error(error.message);
      } else {
        router.push(toBookingList);

        toast.success('Invoice created sucessfully');
        await queryClient.invalidateQueries({ queryKey: ['getAllBookings'] });
      }
    },
  });
}

export function useDeleteMultipleBookings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => deleteMultipleBookings(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Bookings Deleted successfully');
        await queryClient.invalidateQueries({ queryKey: ['getAllBookings'] });
      }
    },
  });
}

export function useCheckBookedData() {
 
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => checkBookedCar(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
        toast.error(error.message);
      } else {
        // toast.success('Car available for booking');
        // router.push(toBookingList);
        await queryClient.invalidateQueries({ queryKey: ['getAllBookings'] });
      }
    },
  });
}
export function useEditBooking() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => editBookingById(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Booking Updated successfully');
        router.push(toBookingList);
        await queryClient.invalidateQueries({ queryKey: ['getAllBookings'] });
      }
    },
  });
}

export function useAddCarKilometers() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => addCarsKilometers(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Kilometers Updated successfully');
        await queryClient.invalidateQueries({ queryKey: ['getAllBookings'] });
      }
    },
  });
}



export function useDeleteBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => deleteBooking(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Booking Deleted successfully');
        await queryClient.invalidateQueries({ queryKey: ['getAllBookings'] });
      }
    },
  });
}



export function useChangeBookingStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => bookingStatus(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Bookings status updated');
        await queryClient.invalidateQueries({ queryKey: ['getAllBookings'] });
      }
    },
  });
}

export function useMarkAllAsSeen() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => MarkAllAsSeen(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Marked as seen');
        await queryClient.invalidateQueries({ queryKey: ['bookingMadeNoti'] });
      }
    },
  });
}
