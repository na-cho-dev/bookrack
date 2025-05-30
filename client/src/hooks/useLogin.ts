import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/auth";
import toast from "react-hot-toast";
import type { LoginPayload, User } from "../types/auth";

export const useLogin = () => {
  return useMutation<User, any, LoginPayload>({
    mutationFn: loginUser,
    onSuccess: (_data) => {
      toast.success("Login successful!");
      // console.log("Login data:", _data);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Login failed");
      console.error("Login error:", error);
    },
  });
};
