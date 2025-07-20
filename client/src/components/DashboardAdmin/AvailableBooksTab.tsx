import { BookOpen, Eye } from "lucide-react";
import { useState } from "react";
import BookViewModal from "../modals/BookViewModal";
import type { Book } from "../../types/book.type";
import { useAvailableBooks } from "../../hooks/useBook";

const AvailableBooksTab = () => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const { data: availableBooks } = useAvailableBooks();

  const handleView = (availableBooks: Book) => {
    setSelectedBook(availableBooks);
    setViewModalOpen(true);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="py-14 px-14 space-y-8 w-full">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Available Books
            </h1>
            <p className="text-sm text-gray-500">
              View and manage books that are currently available.
            </p>
          </div>
        </div>

        <div className="bg-[#fffcf8] rounded-xl shadow border p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">In Stock</h2>
            <input
              type="text"
              placeholder="Search available books..."
              className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-sec"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="py-2 pr-4">Title</th>
                  <th className="py-2 pr-4">Author</th>
                  <th className="py-2 pr-4">Category</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {availableBooks && availableBooks.length > 0 ? (
                  availableBooks.map((book) => (
                    <tr key={book.isbn} className="border-b text-gray-700">
                      <td className="py-4 pr-4 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        {book.title}
                      </td>
                      <td className="py-4 pr-4">{book.author}</td>
                      <td className="py-4 pr-4">{book.genre}</td>
                      <td className="py-4 pr-4">
                        <button
                          onClick={() => handleView(book)}
                          className="flex items-center gap-1 text-sec text-sm hover:underline"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-gray-400">
                      No Books Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <BookViewModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        book={selectedBook}
      />
    </div>
  );
};

export default AvailableBooksTab;
