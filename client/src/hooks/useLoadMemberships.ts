import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../stores/useUserStore";
import { getOrgUser, getUserMemberships } from "../api/membership.api";

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
    queryKey: ["org-users"],
    queryFn: getOrgUser,
    retry: false,
  });

  return { isLoading, isError, data };
};
