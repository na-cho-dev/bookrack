import type { Organization, User } from "./auth.type";

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
}

export interface UpdateBookPayload extends Partial<AddBookPayload> {
  id: string;
}
export type BorrowStatus =
  "pending" | "canceled" | "borrowed" | "pending-return" | "returned";

export type BorrowRecord = {
  _id: string;
  user: User;
  book: Book;
  requestedAt: Date;
  status: BorrowStatus;
  dueDate?: Date;
  borrowDate?: Date;
  returnDate?: Date;
};
