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
      <div className="py-8 px-6 sm:py-14 sm:px-14 space-y-8 w-full max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Available Books
            </h1>
            <p className="text-sm text-gray-500">
              View and manage books that are currently available.
            </p>
          </div>
        </div>

        <div className="bg-[#fffcf8] rounded-xl shadow border p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <h2 className="text-lg font-semibold text-gray-800">In Stock</h2>
            <input
              type="text"
              placeholder="Search available books..."
              className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-sec w-full sm:w-auto"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] text-sm text-left table-fixed">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="py-2 pr-4 w-1/3">Title</th>
                  <th className="py-2 pr-4 w-1/4">Author</th>
                  <th className="py-2 pr-4 w-1/4">Category</th>
                  <th className="py-2 pr-4 w-1/6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {availableBooks && availableBooks.length > 0 ? (
                  availableBooks.map((book) => (
                    <tr key={book.isbn} className="border-b text-gray-700">
                      <td className="py-4 pr-4 flex items-center gap-2 truncate max-w-[10rem]">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        <span className="truncate">{book.title}</span>
                      </td>
                      <td className="py-4 pr-4 truncate max-w-[8rem]">
                        {book.author}
                      </td>
                      <td className="py-4 pr-4 truncate max-w-[8rem]">
                        {book.genre}
                      </td>
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
