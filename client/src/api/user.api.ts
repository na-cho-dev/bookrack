import type { User } from "../types/auth.type";
import axiosInstance from "./axios";

export const getOrgUser = async (): Promise<User[]> => {
  const response = await axiosInstance.get("/membership/user/all");
  return response.data;
};
