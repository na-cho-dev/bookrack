import { useUserStore } from "../stores/useUserStore";
import {
  useAllBooks,
  useAvailableBooks,
  useBorrowedBooks,
  usePendingBorrowRequests,
} from "./useBook";

export const useAppLoading = () => {
  const loadingUser = useUserStore((s) => s.loadingUser);
  // const orgId = useUserStore((s) => s.currentMembership?.organization._id);

  const { isLoading: loadingBooks } = useAllBooks();
  const { isLoading: loadingAvailable } = useAvailableBooks();
  const { isLoading: loadingBorrowed } = useBorrowedBooks();
  const { isLoading: loadingPending } = usePendingBorrowRequests();

  const loadingAllBooks =
    loadingBooks || loadingAvailable || loadingBorrowed || loadingPending;

  const isAppLoading = loadingUser || loadingAllBooks;

  return {
    loadingUser,
    loadingBooks,
    loadingAvailable,
    loadingBorrowed,
    loadingPending,
    isAppLoading,
  };
};
