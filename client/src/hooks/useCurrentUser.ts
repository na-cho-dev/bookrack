// hooks/useCurrentUser.ts
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/auth";
import { useUserStore } from "../stores/useUserStore";

export const useCurrentUser = () => {
  const setUser = useUserStore((state) => state.setUser);
  const setLoadingUser = useUserStore((state) => state.setLoadingUser);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
  });

  useEffect(() => {
    setLoadingUser(isLoading);

    if (!isLoading) {
      if (data) {
        setUser(data);
      } else if (isError) {
        setUser(null);
      }
    }
  }, [data, isError, isLoading, setUser, setLoadingUser]);
};
