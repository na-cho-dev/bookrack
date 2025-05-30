import type { LoginPayload, RegisterPayload, User } from "../types/auth";
import axiosInstance from "./axios";

export const loginUser = async (data: LoginPayload): Promise<User> => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data.user;
};

export const registerUser = async (data: RegisterPayload): Promise<User> => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data.user;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await axiosInstance.get("/auth/current");
  return response.data.user;
};

export const logoutUser = async () => {
  const response = await axiosInstance.get("/auth/logout");
  return response.data;
};
