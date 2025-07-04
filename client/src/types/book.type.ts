import type { Organization, User } from "./auth.type";

// export interface BookState {
//   error: string | null;
//   loadingAllBooks: boolean;
//   loadingAvailableBooks: boolean;
//   loadingBorrowedBooks: boolean;
//   loadingPendingBorrowRequests: boolean;

//   allBooks: Book[];
//   availableBooks: Book[];
//   borrowedBooks: BorrowRecord[];
//   pendingBorrowRequests: BorrowRecord[];

//   setLoadingAllBooks: (val: boolean) => void;
//   setLoadingAvailableBooks: (val: boolean) => void;
//   setLoadingBorrowedBooks: (val: boolean) => void;
//   setLoadingPendingBorrowRequests: (val: boolean) => void;

//   setAllBooks: (books: Book[]) => void;
//   setAvailableBooks: (availableBooks: Book[]) => void;
//   setBorrowedBooks: (borrowedBooks: BorrowRecord[]) => void;
//   setPendingBorrowRequests: (pendingRequests: BorrowRecord[]) => void;
// }

export interface Book {
  _id: string;
  isbn: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  totalCopies: number;
  availableCopies: number;
  organization: Organization;
}

export interface AddBookPayload {
  isbn: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  totalCopies: number;
  availableCopies: number;
  organization: Organization;
}

export interface UpdateBookPayload extends Partial<AddBookPayload> {
  id: string;
}
export type BorrowStatus = "borrowed" | "pending" | "returned";

export type BorrowRecord = {
  _id: string;
  user: User;
  book: Book;
  borrowDate: string;
  dueDate: string;
  status: BorrowStatus;
};
