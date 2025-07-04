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
