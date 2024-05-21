import { axiosInstance } from './axiosInstance';

//customer register

export const RegisterRequest = async (payload) => {
  try {
    const response = await axiosInstance.post(
      '/api/requests/request-register',
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetCurrentRequests = async () => {
  try {
    const response = await axiosInstance.get(
      '/api/requests/get-current-request'
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get all requests
export const GetAllRequests = async () => {
  try {
    const response = await axiosInstance.get('/api/requests/get-request');
    return response.data;
  } catch (error) {
    return error.message;
  }
};
