import { axiosInstance } from './axiosInstance';

export const RegisterOrder = async (payload) => {
  try {
    const response = await axiosInstance.post(
      '/api/orders/order-register',
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get all orders
export const GetAllOrders = async (filters) => {
  try {
    const response = await axiosInstance.post(
      '/api/orders/get-all-orders',
      filters
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
