import { BookOpen, User2, CalendarCheck } from "lucide-react";
import { useBorrowedBooks } from "../hooks/useBook";

const BorrowedBooksTab = () => {
  const { data: borrowedBooks } = useBorrowedBooks();

  return (
    <div className="flex justify-center items-center">
      <div className="py-14 px-14 space-y-8 w-full">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Borrowed Books</h1>
            <p className="text-sm text-gray-500">
              Track all currently borrowed books by users.
            </p>
          </div>
        </div>

        {/* Borrowed Books Table */}
        <div className="bg-[#fffcf8] rounded-xl shadow border p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Borrowed List
            </h2>
            <input
              type="text"
              placeholder="Search borrowed books..."
              className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-sec"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="py-2 pr-4">Book</th>
                  <th className="py-2 pr-4">Borrowed By</th>
                  <th className="py-2 pr-4">Borrowed On</th>
                  <th className="py-2 pr-4">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {borrowedBooks && borrowedBooks.length > 0 ? (
                  borrowedBooks.map((book) => (
                    <tr key={book._id} className="border-b text-gray-700">
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-gray-400" />
                          {book.book.title}
                        </div>
                      </td>
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-2">
                          <User2 className="w-4 h-4 text-gray-400" />
                          {book.user.name}
                        </div>
                      </td>
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-2">
                          <CalendarCheck className="w-4 h-4 text-gray-400" />
                          {new Date(book.borrowDate).toLocaleString()}
                        </div>
                      </td>
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-2">
                          <CalendarCheck className="w-4 h-4 text-gray-400" />
                          {new Date(book.dueDate).toLocaleString()}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-gray-400">
                      No Books Borrowed Yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowedBooksTab;
