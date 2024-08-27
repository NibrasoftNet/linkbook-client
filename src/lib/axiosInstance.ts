// Create the custom Axios instance
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

// eslint-disable-next-line import/no-cycle
import { getSession, refreshTokenAction } from '@/actions/auth.actions';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Request interceptor to attach the access token
axiosInstance.interceptors.request.use(
  async (config) => {
    const cookiesSession = await getSession();
    if (cookiesSession && cookiesSession.token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${cookiesSession.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle errors and refresh token if needed
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const cookiesSession = await getSession();
    // Check if the error is due to an expired token
    if (!cookiesSession) {
      return Promise.reject(error);
    }
    // eslint-disable-next-line no-underscore-dangle
    if (error.response.status === 401 && !originalRequest._retry) {
      // eslint-disable-next-line no-underscore-dangle
      originalRequest._retry = true;
      try {
        if (cookiesSession && !cookiesSession.refreshToken) {
          return await Promise.reject(error);
        }
        const data = await refreshTokenAction(cookiesSession.refreshToken);
        if (data.token) {
          axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
          originalRequest.headers.Authorization = `Bearer ${data.token}`;
          return await axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
