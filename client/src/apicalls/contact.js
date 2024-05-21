import { axiosInstance } from './axiosInstance';

//message register

export const RegisterMessage = async (payload) => {
  try {
    const response = await axiosInstance.post(
      '/api/contacts/message-register',
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetCurrentMessage = async () => {
  try {
    const response = await axiosInstance.get(
      '/api/contacts/get-current-message'
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get all message
export const GetAllMessages = async () => {
  try {
    const response = await axiosInstance.get('/api/contacts/get-all-messages');
    return response.data;
  } catch (error) {
    return error.message;
  }
};
