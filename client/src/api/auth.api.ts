import type {
  LoginPayload,
  RegisterAdminPayload,
  RegisterUserPayload,
  User,
} from "../types/auth.type";
import axiosInstance from "./axios";

export const loginUser = async (data: LoginPayload): Promise<User> => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data.user;
};

export const registerUser = async (
  data: RegisterUserPayload
): Promise<User> => {
  const response = await axiosInstance.post("/auth/user/register", data);
  return response.data.user;
};

export const registerAdmin = async (
  data: RegisterAdminPayload
): Promise<User> => {
  const response = await axiosInstance.post("/auth/admin/register", data);
  return response.data.user;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await axiosInstance.get("/auth/current-user");
  return response.data.user;
};

export const logoutUser = async () => {
  const response = await axiosInstance.get("/auth/logout");
  return response.data;
};
