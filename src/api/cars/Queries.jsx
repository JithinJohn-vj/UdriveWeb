import { useQuery } from '@tanstack/react-query';

import {
  getCars,
  getCarsById,
  getCarsOnRun,
  getCarsOnYard,
  getTopBookedCars,
  getCarActivities,
  getCarsServiceDue,
  getCarsRevenueById,
  getCarsInsuranceDue,
  getCarsServiceOverDue,
  getCarsInsuranceOverDue,
  getCarsPollutionOverDue,
  getAvailableCarsForCalender,
  getCarsPollutionNotifications,
} from './Services';

export function useGetCars() {
  return useQuery({
    queryKey: ['getCars'],
    queryFn: () => getCars(),
  });
}

export function useGetTopBookedCars() {
  return useQuery({
    queryKey: ['gettopCars'],
    queryFn: () => getTopBookedCars(),
  });
}

export function useGetPollutionNotifications() {
  return useQuery({
    queryKey: ['getCarsPollutionNotifications'],
    queryFn: () => getCarsPollutionNotifications(),
    refetchInterval: 600000, // 10 minutes in milliseconds
    refetchIntervalInBackground: true,
  });
}

export function useGetCarssById(id) {
  return useQuery({
    queryKey: ['getCarsByid', id],
    // queryKey: ['getCarsByID'],

    // eslint-disable-next-line
    queryFn: (id) => getCarsById(id),
  });
}

export function useGetAvailableCarsForCalender(id) {
  return useQuery({
    queryKey: ['getAvailableCarsForCalender', id],
    // queryKey: ['getCarsByID'],

    // eslint-disable-next-line
    queryFn: (id) => getAvailableCarsForCalender(id),
  });
}

export function useGetCarActivities(id) {
  return useQuery({
    queryKey: ['getCarActivities', id],
    // queryKey: ['getCarsByID'],

    // eslint-disable-next-line
    queryFn: (id) => getCarActivities(id),
  });
}

export function useGetCarsRevenueById(id) {
  return useQuery({
    queryKey: ['getCarwd', id],
    // eslint-disable-next-line
    queryFn: (id) => getCarsRevenueById(id),
  });
}
export function useGetCarsOnYard() {
  return useQuery({
    queryKey: ['getCarsOnYard'],
    queryFn: () => getCarsOnYard(),
  });
}

export function useGetCarsOnRun() {
  return useQuery({
    queryKey: ['getCarsOnRun'],
    queryFn: () => getCarsOnRun(),
  });
}

export function useGetCarsServiceDue() {
  return useQuery({
    queryKey: ['getCarsServiceDue'],
    queryFn: () => getCarsServiceDue(),
    refetchInterval: 600000, // 10 minutes in milliseconds
    refetchIntervalInBackground: true,
  });
}

export function useGetCarsInsuranceDue() {
  return useQuery({
    queryKey: ['getCarsInsuranceDue'],
    queryFn: () => getCarsInsuranceDue(),
    refetchInterval: 600000, // 10 minutes in milliseconds
    refetchIntervalInBackground: true,
  });
}

export function useGetCarsInsuranceOverDue() {
  return useQuery({
    queryKey: ['getCarsInsuranceOverDue'],
    queryFn: () => getCarsInsuranceOverDue(),
  });
}

export function useGetCarsServiceOverDue() {
  return useQuery({
    queryKey: ['getCarsServiceOverDue'],
    queryFn: () => getCarsServiceOverDue(),
  });
}

export function useGetCarsPollutionOverDue() {
  return useQuery({
    queryKey: ['getCarsPollutionOverDue'],
    queryFn: () => getCarsPollutionOverDue(),
  });
}
