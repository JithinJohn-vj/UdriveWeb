/* eslint-disable */

import { axiosAdmin } from 'src/utils/axios';

import {
  B_editBooking,
  B_createBooking,
  B_deleteBooking,
  B_bookingStatus,
  B_getAllBookings,
  B_getTotalRevenue,
  B_getSingleBooking,
  B_upcomingBookings,
  B_getMonthlyRevenue,
  B_carsAddKilometers,
  B_bookingMultipleDelete,
  B_bookingUnUpdatedKilometer,
  B_getAllNotifications,
  B_markAsSeen,
  B_bookingInvoiceNotGeneratedAll,
  B_bookingInvoiceAfterAdvance,
  B_bookingInvoiceDue,
} from 'src/paths/ShowMeTheWayBackend';

export const createBooking = async (data) => {
  console.log(data);
  try {
    await axiosAdmin.post(B_createBooking, data);
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const checkBookedCar = async (data) => {
  console.log(data);
  try {
    await axiosAdmin.post("booking/is-car-booked", data);
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};


export const getAllBookings = async () => {
  try {
    const response = await axiosAdmin.get(B_getAllBookings);
    return response.data.bookings;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const getMonthlyRevenue = async () => {
  try {
    const response = await axiosAdmin.get(B_getMonthlyRevenue);
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const getTotalRevenue = async () => {
  try {
    const response = await axiosAdmin.get(B_getTotalRevenue);
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const deleteBooking = async (data) => {
  console.log(data);
  try {
    const response = await axiosAdmin.delete(`${B_deleteBooking}${data}`);
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const geBookingById = async (id) => {
  try {
    const m = id.queryKey[1];
    if (m) {
      const response = await axiosAdmin.get(`${B_getSingleBooking}${m}`);
      console.log(response.data);
      return response.data.booking;
    }
    return null;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const editBookingById = async (data) => {
  console.log(data);
  try {
    const response = await axiosAdmin.put(`${B_editBooking}${data._id}`, {
      fromDate: data.fromDate,
      totalDuration: data.totalDuration,
      toDate: data.toDate,
      pickupPoint: data.pickupPoint,
      dropPoint: data.dropPoint,
      carSelected: data.carSelected,
      customerSelected: data.customerSelected,
      subTotals: data.subTotals,
      total: data.total,
      minimumKilometer: data.minimumKilometer,
      costAfterMinimumKm: data.costAfterMinimumKm,
      discount: data.discount,
      tax: data.tax,
      pickupCost: data.pickupCost,
      deliveryCost: data.deliveryCost,
      costPerDay: data.costPerDay,
      invoiceDetails: data.invoiceDetails,
      driver: data.driver,
      payment: data.payment,
      advanceAmount: data.advanceAmount,
    });
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const deleteMultipleBookings = async (bookingIds) => {
  try {
    const response = await axiosAdmin.delete(B_bookingMultipleDelete, { data: { bookingIds } });
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const bookingStatus = async (data) => {
  console.log(data);
  try {
    const response = await axiosAdmin.put(`${B_bookingStatus}${data.idb}`, {
      status: data.status,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const getUpcomingBookings = async () => {
  try {
    const response = await axiosAdmin.get(B_upcomingBookings);
    return response.data?.upcomingBookings;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const addCarsKilometers = async (data) => {
  console.log(data);
  try {
    const response = await axiosAdmin.put(`${B_carsAddKilometers}${data._id}`, {
      kilometreCovered: parseInt(data.kilometreCovered),
    });
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const addBookingInvoiceAfterAdvance = async (data) => {
  console.log(data);
  try {
    const response = await axiosAdmin.put(`${B_bookingInvoiceAfterAdvance}${data._id}`, {
      driver: data.driver,
      total: data.total,
      subTotals: data.subTotals,
      discount: data.discount,
      advanceAmount: data.advanceAmount,
      tax: data.tax,
      payment: data.payment,
      invoiceDetails: data.invoiceDetails,
    });
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const bookingUnUpdatedKilometer = async () => {
  try {
    const response = await axiosAdmin.get(B_bookingUnUpdatedKilometer);
    return response.data?.filteredBookings;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const bookingMadeNotifications = async () => {
  try {
    const response = await axiosAdmin.get(B_getAllNotifications);
    console.log(response);
    return response.data?.notifications;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const MarkAllAsSeen = async () => {
  try {
    const response = await axiosAdmin.put(B_markAsSeen);
    console.log(response);
    return response.data?.notifications;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const bookingInvoiceNotGenerated = async () => {
  try {
    const response = await axiosAdmin.get(B_bookingInvoiceNotGeneratedAll);
    console.log(response);
    return response.data?.bookings;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const bookingInvoiceDue2d = async () => {
  try {
    const response = await axiosAdmin.get(B_bookingInvoiceDue);
    console.log(response);
    return response.data?.bookings;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};
