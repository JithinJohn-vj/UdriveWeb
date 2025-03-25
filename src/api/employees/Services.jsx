import { axiosAdmin } from 'src/utils/axios';

import UserCredentials from 'src/zustand/UserCredentials';
import {
  B_editEmployee,
  B_blockEmployee,
  B_createEmployee,
  B_deleteEmployee,
  B_forgotPassword,
  B_updatePassword,
  B_employeeRevenue,
  B_enterNewPassword,
  B_getAllEmployeesInfo,
  B_getSingleEmployeeInfo,
  B_employeeMultipleDelete,
} from 'src/paths/ShowMeTheWayBackend';

export const createEmployees = async (data) => {
  console.log(data);
  try {
    await axiosAdmin.post(B_createEmployee, data);
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const getEmployees = async () => {
  try {
    const response = await axiosAdmin.get(B_getAllEmployeesInfo);
    return response.data.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const getEmployeeById = async (id) => {
  try {
    const m = id.queryKey[1];
    if (m) {
      const response = await axiosAdmin.get(`${B_getSingleEmployeeInfo}${m}`);
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const getEmployeeRevenueById = async (id) => {
  try {
    const m = id.queryKey[1];
    console.log(m);
    if (m) {
      const response = await axiosAdmin.get(`${B_employeeRevenue}${m}`);
      console.log(response.data.totalRevenue);
      return response.data?.totalRevenue;
    }
    return null;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const editEmployeeById = async (data) => {
  try {
    const m = UserCredentials.getState();
    const existingUser = m.user?.user?._id;
    const response = await axiosAdmin.put(`${B_editEmployee}${data._id}`, {
      name: data.name,
      email: data.email,
      access: data.access,
      userName: data.userName,
      employeeImage: data.employeeImage,
    });
    const currentUpdate = response?.data?.user?._id;
    if (existingUser === currentUpdate) {
      console.log('first');
      UserCredentials.setState({ user: response.data });
    }

    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const blockEmployee = async (data) => {
  console.log(data);
  try {
    const response = await axiosAdmin.put(`${B_blockEmployee}${data.idb}`, {
      isBlocked: data.blocked,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const deleteEmployee = async (data) => {
  console.log(data);
  try {
    const response = await axiosAdmin.delete(`${B_deleteEmployee}${data}`);
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const forgotPassword = async (data) => {
  console.log(data);
  try {
    const response = await axiosAdmin.post(B_forgotPassword, data);
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const enterNewPassword = async (data) => {
  console.log(data);
  try {
    const response = await axiosAdmin.post(B_enterNewPassword, data);
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const updatePassword = async (data) => {
  console.log(data);
  try {
    const response = await axiosAdmin.put(B_updatePassword, data);
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const deleteEmployeeMultiple = async (employeeIds) => {
  try {
    const response = await axiosAdmin.delete(B_employeeMultipleDelete, { data: { employeeIds } });
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};
