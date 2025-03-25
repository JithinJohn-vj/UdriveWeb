import { axiosAdmin } from 'src/utils/axios';

import {
  B_editCar,
  B_createCar,
  B_deleteCar,
  B_getAllCars,
  B_carsOnYard,
  B_carsRevenue,
  B_getSingleCar,
  B_InsuranceDue,
  B_carsOnRunning,
  B_carsServiceDue,
  B_insuranceOverDue,
  B_pollutionOverDue,
  B_getCarActivities,
  B_topFiveBookedCars,
  B_addServiceDetails,
  B_carsMultipleDelete,
  B_carsServiceOverDue,
  B_ResetCarServiceKms,
  B_deleteServiceDetails,
  B_carsPollutionNotification,
  B_getAvailableCarsForCalender,
} from 'src/paths/ShowMeTheWayBackend';

export const createCars = async (data) => {
  console.log(data);
  try {
    await axiosAdmin.post(B_createCar, data);
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const resetServiceKms = async (data) => {
  console.log(data);
  try {
    const response = await axiosAdmin.put(`${B_ResetCarServiceKms}${data}`);
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const getCars = async () => {
  try {
    const response = await axiosAdmin.get(B_getAllCars);
    console.log(response);
    return response.data.cars;
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

export const editCarsById = async (data) => {
  console.log(data);
  try {
    const response = await axiosAdmin.put(`${B_editCar}${data._id}`, {
      lastService: data.lastService,
      insurance: data.insurance,
      pollution: data.pollution,
      serviceInterval: data.serviceInterval,
      transmission: data.transmission,
      fuelType: data.fuelType,
      vehicleNumber: data.vehicleNumber,
      yearOfManufacturing: data.yearOfManufacturing,
      manufacturingCompany: data.manufacturingCompany,
      name: data.name,
      rcBook: data.rcBook,
      totalKmCovered: data.totalKmCovered,
      insurancePolicy: data.insurancePolicy,
      pollutionCertificate: data.pollutionCertificate,
      carImage: data.carImage,
    });
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const deleteCars = async (data) => {
  console.log(data);
  try {
    const response = await axiosAdmin.delete(`${B_deleteCar}${data}`);
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const deleteMultipleCars = async (carIds) => {
  try {
    const response = await axiosAdmin.delete(B_carsMultipleDelete, { data: { carIds } });
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const getTopBookedCars = async (carIds) => {
  try {
    const response = await axiosAdmin.get(B_topFiveBookedCars);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const getCarsRevenueById = async (id) => {
  try {
    const m = id.queryKey[1];
    console.log(m);
    if (m) {
      const response = await axiosAdmin.get(`${B_carsRevenue}${m}`);
      console.log(response.data.totalRevenue);
      return response.data?.totalRevenue;
    }
    return null;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const getCarsOnYard = async (carIds) => {
  try {
    const response = await axiosAdmin.get(B_carsOnYard);
    console.log(response);
    return response.data?.carsOnYard;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const getCarsOnRun = async (carIds) => {
  try {
    const response = await axiosAdmin.get(B_carsOnRunning);
    console.log(response);
    return response.data?.runningCars;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const getCarsServiceDue = async () => {
  try {
    const response = await axiosAdmin.get(B_carsServiceDue);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const getCarsServiceOverDue = async () => {
  try {
    const response = await axiosAdmin.get(B_carsServiceOverDue);
    console.log(response);
    return response.data?.dueCarsOver;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const getCarsInsuranceDue = async () => {
  try {
    const response = await axiosAdmin.get(B_InsuranceDue);
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};
export const getCarsInsuranceOverDue = async () => {
  try {
    const response = await axiosAdmin.get(B_insuranceOverDue);
    return response.data?.dueCarsOver;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const getCarsPollutionOverDue = async () => {
  try {
    const response = await axiosAdmin.get(B_pollutionOverDue);
    return response.data?.dueCarsPollution;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const getCarsPollutionNotifications = async () => {
  try {
    const response = await axiosAdmin.get(B_carsPollutionNotification);
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};



export const addCarServiceDetails = async (data) => {
  console.log(data);
  try {
    const response = await axiosAdmin.put(`${B_addServiceDetails}${data._id}`, {
      serviceDoneAt: data.serviceDoneAt,
      date: data.date,
      description: data.description,
      worksDone: data.worksDone,
    });
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const deleteServiceDetails = async (data) => {
  console.log(data);
  try {
    const response = await axiosAdmin.delete(
      `${B_deleteServiceDetails}${data.carid}/${data.serviceId}`
    );
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};


// export const getAvailableCarsForCalender = async (data) => {
//   console.log(data);
//   try {
//     const response = await axiosAdmin.get(`${B_getAvailableCarsForCalender}`, {
//       date: data.lastService,
//     });
//     return response.data;
//   } catch (error) {
//     console.log('err', error);
//     throw error;
//   }
// };

export const getAvailableCarsForCalender = async (id) => {
  try {
    const m = id.queryKey[1];
    console.log(m)
    if (m) {
      const response = await axiosAdmin.get(`${B_getAvailableCarsForCalender}${m}`);
      return response.data?.availableCars;
    }
    return null;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const getCarActivities = async (id) => {
  try {
    const m = id.queryKey[1];
    console.log(m)
    if (m) {
      const response = await axiosAdmin.get(`${B_getCarActivities}${m}`);
      return response.data;
    }
    return null;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

