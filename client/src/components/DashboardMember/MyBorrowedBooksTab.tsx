import { BookOpen, CalendarClock, Loader } from "lucide-react";
import { useUserBorrowRequests, useReturnBook } from "../../hooks/useBook";

const MyBorrowedBooksTab = () => {
  const { data: borrowedBooks } = useUserBorrowRequests("borrowed");
  const { mutate: returnBook, variables: returningId } = useReturnBook();

  return (
    <div className="py-8 px-6 sm:py-14 sm:px-6 w-full max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1>My borrowed books</h1>
          <p className="text-sm text-gray-500">
            Keep an eye on the books you have out and their return dates.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-tsec">
          <CalendarClock size={17} />
          <span>{borrowedBooks?.length ?? 0} currently on your shelf</span>
        </div>
      </div>

      <div className="app-panel p-4 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold">Currently reading</h2>
          <span className="text-xs text-gray-500">
            Return a title when you’re finished
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] text-sm text-left table-fixed">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="py-2 pr-4 w-1/4">Title</th>
                <th className="py-2 pr-4 w-1/6">Status</th>
                <th className="py-2 pr-4 w-1/5">Borrow Date</th>
                <th className="py-2 pr-4 w-1/5">Due Date</th>
                <th className="py-2 pr-4 w-1/6">Action</th>
              </tr>
            </thead>
            <tbody>
              {borrowedBooks?.length ? (
                borrowedBooks.map((item) => (
                  <tr key={item._id} className="border-b text-gray-700">
                    <td className="py-4 pr-4 flex items-center gap-2 truncate max-w-[10rem]">
                      <BookOpen className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{item.book.title}</span>
                    </td>
                    <td className="py-4 pr-4 capitalize">
                      <span
                        className={`px-2 py-1 text-xs rounded font-medium ${
                          item.status === "borrowed"
                            ? "bg-green-100 text-green-700"
                            : item.status === "pending-return"
                              ? "bg-yellow-100 text-yellow-700"
                              : item.status === "returned"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 pr-4 truncate max-w-[8rem]">
                      {item.borrowDate
                        ? new Date(item.borrowDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="py-4 pr-4 truncate max-w-[8rem]">
                      {item.dueDate
                        ? new Date(item.dueDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="py-4 pr-4">
                      {item.status === "borrowed" ? (
                        <button
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 text-xs"
                          disabled={returningId === item._id}
                          onClick={() => returnBook(item._id)}
                        >
                          {returningId === item._id ? (
                            <div className="flex items-center justify-center gap-1">
                              <Loader className="w-3 h-3 animate-spin" />{" "}
                              <p>Returning</p>
                            </div>
                          ) : (
                            "Return"
                          )}
                        </button>
                      ) : item.status === "pending-return" ? (
                        <span className="text-yellow-500 text-xs">
                          Pending Return
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-gray-400 py-4">
                    Your borrowed books will appear here.
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

export default MyBorrowedBooksTab;
