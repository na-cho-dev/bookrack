import { useUserStore } from "../stores/useUserStore";
import {
  useAllBooks,
  useAvailableBooks,
  useBorrowRequests,
  useUserBorrowRequests,
} from "./useBook";
import { useOrganizationUsers } from "./useMembership";
import { useEffect } from "react";

export const useAppLoading = () => {
  const loadingUser = useUserStore((s) => s.loadingUser);
  const isInitialLoadComplete = useUserStore((s) => s.isInitialLoadComplete);
  const setInitialLoadComplete = useUserStore((s) => s.setInitialLoadComplete);

  const { isLoading: loadingBooks } = useAllBooks();
  const { isLoading: loadingAvailable } = useAvailableBooks();
  const { isLoading: loadingBorrowHistory } = useBorrowRequests();
  const { isLoading: loadingBorrowedAndPending } = useBorrowRequests([
    "borrowed",
    "pending-return",
  ]);
  const { isLoading: loadingUserBorrowHistory } = useUserBorrowRequests();
  const { isLoading: loadingUserBorrowed } = useUserBorrowRequests("borrowed");
  const { isLoading: loadingUserBorrowPending } =
    useUserBorrowRequests("pending");
  const { isLoading: loadingOrgUsers } = useOrganizationUsers();

  const loadingAllBooks =
    loadingBooks ||
    loadingAvailable ||
    loadingBorrowHistory ||
    loadingBorrowedAndPending ||
    loadingUserBorrowHistory ||
    loadingUserBorrowed ||
    loadingUserBorrowPending;

  // Set initial load complete when all queries are done
  useEffect(() => {
    if (
      !loadingUser &&
      !loadingAllBooks &&
      !loadingOrgUsers &&
      !isInitialLoadComplete
    ) {
      setInitialLoadComplete();
    }
  }, [
    loadingUser,
    loadingAllBooks,
    loadingOrgUsers,
    isInitialLoadComplete,
    setInitialLoadComplete,
  ]);

  // Only show spinner during initial load
  const isAppLoading =
    !isInitialLoadComplete &&
    (loadingUser || loadingAllBooks || loadingOrgUsers);

  return {
    loadingUser,
    loadingBooks,
    loadingAvailable,
    loadingBorrowHistory,
    loadingBorrowedAndPending,
    loadingUserBorrowHistory,
    loadingUserBorrowed,
    loadingUserBorrowPending,
    loadingOrgUsers,
    isAppLoading,
  };
};
