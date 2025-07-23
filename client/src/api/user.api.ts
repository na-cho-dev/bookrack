import type { User } from "../types/auth.type";
import axiosInstance from "./axios";

export const updateUser = async (
  userId: string,
  userData: Partial<User>
): Promise<User> => {
  const response = await axiosInstance.patch(`/users/${userId}`, userData);
  return response.data;
};