import { useMutation } from "@tanstack/react-query";
import { registerAdmin, registerUser } from "../api/auth.api";
import toast from "react-hot-toast";
import type {
  RegisterAdminPayload,
  RegisterUserPayload,
  User,
} from "../types/auth.type";

export const useRegisterUser = () => {
  return useMutation<User, any, RegisterUserPayload>({
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

export const useRegisterAdmin = () => {
  return useMutation<User, any, RegisterAdminPayload>({
    mutationFn: registerAdmin,
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
