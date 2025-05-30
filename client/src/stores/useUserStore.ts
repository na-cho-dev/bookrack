import { create } from "zustand";
import type { UserState } from "../types/auth";

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loadingUser: true,
  setUser: (user) => set({ user, loadingUser: false }),
  setLoadingUser: (loading) => set({ loadingUser: loading }),
}));
