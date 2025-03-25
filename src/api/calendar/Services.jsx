import { axiosAdmin } from 'src/utils/axios';

import {
  B_editEvent,
  B_createEvent,
  B_deleteEvent,
  B_getSingleCar,
  B_getAllEvents,
} from 'src/paths/ShowMeTheWayBackend';

export const createEvent = async (data) => {
  console.log(data);
  try {
    const res = await axiosAdmin.post(B_createEvent, data);
    return res.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const getEvent = async () => {
  try {
    const response = await axiosAdmin.get(B_getAllEvents);
    return response.data.event;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const getCarsById = async (id) => {
  try {
    const m = id.queryKey[1];
    if (m) {
      const response = await axiosAdmin.get(`${B_getSingleCar}${m}`);
      return response.data.cars;
    }
    return null;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const editEventById = async (data) => {
  console.log(data);
  try {
    const response = await axiosAdmin.put(`${B_editEvent}${data.id}`, {
      title: data.title,
      startDate: data.startDate,
      endDate: data.endDate,
    });
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const deleteEvent = async (data) => {
  console.log(data);
  try {
    const response = await axiosAdmin.delete(`${B_deleteEvent}${data}`);
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};
