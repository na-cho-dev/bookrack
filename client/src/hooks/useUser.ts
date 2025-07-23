import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../api/user.api";
import toast from "react-hot-toast";
import type { UpdateUserPayload } from "../types/user.type";
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

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: ({
      userId,
      userData,
    }: {
      userId: string;
      userData: UpdateUserPayload;
    }) => updateUser(userId, userData),
    onSuccess: (data) => {
      toast.success(`User "${data.name ?? ""}" updated successfully!`);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update user. Try again."
      );
    },
  });
};
