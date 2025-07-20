import type { BorrowRecord } from "../types/book.type";
import axiosInstance from "./axios";

export const borrowBook = async (bookId: string): Promise<BorrowRecord[]> => {
  try {
    const response = await axiosInstance.post("/borrow-books/create", {
      bookId,
    });
    return response.data.borrowRecords ?? [];
  } catch (err: any) {
    if (err.response?.status === 404) return [];
    throw err;
  }
};

export const approveBorrowBook = async (bookId: string): Promise<BorrowRecord[]> => {
  try {
    const response = await axiosInstance.patch(`/borrow-books/${bookId}/approve`, {
      bookId,
    });
    return response.data.borrowRecords ?? [];
  } catch (err: any) {
    if (err.response?.status === 404) return [];
    throw err;
  }
};

export const fetchAllBorrowRecords = async (): Promise<BorrowRecord[]> => {
  try {
    const response = await axiosInstance.get("/borrow-books");
    return response.data.borrowRecords ?? [];
  } catch (err: any) {
    if (err.response?.status === 404) return [];
    throw err;
  }
};

export const fetchBorrowedBooks = async (): Promise<BorrowRecord[]> => {
  try {
    const response = await axiosInstance.get("/borrow-books?status=borrowed");
    return response.data.borrowRecords ?? [];
  } catch (err: any) {
    if (err.response?.status === 404) return [];
    throw err;
  }
};

export const fetchPendingBorrowRequest = async (): Promise<BorrowRecord[]> => {
  try {
    const response = await axiosInstance.get("/borrow-books?status=pending");
    return response.data.borrowRecords ?? [];
  } catch (err: any) {
    if (err.response?.status === 404) return [];
    throw err;
  }
};
