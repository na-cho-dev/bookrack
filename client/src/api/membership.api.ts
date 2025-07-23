import type { Membership } from "../types/auth.type";
import axiosInstance from "./axios";

export const getUserMemberships = async (): Promise<Membership[]> => {
  const response = await axiosInstance.get("/membership/user/all");
  return response.data;
};

export const getOrgUsers = async (): Promise<Membership[]> => {
  const response = await axiosInstance.get("/membership/organization/users");
  return response.data;
};

export const leaveOrg = async (): Promise<void> => {
  const response = await axiosInstance.delete(`/membership/leave`);
  return response.data;
};

export const joinOrg = async (orgCode: string): Promise<Membership> => {
  const response = await axiosInstance.post(`/membership/join`, {
    orgCode,
  });
  return response.data;
};

export const transferOwnership = async (
  newOwnerId: string
): Promise<Membership> => {
  const response = await axiosInstance.patch(
    `/membership/organization/transfer-ownership`,
    {
      newOwnerId,
    }
  );
  return response.data;
};
