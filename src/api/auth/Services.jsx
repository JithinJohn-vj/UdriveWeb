// import { getTokenFromLocalStorage } from "constants/token";
// import { isValidToken, setSession } from "utils/jwt";

import { axiosAdmin } from 'src/utils/axios';

import UserCredentials from 'src/zustand/UserCredentials';
import {
  B_getUserInfo,
  B_loginEmployee,
  B_logoutEmployee,
  B_updateAcessToken,
} from 'src/paths/ShowMeTheWayBackend';

export const loginEmployees = async (data) => {
  console.log(data);
  try {
    const response = await axiosAdmin.post(B_loginEmployee, data);
    console.log(response);
    UserCredentials.setState({ user: response.data });
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const response = await axiosAdmin.get(B_updateAcessToken);
    UserCredentials.setState({ user: response.data });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const loggedInUser = async () => {
  try {
    const response = await axiosAdmin.get(B_getUserInfo);
    console.log(response.data);
    UserCredentials.setState({ user: response.data });
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosAdmin.post(B_logoutEmployee);
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};
