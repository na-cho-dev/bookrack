import axiosInstance from "./axios";
import type { CreateOrganizationDto, Organization } from "../types/auth.type";

export const createOrganization = async (
  orgData: CreateOrganizationDto
): Promise<Organization> => {
  const response = await axiosInstance.post("/organization/create", orgData);
  return response.data.data;
};

export const updateOrganization = async (
  orgData: Partial<Organization>
): Promise<Organization> => {
  const response = await axiosInstance.patch(`/organization/update`, orgData);
  return response.data.data;
};
