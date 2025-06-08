import type { Membership } from "../types/auth";
import axiosInstance from "./axios";

export const getUserMemberships = async (): Promise<Membership[]> => {
  const response = await axiosInstance.get("/membership/user/all");
  return response.data;
};
