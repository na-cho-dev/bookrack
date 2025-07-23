import axiosInstance from "./axios";
import type { Organization } from "../types/auth.type";

export const updateOrganization = async (
  orgData: Partial<Organization>
): Promise<Organization> => {
  const response = await axiosInstance.patch(`/organization/update`, orgData);
  return response.data.organization;
};
