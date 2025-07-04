// import { create } from "zustand";
// import type { BookState } from "../types/book.type";

// export const useBookStore = create<BookState>((set) => ({
//   error: null,
//   loadingAllBooks: false,
//   loadingAvailableBooks: false,
//   loadingBorrowedBooks: false,
//   loadingPendingBorrowRequests: false,

//   allBooks: [],
//   availableBooks: [],
//   borrowedBooks: [],
//   pendingBorrowRequests: [],

//   setLoadingAllBooks: (loading) => set({ loadingAllBooks: loading }),
//   setLoadingAvailableBooks: (loading) =>
//     set({ loadingAvailableBooks: loading }),
//   setLoadingBorrowedBooks: (loading) => set({ loadingBorrowedBooks: loading }),
//   setLoadingPendingBorrowRequests: (loading) =>
//     set({ loadingPendingBorrowRequests: loading }),

//   setAllBooks: (allBooks) => set({ allBooks }),
//   setAvailableBooks: (availableBooks) => set({ availableBooks }),
//   setBorrowedBooks: (borrowedBooks) => set({ borrowedBooks }),
//   setPendingBorrowRequests: (pendingRequests) =>
//     set({ pendingBorrowRequests: pendingRequests }),
// }));
