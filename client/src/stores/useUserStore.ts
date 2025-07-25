import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Membership, User, UserState } from "../types/auth.type";

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      memberships: null,
      loadingUser: true,
      currentMembership: null,
      isInitialLoadComplete: false,

      setUser: (user: User | null) => set({ user }),
      setMemberships: (memberships: Membership[] | null) =>
        set({ memberships }),
      setLoadingUser: (loading: boolean) => set({ loadingUser: loading }),
      setCurrentMembership: (membership: Membership | null) =>
        set({ currentMembership: membership }),
      setInitialLoadComplete: () => set({ isInitialLoadComplete: true }),
      resetInitialLoad: () => set({ isInitialLoadComplete: false }),
    }),
    {
      name: "org-storage",
      partialize: (state) => ({ currentMembership: state.currentMembership }),
    }
  )
);

