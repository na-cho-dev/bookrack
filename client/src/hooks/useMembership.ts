import { useMutation } from "@tanstack/react-query";
import {
  getOrgUsers,
  joinOrg,
  leaveOrg,
  transferOwnership,
  getUserMemberships,
} from "../api/membership.api";
import { useUserStore } from "../stores/useUserStore";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
// import { queryClient } from "../utils/queryClient";

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
  const { data, isError, isLoading } = useQuery({
    queryKey: ["organization-users"],
    queryFn: getOrgUsers,
    retry: false,
  });

  return { isLoading, isError, data };
};

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

      setMemberships(updatedMemberships);
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
  const setCurrentMembership = useUserStore(
    (state) => state.setCurrentMembership
  );
  const setMemberships = useUserStore((state) => state.setMemberships);
  const memberships = useUserStore((state) => state.memberships);

  return useMutation({
    mutationFn: joinOrg,
    onSuccess: (data) => {
      setMemberships([...(memberships ?? []), data]);
      setCurrentMembership(data);
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
