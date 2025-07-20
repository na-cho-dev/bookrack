import { useMutation } from "@tanstack/react-query";
import { joinOrg, leaveOrg } from "../api/membership.api";
import { useUserStore } from "../stores/useUserStore";
import toast from "react-hot-toast";

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
    onError: (error) => {
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
