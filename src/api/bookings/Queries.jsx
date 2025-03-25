import { useQuery } from '@tanstack/react-query';

import {
  geBookingById,
  getAllBookings,
  getTotalRevenue,
  getMonthlyRevenue,
  getUpcomingBookings,
  bookingInvoiceDue2d,
  bookingMadeNotifications,
  bookingUnUpdatedKilometer,
  bookingInvoiceNotGenerated,
} from './Services';

export function useGetAllBookings() {
  return useQuery({
    queryKey: ['getAllBookings'],
    queryFn: () => getAllBookings(),
  });
}
export function useGetBookingsById(id) {
  return useQuery({
    queryKey: ['getAllBookings', id],
    // eslint-disable-next-line
    queryFn: (id) => geBookingById(id),
  });
}

export function useGetTotalRevenue() {
  return useQuery({
    queryKey: ['getTotalRevenue'],
    queryFn: () => getTotalRevenue(),
  });
}

export function useGetMonthlyRevenue() {
  return useQuery({
    queryKey: ['getMonthlyRevenue'],
    queryFn: () => getMonthlyRevenue(),
  });
}

export function useGetUpcomingBookings() {
  return useQuery({
    queryKey: ['getUpcomingBookings'],
    queryFn: () => getUpcomingBookings(),
  });
}

export function useGetBookingInvoiceNotGenerated() {
  return useQuery({
    queryKey: ['bookingInvoiceNotGenerated'],
    queryFn: () => bookingInvoiceNotGenerated(),
  });
}

export function useGetBookingInvoice2d() {
  return useQuery({
    queryKey: ['bookingInvoiceDue2d'],
    queryFn: () => bookingInvoiceDue2d(),
  });
}

export function useGetUnupdatedKms() {
  return useQuery({
    queryKey: ['bookingUnUpdatedKilometer'],
    queryFn: () => bookingUnUpdatedKilometer(),
  });
}
export function useGetBoookingsMadeNotify() {
  return useQuery({
    queryKey: ['bookingMadeNoti'],
    queryFn: () => bookingMadeNotifications(),
  });
}
