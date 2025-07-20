import type { Book } from "../types/book.type";
import axiosInstance from "./axios";

export const fetchAllBooks = async (): Promise<Book[]> => {
  try {
    const response = await axiosInstance.get("/books/all");
    return response.data.books ?? [];
  } catch (err: any) {
    if (err.response?.status === 404) return [];
    throw err;
  }
};

export const fetchAvailableBooks = async (): Promise<Book[]> => {
  try {
    const response = await axiosInstance.get("/books/available");
    return response.data.books ?? [];
  } catch (err: any) {
    if (err.response?.status === 404) return [];
    throw err;
  }
};

export const addBook = async (
  bookData: Partial<Book>
): Promise<Book | null> => {
  try {
    const response = await axiosInstance.post("/books/add", bookData);
    return response.data.book ?? null;
  } catch (err: any) {
    if (err.response?.status === 404) return null;
    throw err;
  }
};

export const updateBook = async (
  bookData: Partial<Book>
): Promise<Book | null> => {
  try {
    const response = await axiosInstance.put(
      `/books/${bookData._id}`,
      bookData
    );
    return response.data.book ?? null;
  } catch (err: any) {
    if (err.response?.status === 404) return null;
    throw err;
  }
};

export const deleteBook = async (_id: string): Promise<Book | null> => {
  try {
    const response = await axiosInstance.delete(`/books/${_id}`);
    return response.data.book ?? null;
  } catch (err: any) {
    if (err.response?.status === 404) return null;
    throw err;
  }
};