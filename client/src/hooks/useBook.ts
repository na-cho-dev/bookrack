import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addBook,
  deleteBook,
  fetchAllBooks,
  fetchAvailableBooks,
  updateBook,
} from "../api/book.api";
import { useUserStore } from "../stores/useUserStore";
import toast from "react-hot-toast";
import { queryClient } from "../utils/queryClient";
import {
  approveBorrowRequest,
  approveReturnRequest,
  cancelBorrowRequest,
  createBorrowRequest,
  getBorrowRequests,
  getUserBorrowRecordsByStatus,
  returnBookRequest,
} from "../api/borrow-book.api";

// =============== QUERY HOOKS =============== //
// Hook to fetch all books data
export const useAllBooks = () => {
  const currentMembership = useUserStore((state) => state.currentMembership);
  const orgId = currentMembership?.organization._id;

  const { data, isLoading, fetchStatus, isFetching } = useQuery({
    queryKey: ["all-books", orgId],
    queryFn: fetchAllBooks,
    enabled: !!orgId && currentMembership?.role === "admin",
  });

  const books = data ?? [];
  return { data: books, isLoading, fetchStatus, isFetching };
};

// Hook to fetch available books
export const useAvailableBooks = () => {
  const currentMembership = useUserStore((state) => state.currentMembership);
  const orgId = currentMembership?.organization._id;

  const { data, isLoading, fetchStatus, isFetching } = useQuery({
    queryKey: ["available-books", orgId],
    queryFn: fetchAvailableBooks,
    enabled: !!orgId,
  });

  const availableBooks = data ?? [];
  return { data: availableBooks, isLoading, fetchStatus, isFetching };
};

// Hook to fetch borrow requests with optional status filter
export const useBorrowRequests = (status?: string | string[]) => {
  const currentMembership = useUserStore((state) => state.currentMembership);
  const orgId = currentMembership?.organization._id;

  // Support both string and array of statuses
  const statusParam = Array.isArray(status) ? status.join(",") : status;

  const { data, isLoading, fetchStatus, isFetching } = useQuery({
    queryKey: ["borrow-requests", orgId, statusParam],
    queryFn: () => getBorrowRequests(statusParam),
    enabled: !!orgId,
  });

  const requests = data ?? [];
  return { data: requests, isLoading, fetchStatus, isFetching };
};

// Hook to fetch user borrow requests by status
export const useUserBorrowRequests = (status?: string) => {
  const currentMembership = useUserStore((state) => state.currentMembership);
  const orgId = currentMembership?.organization._id;
  const userId = currentMembership?.user._id;

  const { data, isLoading, fetchStatus, isFetching } = useQuery({
    queryKey: ["user-borrow-requests", orgId, userId, status],
    queryFn: () => getUserBorrowRecordsByStatus(userId as string, status),
    enabled: !!orgId && !!userId,
  });

  const requests = data ?? [];
  return { data: requests, isLoading, fetchStatus, isFetching };
};

// =============== MUTATION HOOKS =============== //
// Hook to add a new book
export const useCreateBook = () => {
  return useMutation({
    mutationFn: addBook,
    onSuccess: (data) => {
      if (data) {
        toast.success(`Book "${data.title}" added successfully!`);
        // Invalidate relevant queries to refresh book lists
        queryClient.invalidateQueries({ queryKey: ["all-books"] });
        queryClient.invalidateQueries({ queryKey: ["available-books"] });
      } else {
        toast.error("Failed to add book: Organization not found.");
      }
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to add book. Try again."
      );
    },
  });
};

// Hook to update a book
export const useUpdateBook = () => {
  return useMutation({
    mutationFn: updateBook,
    onSuccess: (data) => {
      if (data) {
        toast.success(`Book "${data.title}" updated successfully!`);
        // Invalidate relevant queries to refresh book lists
        queryClient.invalidateQueries({ queryKey: ["all-books"] });
        queryClient.invalidateQueries({ queryKey: ["available-books"] });
      } else {
        toast.error("Failed to update book: Organization not found.");
      }
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update book. Try again."
      );
    },
  });
};

// Hook to delete a book
export const useDeleteBook = () => {
  return useMutation({
    mutationFn: (id: string) => deleteBook(id),
    onSuccess: () => {
      // Invalidate the books query so the UI updates
      queryClient.invalidateQueries({ queryKey: ["all-books"] });
      queryClient.invalidateQueries({ queryKey: ["available-books"] });
    },
  });
};

// Hook to create a borrow request
export const useCreateBorrowRequest = () => {
  return useMutation({
    mutationFn: (book: string) => createBorrowRequest(book),
    onSuccess: () => {
      toast.success("Borrow request created successfully!");
      // Invalidate borrow requests and user borrow requests/history
      queryClient.invalidateQueries({ queryKey: ["borrow-requests"] });
      queryClient.invalidateQueries({ queryKey: ["user-borrow-requests"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create borrow request. Try again."
      );
    },
  });
};

// Hook to cancel a borrow request
export const useCancelBorrowRequest = () => {
  return useMutation({
    mutationFn: (id: string) => cancelBorrowRequest(id),
    onSuccess: () => {
      toast.success("Borrow request canceled successfully!");
      // Invalidate borrow requests and user borrow requests/history
      queryClient.invalidateQueries({ queryKey: ["borrow-requests"] });
      queryClient.invalidateQueries({ queryKey: ["user-borrow-requests"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to cancel borrow request. Try again."
      );
    },
  });
};

// Hook to approve a borrow request
export const useApproveBorrowRequest = () => {
  return useMutation({
    mutationFn: (id: string) => approveBorrowRequest(id),
    onSuccess: () => {
      toast.success("Borrow request approved successfully!");
      // Invalidate borrow requests to refresh list
      queryClient.invalidateQueries({ queryKey: ["borrow-requests"] });
      queryClient.invalidateQueries({ queryKey: ["available-books"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to approve borrow request. Try again."
      );
    },
  });
};

// Hook to return a borrowed book
export const useReturnBook = () => {
  return useMutation({
    mutationFn: (id: string) => returnBookRequest(id),
    onSuccess: () => {
      toast.success("Book return requested!");
      queryClient.invalidateQueries({ queryKey: ["user-borrow-requests"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to request return. Try again."
      );
    },
  });
};

export const useApproveReturnBook = () => {
  return useMutation({
    mutationFn: (id: string) => approveReturnRequest(id),
    onSuccess: () => {
      toast.success("Book return approved successfully!");
      queryClient.invalidateQueries({ queryKey: ["borrow-requests"] });
      queryClient.invalidateQueries({ queryKey: ["user-borrow-requests"] });
      queryClient.invalidateQueries({ queryKey: ["available-books"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to approve book return. Try again."
      );
    },
  });
};
