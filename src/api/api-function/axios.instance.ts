import axios from "axios";
import { getCookie } from "cookies-next";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

api.interceptors.request.use(
  (config) => {
    // Retrieve the single authentication token
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("Error in axios interceptor:", error.response);
    
    // Optional: If a 401 occurs, you could trigger a global logout here in the future
    // if (error.response?.status === 401) {
    //   forceLogout(); 
    // }

    return Promise.reject(error);
  }
);

export default api;