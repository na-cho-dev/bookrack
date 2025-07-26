import { useMutation } from "@tanstack/react-query";
import {
  getOrgUsers,
  joinOrg,
  leaveOrg,
  transferOwnership,
  getUserMemberships,
  removeUserFromOrganization,
  getPendingUserRequests,
  acceptUserRequest,
  rejectUserRequest,
} from "../api/membership.api";
import { useUserStore } from "../stores/useUserStore";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "../utils/queryClient";
// import { queryClient } from "../utils/queryClient";

/// =============== QUERY HOOKS =============== ///
export const useLoadMemberships = () => {
  const setLoadingUser = useUserStore((state) => state.setLoadingUser);
  const setMemberships = useUserStore((state) => state.setMemberships);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["user-memberships"],
    queryFn: getUserMemberships,
    retry: false,
  });

  useEffect(() => {
    setLoadingUser(isLoading);

    if (!isLoading) {
      if (data) {
        setMemberships(data);
      } else if (isError) {
        setMemberships([]);
      }
    }
  }, [data, isError, isLoading]);

  return { isLoading, isError, data };
};

export const useOrganizationUsers = () => {
  const { data, isError, isLoading, fetchStatus, isFetching } = useQuery({
    queryKey: ["organization-users"],
    queryFn: getOrgUsers,
    retry: false,
  });

  return { data, isError, isLoading, fetchStatus, isFetching };
};

export const usePendingUserRequests = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["pending-user-requests"],
    queryFn: getPendingUserRequests,
    retry: false,
  });

  return { data, isError, isLoading };
};

/// =============== MUTATION HOOKS =============== ///
export const useLeaveOrg = () => {
  const resetCurrentMembership = useUserStore((s) => s.setCurrentMembership);
  const memberships = useUserStore((s) => s.memberships ?? []);
  const setMemberships = useUserStore((s) => s.setMemberships);
  const currentMembership = useUserStore((s) => s.currentMembership);

  return useMutation({
    mutationFn: () => leaveOrg(),
    onSuccess: () => {
      if (!currentMembership) return;

      // Remove the current org from memberships
      const updatedMemberships = memberships.filter(
        (mem) => mem.organization._id !== currentMembership.organization._id
      );

      setMemberships(updatedMemberships ?? null);
      resetCurrentMembership(null);
    },
    onError: (error: any) => {
      // toast.error(`Failed to leave organization: ${error.message}`);
      toast.error(
        error?.response?.data?.message || "Failed to leave organization"
      );
      console.error("Failed to leave organization:", error);
    },
  });
};

export const useJoinOrg = () => {
  // const setCurrentMembership = useUserStore(
  //   (state) => state.setCurrentMembership
  // );
  // const setMemberships = useUserStore((state) => state.setMemberships);
  // const memberships = useUserStore((state) => state.memberships);

  return useMutation({
    mutationFn: joinOrg,
    onSuccess: (data) => {
      // setMemberships([...(memberships ?? []), data]);
      // setCurrentMembership(data);
      toast.success(`Joined organization: ${data.organization.name}`);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to join organization"
      );
    },
  });
};

export const useTransferOwnership = () => {
  return useMutation({
    mutationFn: async (newOwnerId: string) => {
      return transferOwnership(newOwnerId);
    },
    onSuccess: async () => {
      toast.success("Ownership transferred successfully!");
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "Failed to transfer ownership"
      );
    },
  });
};

export const useRemoveUserFromOrg = () => {
  const setMemberships = useUserStore((state) => state.setMemberships);
  const memberships = useUserStore((state) => state.memberships);

  return useMutation({
    mutationFn: (userId: string) => removeUserFromOrganization(userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["organization-users"] });
      queryClient.invalidateQueries({ queryKey: ["user-memberships"] });
      // Update memberships by removing the user
      const updatedMemberships = memberships?.filter(
        (mem) => mem.user._id !== data.user._id
      );
      setMemberships(updatedMemberships ?? null);
      toast.success(`Removed user: ${data.user.name}`);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to remove user from organization"
      );
    },
  });
};

export const useAcceptUserRequest = () => {
  return useMutation({
    mutationFn: (userId: string) => acceptUserRequest(userId),
    onSuccess: () => {
      toast.success("User request accepted!");
      queryClient.invalidateQueries({ queryKey: ["pending-user-requests"] });
      queryClient.invalidateQueries({ queryKey: ["organization-users"] });
      queryClient.invalidateQueries({ queryKey: ["user-memberships"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to accept user request"
      );
    },
  });
};

export const useRejectUserRequest = () => {
  return useMutation({
    mutationFn: (userId: string) => rejectUserRequest(userId),
    onSuccess: () => {
      toast.success("User request rejected!");
      queryClient.invalidateQueries({ queryKey: ["pending-user-requests"] });
      queryClient.invalidateQueries({ queryKey: ["organization-users"] });
      queryClient.invalidateQueries({ queryKey: ["user-memberships"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to reject user request"
      );
    },
  });
};