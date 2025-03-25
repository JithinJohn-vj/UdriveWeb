import axios from 'axios';

// config
import { ADMIN_API } from './config';

// ----------------------------------------------------------------------

const axiosAdmin = axios.create({
  withCredentials: true,
  baseURL: ADMIN_API,
});

axiosAdmin.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export { axiosAdmin };
