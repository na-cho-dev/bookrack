// import { useUserStore } from "../stores/useUserStore";
// import {
//   useAllBooks,
//   useAvailableBooks,
//   useBorrowRequests,
//   useUserBorrowRequests,
// } from "./useBook";
// import { useOrganizationUsers } from "./useMembership";

// export const useAppLoading = () => {
//   const loadingUser = useUserStore((s) => s.loadingUser);

//   const {
//     isLoading: loadingBooks,
//     fetchStatus: booksFetchStatus,
//     isFetching: isBooksFetching,
//   } = useAllBooks();
//   const {
//     isLoading: loadingAvailable,
//     fetchStatus: availableFetchStatus,
//     isFetching: isAvailableFetching,
//   } = useAvailableBooks();
//   const {
//     isLoading: loadingBorrowHistory,
//     fetchStatus: borrowHistoryFetchStatus,
//     isFetching: isBorrowHistoryFetching,
//   } = useBorrowRequests();
//   const {
//     isLoading: loadingBorrowedAndPending,
//     fetchStatus: borrowedAndPendingFetchStatus,
//     isFetching: isBorrowedAndPendingFetching,
//   } = useBorrowRequests(["borrowed", "pending-return"]);
//   const {
//     isLoading: loadingUserBorrowHistory,
//     fetchStatus: userBorrowHistoryFetchStatus,
//     isFetching: isUserBorrowHistoryFetching,
//   } = useUserBorrowRequests();
//   const {
//     isLoading: loadingUserBorrowed,
//     fetchStatus: userBorrowedFetchStatus,
//     isFetching: isUserBorrowedFetching,
//   } = useUserBorrowRequests("borrowed");
//   const {
//     isLoading: loadingOrgUsers,
//     fetchStatus: orgUsersFetchStatus,
//     isFetching: isOrgUsersFetching,
//   } = useOrganizationUsers();

//   // Initial loading: isLoading is true and no cached data (first fetch)
//   const isBooksInitialLoading =
//     loadingBooks && booksFetchStatus === "fetching" && !isBooksFetching;
//   const isAvailableInitialLoading =
//     loadingAvailable &&
//     availableFetchStatus === "fetching" &&
//     !isAvailableFetching;
//   const isBorrowHistoryInitialLoading =
//     loadingBorrowHistory &&
//     borrowHistoryFetchStatus === "fetching" &&
//     !isBorrowHistoryFetching;
//   const isBorrowedAndPendingInitialLoading =
//     loadingBorrowedAndPending &&
//     borrowedAndPendingFetchStatus === "fetching" &&
//     !isBorrowedAndPendingFetching;
//   const isUserBorrowHistoryInitialLoading =
//     loadingUserBorrowHistory &&
//     userBorrowHistoryFetchStatus === "fetching" &&
//     !isUserBorrowHistoryFetching;
//   const isUserBorrowedInitialLoading =
//     loadingUserBorrowed &&
//     userBorrowedFetchStatus === "fetching" &&
//     !isUserBorrowedFetching;
//   const isOrgUsersInitialLoading =
//     loadingOrgUsers &&
//     orgUsersFetchStatus === "fetching" &&
//     !isOrgUsersFetching;

//   const loadingAllBooks =
//     isBooksInitialLoading ||
//     isAvailableInitialLoading ||
//     isBorrowHistoryInitialLoading ||
//     isBorrowedAndPendingInitialLoading ||
//     isUserBorrowHistoryInitialLoading ||
//     isUserBorrowedInitialLoading;

//   const isAppLoading =
//     loadingUser || loadingAllBooks || isOrgUsersInitialLoading;

//   return {
//     loadingUser,
//     loadingBooks: isBooksInitialLoading,
//     loadingAvailable: isAvailableInitialLoading,
//     loadingBorrowHistory: isBorrowHistoryInitialLoading,
//     loadingBorrowedAndPending: isBorrowedAndPendingInitialLoading,
//     loadingUserBorrowHistory: isUserBorrowHistoryInitialLoading,
//     loadingUserBorrowed: isUserBorrowedInitialLoading,
//     loadingOrgUsers: isOrgUsersInitialLoading,
//     isAppLoading,
//   };
// };

// useAppLoading.ts
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
