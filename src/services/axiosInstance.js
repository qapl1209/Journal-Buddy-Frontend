import axios from 'axios';
import { saveToken, getToken, saveRefreshToken, getRefreshToken, clearToken } from '../utils/token';
import emitter from '../utils/eventEmitter'

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercept requests to attach Authorization header
axiosInstance.interceptors.request.use((config) => {
  // const token = localStorage.getItem('access_token');
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => response, // Directly return successful responses.
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      try {
        const refreshToken = getRefreshToken(); // Retrieve the stored refresh token.
        // Make a request to your auth server to refresh the token.
        const headers = {
          Authorization: 'Bearer' + refreshToken
        };
        const response = await axios.post('http://127.0.0.1:5000/api/auth/refresh', {headers});
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        // Store the new access and refresh tokens.
        saveRefreshToken(newRefreshToken);
        saveToken(accessToken);
        // Update the authorization header with the new access token.
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest); // Retry the original request with the new access token.
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        console.log("HELLO IM HERE");

        emitter.emit('logout');
        return Promise.reject(new Error('Session expired. Redirecting to login.'));
      }
    }
    return Promise.reject(error); // For all other errors, return the error as is.
  }
);

export default axiosInstance;