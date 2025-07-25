import type { Membership } from "../types/auth.type";
import axiosInstance from "./axios";

export const getUserMemberships = async (): Promise<Membership[]> => {
  const response = await axiosInstance.get("/membership/user/all");
  return response.data.data;
};

export const getOrgUsers = async (): Promise<Membership[]> => {
  try {
    const response = await axiosInstance.get("/membership/organization/users");
    return response.data.data;
  } catch (err: any) {
    if (err.response?.status === 403) return [];
    throw err;
  }
};

export const leaveOrg = async (): Promise<void> => {
  const response = await axiosInstance.delete(`/membership/leave`);
  return response.data.data;
};

export const joinOrg = async (orgCode: string): Promise<Membership> => {
  const response = await axiosInstance.post(`/membership/join`, {
    orgCode,
  });
  return response.data.data;
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
  return response.data.data;
};

export const removeUserFromOrganization = async (
  userId: string
): Promise<Membership> => {
  const response = await axiosInstance.delete(`/membership/remove/${userId}`);
  return response.data.data;
};

export const getPendingUserRequests = async (): Promise<Membership[]> => {
  const res = await axiosInstance.get("/membership/pending-requests");
  return res.data.data;
};

export const acceptUserRequest = async (userId: string) => {
  const res = await axiosInstance.post(`/membership/accept/${userId}`);
  return res.data.data;
};

export const rejectUserRequest = async (userId: string) => {
  const res = await axiosInstance.post(`/membership/reject/${userId}`);
  return res.data.data;
};