import { BookOpen } from "lucide-react";
import { useUserBorrowRequests, useReturnBook } from "../../hooks/useBook";

const MyBorrowedBooksTab = () => {
  const { data: borrowedBooks } = useUserBorrowRequests("borrowed");

  const { mutate: returnBook, variables: returningId } = useReturnBook();

  return (
    <div className="py-14 px-14 w-full space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">My Borrowed Books</h1>

      <div className="bg-[#fffcf8] rounded-xl shadow border p-6">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="py-2 pr-4">Title</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Borrow Date</th>
              <th className="py-2 pr-4">Due Date</th>
              <th className="py-2 pr-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks?.length ? (
              borrowedBooks.map((item) => (
                <tr key={item._id} className="border-b text-gray-700">
                  <td className="py-4 pr-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    {item.book.title}
                  </td>
                  <td className="py-4 pr-4 capitalize">{item.status}</td>
                  <td className="py-4 pr-4">
                    {item.borrowDate
                      ? new Date(item.borrowDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="py-4 pr-4">
                    {item.dueDate
                      ? new Date(item.dueDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="py-4 pr-4">
                    {item.status === "borrowed" ? (
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                        disabled={returningId === item._id}
                        onClick={() => returnBook(item._id)}
                      >
                        {returningId === item._id ? "Returning..." : "Return"}
                      </button>
                    ) : item.status === "pending-return" ? (
                      <span className="text-yellow-500">Pending Return</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-gray-400 py-4">
                  You haven’t borrowed any books yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBorrowedBooksTab;
