import { BookOpen, Plus, MoreVertical, Edit, Trash } from "lucide-react";
import { Menu } from "@headlessui/react";
import { useState } from "react";
import BookModal from "../modals/BookModal";
// import { useUserStore } from "../stores/useUserStore";
import {
  useAllBooks,
  useCreateBook,
  useDeleteBook,
  useUpdateBook,
} from "../../hooks/useBook";
import type { AddBookPayload, UpdateBookPayload } from "../../types/book.type";

const BooksTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedBook, setSelectedBook] = useState<any | null>(null);

  // const currentMembership = useUserStore((s) => s.currentMembership);
  const { data: books } = useAllBooks();
  const createBookMutation = useCreateBook();
  const updateBookMutation = useUpdateBook();
  const deleteBookMutation = useDeleteBook();

  const handleAddClick = () => {
    setSelectedBook({
      title: "",
      author: "",
      isbn: "",
      publishedYear: 0,
      totalCopies: 0,
      availableCopies: 0,
      genre: "",
    });
    setModalMode("create");
    setIsModalOpen(true);
  };

  const handleEditClick = (book: UpdateBookPayload) => {
    setSelectedBook(book);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleDeleteBook = (id: string) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      deleteBookMutation.mutate(id);
    }
  };

  const handleSubmit = (data: AddBookPayload, mode: "create" | "edit") => {
    if (mode === "create") {
      createBookMutation.mutate(data);
    } else {
      updateBookMutation.mutate({ ...data, _id: selectedBook._id });
    }
    setIsModalOpen(false); // close modal after submission
  };

  return (
    <div className="flex justify-center items-center">
      <div className="py-8 px-6 sm:py-14 sm:px-6 space-y-8 w-full max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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

        <div className="bg-[#fffcf8] rounded-xl shadow border p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <h2 className="text-lg font-semibold text-gray-800">All Books</h2>
            <input
              type="text"
              placeholder="Search books..."
              className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-sec w-full sm:w-auto"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] text-sm text-left table-fixed">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="py-2 pr-4 w-1/4">Title</th>
                  <th className="py-2 pr-4 w-1/5">Author</th>
                  <th className="py-2 pr-4 w-1/5">Genre</th>
                  <th className="py-2 pr-4 w-1/6">Status</th>
                  <th className="py-2 pr-4 w-1/6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books && books.length > 0 ? (
                  (books ?? []).map((book) => (
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
                      <td className="py-4 pr-4 text-right">
                        <Menu
                          as="div"
                          className="relative inline-block text-left"
                        >
                          <Menu.Button className="p-1 text-gray-500 hover:text-gray-700">
                            <MoreVertical className="w-4 h-4" />
                          </Menu.Button>
                          <Menu.Items className="absolute right-0 mt-2 w-32 bg-white rounded shadow z-10">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() =>
                                    handleEditClick({ ...book, id: book._id })
                                  }
                                  className={`w-full text-left px-4 py-2 text-sm ${
                                    active ? "bg-gray-300" : ""
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <Edit className="w-4 h-4" />
                                    Edit
                                  </div>
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => handleDeleteBook(book._id)}
                                  className={`w-full text-left px-4 py-2 text-sm text-red-600 ${
                                    active ? "bg-gray-300" : ""
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <Trash className="w-4 h-4" />
                                    Delete
                                  </div>
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Menu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-gray-400">
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
        initialData={selectedBook}
      />
    </div>
  );
};

export default BooksTab;
