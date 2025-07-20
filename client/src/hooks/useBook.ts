import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addBook,
  deleteBook,
  fetchAllBooks,
  fetchAvailableBooks,
  updateBook,
} from "../api/book.api";
import {
  fetchBorrowedBooks,
  fetchPendingBorrowRequest,
} from "../api/borrow-book.api";
import { useUserStore } from "../stores/useUserStore";
import toast from "react-hot-toast";
import { queryClient } from "../utils/queryClient";

// Hook to fetch all books data
export const useAllBooks = () => {
  const currentMembership = useUserStore((state) => state.currentMembership);
  const orgId = currentMembership?.organization._id;

  const { data, isLoading } = useQuery({
    queryKey: ["all-books", orgId],
    queryFn: fetchAllBooks,
    enabled: !!orgId && currentMembership?.role === "admin",
  });

  const books = data ?? [];
  return { data: books, isLoading };
};

// Hook to fetch available books
export const useAvailableBooks = () => {
  const currentMembership = useUserStore((state) => state.currentMembership);
  const orgId = currentMembership?.organization._id;

  const { data, isLoading } = useQuery({
    queryKey: ["available-books", orgId],
    queryFn: fetchAvailableBooks,
    enabled: !!orgId,
  });

  const availableBooks = data ?? [];
  return { data: availableBooks, isLoading };
};

// Hook to fetch borrowed books
export const useBorrowedBooks = () => {
  const currentMembership = useUserStore((state) => state.currentMembership);
  const orgId = currentMembership?.organization._id;

  const { data, isLoading } = useQuery({
    queryKey: ["borrowed-books", orgId],
    queryFn: fetchBorrowedBooks,
    enabled: !!orgId && currentMembership?.role === "admin",
  });

  const borrowed = data ?? [];
  return { data: borrowed, isLoading };
};

// Hook to fetch pending borrow request
export const usePendingBorrowRequests = () => {
  const currentMembership = useUserStore((state) => state.currentMembership);
  const orgId = currentMembership?.organization._id;

  const { data, isLoading } = useQuery({
    queryKey: ["pending-borrow-requests", orgId],
    queryFn: fetchPendingBorrowRequest,
    enabled: !!orgId && currentMembership?.role === "admin",
  });

  const pending = data ?? [];
  return { data: pending, isLoading };
};

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
