import { axiosAdmin } from 'src/utils/axios';

import {
  B_editCustomer,
  B_createCustomer,
  B_deleteCustomer,
  B_getAllCustomers,
  B_customerRevenue,
  B_getSingleCustomer,
  B_customerMultipleDelete,
} from 'src/paths/ShowMeTheWayBackend';

export const createCustomer = async (data) => {
  console.log(data);
  try {
    const response = await axiosAdmin.post(B_createCustomer, data);
    console.log(response);
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const getCustomers = async () => {
  try {
    const response = await axiosAdmin.get(B_getAllCustomers);
    return response.data.customers;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const getCustomersById = async (id) => {
  try {
    const m = id.queryKey[1];
    if (m) {
      const response = await axiosAdmin.get(`${B_getSingleCustomer}${m}`);
      return response.data.customer;
    }
    return null;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const editCustomerById = async (data) => {
  console.log(data);
  try {
    const response = await axiosAdmin.put(`${B_editCustomer}${data._id}`, {
      name: data.name,
      email: data.email,
      passportNumber: data.passportNumber,
      pincode: data.pincode,
      state: data.state,
      address: data.address,
      locality: data.locality,
      cityOrDistrict: data.cityOrDistrict,
      contactNumber: data.contactNumber,
      abroadNumber: data.abroadNumber,
      nativeNumber: data.nativeNumber,
      customerImage: data.customerImage,
      passportImage: data.passportImage,
    });
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const deleteCustomer = async (data) => {
  console.log(data);
  try {
    const response = await axiosAdmin.delete(`${B_deleteCustomer}${data}`);
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const deleteMultipleCustomers = async (customerIds) => {
  try {
    const response = await axiosAdmin.delete(B_customerMultipleDelete, { data: { customerIds } });
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const getCustomerRevenueById = async (id) => {
  try {
    const m = id.queryKey[1];
    console.log(m);
    if (m) {
      const response = await axiosAdmin.get(`${B_customerRevenue}${m}`);
      console.log(response.data.totalRevenue);
      return response.data?.totalRevenue;
    }
    return null;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};
