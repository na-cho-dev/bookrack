import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/auth";
import toast from "react-hot-toast";
import type { RegisterPayload, User } from "../types/auth";

export const useRegister = () => {
  return useMutation<User, any, RegisterPayload>({
    mutationFn: registerUser,
    onSuccess: (_data) => {
      toast.success("Registration successful!");
      // console.log("Registration data:", data);

      // Redirect to Dashboard - To be implemented
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Registration failed");
      console.error("Registration error:", error);
    },
  });
};
