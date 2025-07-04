import { BookOpen, Plus } from "lucide-react";
import { useState } from "react";
import BookModal from "./modals/BookModal";
// import { useUserStore } from "../stores/useUserStore";
import { useAllBooks } from "../hooks/useBook";

const BooksTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedBook, setSelectedBook] = useState<any | null>(null);

  // const currentMembership = useUserStore((s) => s.currentMembership);
  const { data: books } = useAllBooks();

  const handleAddClick = () => {
    setSelectedBook(null);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const handleEditClick = (book: any) => {
    setSelectedBook(book);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleSubmit = (data: any, mode: "create" | "edit") => {
    if (mode === "create") {
      console.log("Create Book:", data);
    } else {
      console.log("Update Book:", data);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="py-14 px-14 space-y-8 w-full">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Books Management
            </h1>
            <p className="text-sm text-gray-500">
              Manage all books in your organization.
            </p>
          </div>
          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 bg-sec text-white px-4 py-2 rounded-md shadow hover:bg-opacity-90 text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Book
          </button>
        </div>

        <div className="bg-[#fffcf8] rounded-xl shadow border p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">All Books</h2>
            <input
              type="text"
              placeholder="Search books..."
              className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-sec"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="py-2 pr-4">Title</th>
                  <th className="py-2 pr-4">Author</th>
                  <th className="py-2 pr-4">Genre</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books && books.length > 0 ? (
                  (books ?? []).map((book) => (
                    <tr key={book.isbn} className="border-b text-gray-700">
                      <td className="py-4 pr-4 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        {book.title}
                      </td>
                      <td className="py-4 pr-4">{book.author}</td>
                      <td className="py-4 pr-4">{book.genre}</td>
                      <td className="py-4 pr-4">
                        <span
                          className={`${
                            book.availableCopies > 0
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          } text-xs font-medium px-2 py-1 rounded`}
                        >
                          {book.availableCopies > 0 ? "Available" : "Borrowed"}
                        </span>
                      </td>
                      <td className="py-4 pr-4">
                        <button
                          onClick={() => handleEditClick(book)}
                          className="text-sm text-sec hover:underline"
                        >
                          Edit
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

      <BookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        mode={modalMode}
        initialData={selectedBook || undefined}
      />
    </div>
  );
};

export default BooksTab;
