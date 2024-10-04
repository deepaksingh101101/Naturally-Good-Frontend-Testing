import Axios, { AxiosResponse, Method } from 'axios';

import storage from '../utils/storage';
import { getSessionStorageItem } from '@/utils/localStorage';

function authRequestInterceptor(config: any) {
  config.headers = config.headers ?? {};
  const token = getSessionStorageItem('token');
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}
export const axios = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`
});
axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response: any) => {
    return response.data?.result ? response.data?.result : response.data;
  },
  (error: any) => {
    let message = error.response?.data?.message || error.message;
    if (
      error.response &&
      error.response.data &&
      error.response.data.error &&
      (error.response.data.error?.errors ||
        error.response.data.error?.error_params)
    ) {
      message =
        error.response.data.error?.errors.join(',') ||
        error.response.data.error?.error_params
          ?.map((e: any) => e.message || e.msg)
          ?.join(',');
    }
    // Handle Error
    // eslint-disable-next-line no-undef
    return Promise.reject({
      statusCode: error.response?.status,
      message: message
    });
  }
);


// Common method for api hitting 

async function apiCall<T = any>(
  method: Method,
  url: string,
  data?: any
): Promise<AxiosResponse<T>> { // Return type is now AxiosResponse<T>
  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url,
      data,
      // You can add headers or other configurations here if needed
    });
    return response; // Return the whole response object
  } catch (error: any) {
    console.error('API call error:', error); // Log the error for debugging
    throw error; // Rethrow the error for handling in the caller
  }
}

export default apiCall;
