import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Membership, User, UserState } from "../types/auth";

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      memberships: null,
      loadingUser: true,
      currentMembership: null,

      setUser: (user: User | null) => set({ user }),
      setMemberships: (memberships: Membership[] | null) =>
        set({ memberships }),
      setLoadingUser: (loading: boolean) => set({ loadingUser: loading }),
      setCurrentMembership: (membership: Membership | null) =>
        set({ currentMembership: membership }),
    }),
    {
      name: "org-storage",
      partialize: (state) => ({ currentMembership: state.currentMembership }),
    }
  )
);

