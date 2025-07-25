import { BookOpen } from "lucide-react";
import { useAvailableBooks, useCreateBorrowRequest } from "../../hooks/useBook";
import { useState } from "react";

const BrowseBooksTab = () => {
  const { data: books } = useAvailableBooks();
  const [search, setSearch] = useState("");
  const createBorrowRequestMutation = useCreateBorrowRequest();

  const filteredBooks = books?.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-8 px-6 sm:py-14 sm:px-6 w-full max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Browse Books</h1>
        <p className="text-sm text-gray-500">
          View and request books available in your organization.
        </p>
      </div>

      <div className="bg-[#fffcf8] rounded-xl shadow border p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Available Books
          </h2>
          <input
            type="text"
            placeholder="Search books..."
            className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-sec w-full sm:w-auto"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] text-sm text-left table-fixed">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="py-2 pr-4 w-1/4">Title</th>
                <th className="py-2 pr-4 w-1/5">Author</th>
                <th className="py-2 pr-4 w-1/5">Genre</th>
                <th className="py-2 pr-4 w-1/6">Status</th>
                <th className="py-2 pr-4 w-1/6">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks && filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <tr key={book._id} className="border-b text-gray-700">
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
                      <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">
                        Available
                      </span>
                    </td>
                    <td className="py-4 pr-4">
                      <button
                        className="text-sm text-sec hover:underline"
                        onClick={() => {
                          createBorrowRequestMutation.mutate(book._id);
                        }}
                      >
                        Request
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-400">
                    No available books found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BrowseBooksTab;
