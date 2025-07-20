import { BookOpen } from "lucide-react";
import { useAvailableBooks } from "../../hooks/useBook";
import { useState } from "react";

const BrowseBooksTab = () => {
  const { data: books } = useAvailableBooks();
  const [search, setSearch] = useState("");

  const filteredBooks = books?.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-14 px-14 w-full space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Browse Books</h1>
        <p className="text-sm text-gray-500">
          View and request books available in your organization.
        </p>
      </div>

      <div className="bg-[#fffcf8] rounded-xl shadow border p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Available Books
          </h2>
          <input
            type="text"
            placeholder="Search books..."
            className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-sec"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
                <th className="py-2 pr-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks && filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <tr key={book._id} className="border-b text-gray-700">
                    <td className="py-4 pr-4 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      {book.title}
                    </td>
                    <td className="py-4 pr-4">{book.author}</td>
                    <td className="py-4 pr-4">{book.genre}</td>
                    <td className="py-4 pr-4">
                      <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">
                        Available
                      </span>
                    </td>
                    <td className="py-4 pr-4">
                      <button
                        className="text-sm text-sec hover:underline"
                        onClick={() => {
                          // TODO: trigger borrow modal or request mutation
                          console.log("Request book:", book.title);
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
