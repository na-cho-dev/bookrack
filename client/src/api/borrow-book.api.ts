import type { BorrowRecord } from "../types/book.type";
import axiosInstance from "./axios";

export const createBorrowRequest = async (
  book: string
): Promise<BorrowRecord> => {
  const response = await axiosInstance.post("/borrow-books/create", {
    book,
  });

  return response.data;
};

export const getBorrowRequests = async (
  status?: string
): Promise<BorrowRecord[]> => {
  try {
    const response = await axiosInstance.get("/borrow-books", {
      params: { status },
    });
    return response.data.data ?? [];
  } catch (err: any) {
    if (err.response?.status === 404) return [];
    throw err;
  }
};

export const getUserBorrowRecordsByStatus = async (
  userId: string,
  status?: string
): Promise<BorrowRecord[]> => {
  try {
    const response = await axiosInstance.get(
      `/borrow-books/user/${userId}/status`,
      {
        params: { status },
      }
    );

    return response.data.data ?? [];
  } catch (err: any) {
    if (err.response?.status === 404) return [];
    throw err;
  }
};

export const cancelBorrowRequest = async (
  id: string
): Promise<BorrowRecord | null> => {
  try {
    const response = await axiosInstance.patch(`/borrow-books/${id}/cancel`);
    return response.data.data;
  } catch (err: any) {
    if (err.response?.status === 404) return null;
    throw err;
  }
};

export const approveBorrowRequest = async (
  bookId: string
): Promise<BorrowRecord[]> => {
  try {
    const response = await axiosInstance.patch(
      `/borrow-books/${bookId}/approve`,
      {
        bookId,
      }
    );
    return response.data.data ?? [];
  } catch (err: any) {
    if (err.response?.status === 404) return [];
    throw err;
  }
};

export const returnBookRequest = async (id: string): Promise<BorrowRecord> => {
  const response = await axiosInstance.patch(`/borrow-books/return/${id}`);
  return response.data.data;
};

export const approveReturnRequest = async (
  id: string
): Promise<BorrowRecord> => {
  const response = await axiosInstance.patch(
    `/borrow-books/return/${id}/approve`
  );
  return response.data.data;
};
