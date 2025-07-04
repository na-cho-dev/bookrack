import type { Membership } from "../types/auth.type";
import axiosInstance from "./axios";

export const getUserMemberships = async (): Promise<Membership[]> => {
  const response = await axiosInstance.get("/membership/user/all");
  return response.data;
};

export const getOrgUser = async (): Promise<Membership[]> => {
  const response = await axiosInstance.get("/membership/organization/users");
  return response.data;
};
