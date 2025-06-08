import axios from "axios";
import { useUserStore } from "../stores/useUserStore";

const appUrl = import.meta.env.VITE_APP_URL || "http://localhost:3330";
const axiosInstance = axios.create({
  baseURL: `${appUrl}/api`,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const currentMembership = useUserStore.getState().currentMembership;

  if (currentMembership?.organization._id) {
    config.headers["x-organization-id"] = currentMembership.organization._id;
  }

  return config;
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: any) => void;
  reject: (error: any) => void;
}[] = [];

const processQueue = (error: any) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const skipRefresh = [
      "/auth/login",
      "/auth/admin/register",
      "/auth/user/register",
      "/auth/refresh",
      "/auth/logout",
    ].some((url) => originalRequest.url.includes(url));

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !skipRefresh &&
      useUserStore.getState().user
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => axiosInstance(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axiosInstance.get("/auth/refresh"); // Should send HTTP-only cookie
        processQueue(null);
        return axiosInstance(originalRequest); // Retry original request
      } catch (err) {
        processQueue(err);
        useUserStore.getState().setUser(null);
        window.location.href = "/login"; // Force logout
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
