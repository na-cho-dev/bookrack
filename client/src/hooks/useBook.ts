import { useQuery } from "@tanstack/react-query";
import { fetchAllBooks, fetchAvailableBooks } from "../api/book.api";
import {
  fetchBorrowedBooks,
  fetchPendingBorrowRequest,
} from "../api/borrow-book.api";
import { useUserStore } from "../stores/useUserStore";

export const useAllBooks = () => {
  const orgId = useUserStore(
    (state) => state.currentMembership?.organization._id
  );

  const { data, isLoading } = useQuery({
    queryKey: ["all-books", orgId],
    queryFn: fetchAllBooks,
    enabled: !!orgId,
  });

  const books = data ?? [];

  // console.log("All Books Data:", books);
  return { data: books, isLoading };
};

export const useAvailableBooks = () => {
  const orgId = useUserStore(
    (state) => state.currentMembership?.organization._id
  );

  const { data, isLoading } = useQuery({
    queryKey: ["available-books", orgId],
    queryFn: fetchAvailableBooks,
    enabled: !!orgId,
  });

  const availableBooks = data ?? [];

  // console.log("Available Books Data:", availableBooks);
  return { data: availableBooks, isLoading };
};

export const useBorrowedBooks = () => {
  const orgId = useUserStore(
    (state) => state.currentMembership?.organization._id
  );

  const { data, isLoading } = useQuery({
    queryKey: ["borrowed-books", orgId],
    queryFn: fetchBorrowedBooks,
    enabled: !!orgId,
  });

  const borrowed = data ?? [];

  // console.log("Borrowed Books Data:", borrowed);
  return { data: borrowed, isLoading };
};

export const usePendingBorrowRequests = () => {
  const orgId = useUserStore(
    (state) => state.currentMembership?.organization._id
  );

  const { data, isLoading } = useQuery({
    queryKey: ["pending-borrow-requests", orgId],
    queryFn: fetchPendingBorrowRequest,
    enabled: !!orgId,
  });

  const pending = data ?? [];

  // console.log("Pending Borrow Requests Data:", pending);
  return { data: pending, isLoading };
};

// export const useCreateBook = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     // mutationFn: createBook,
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["books"] }),
//   });
// };

// export const useUpdateBook = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     // mutationFn: updateBook,
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["books"] }),
//   });
// };
