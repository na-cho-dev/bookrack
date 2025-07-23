import { useMutation } from "@tanstack/react-query";
import { updateOrganization } from "../api/organization.api";
import { queryClient } from "../utils/queryClient";
import toast from "react-hot-toast";
import type { Organization } from "../types/auth.type";

export const useUpdateOrganization = () => {
  return useMutation<Organization, any, { orgData: Partial<Organization> }>({
    mutationFn: ({ orgData }) => updateOrganization(orgData),
    onSuccess: (_data) => {
      toast.success("Organization updated successfully!");
      // Invalidate queries to refresh org/user data
      queryClient.invalidateQueries({ queryKey: ["organization-users"] });
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      queryClient.invalidateQueries({ queryKey: ["user-memberships"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update organization"
      );
    },
  });
};
