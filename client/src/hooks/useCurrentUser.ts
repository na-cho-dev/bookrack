import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/auth.api";
import { useUserStore } from "../stores/useUserStore";

export const useCurrentUser = () => {
  const setUser = useUserStore((state) => state.setUser);
  const setLoadingUser = useUserStore((state) => state.setLoadingUser);
  const setMemberships = useUserStore((state) => state.setMemberships);
  const setCurrentMembership = useUserStore(
    (state) => state.setCurrentMembership
  );

  const { data, isError, isLoading } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    retry: false,
  });

  useEffect(() => {
    setLoadingUser(isLoading);

    if (!isLoading) {
      if (data) {
        setUser(data);

        if ("memberships" in data) {
          setMemberships(data.memberships);
          setCurrentMembership(null);
        } else if ("membership" in data) {
          setMemberships([data.membership]);
          setCurrentMembership(data.membership);
        }
      } else if (isError) {
        setUser(null);
        setMemberships([]);
        setCurrentMembership(null);
      }
    }
  }, [data, isError, isLoading]);

  return { isLoading, isError, data };
};
