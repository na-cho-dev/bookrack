import { Clock, CheckCircle } from "lucide-react";
import { useBorrowRequests, useApproveReturnBook } from "../../hooks/useBook";

const BorrowedBooksTab = () => {
  const { data: borrowedBooks } = useBorrowRequests([
    "borrowed",
    "pending-return",
  ]);
  const { mutate: approveReturn, variables: approvingId } =
    useApproveReturnBook();

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
                  <th className="py-2 pr-4">User</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Borrowed</th>
                  <th className="py-2 pr-4">Due</th>
                  <th className="py-2 pr-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {borrowedBooks.length ? (
                  borrowedBooks.map((item) => (
                    <tr key={item._id} className="border-b text-gray-700">
                      <td className="py-4 pr-4">{item.book.title}</td>
                      <td className="py-4 pr-4">{item.user?.name}</td>
                      <td className="py-4 pr-4 capitalize">
                        {item.status === "pending-return" ? (
                          <span className="flex items-center gap-1 text-yellow-700 text-xs font-medium bg-yellow-100 px-2 py-2 rounded w-fit">
                            <Clock className="w-3 h-3" /> Pending Return
                          </span>
                        ) : item.status === "borrowed" ? (
                          <span className="flex items-center gap-1 text-green-700 text-xs font-medium bg-green-100 px-2 py-2 rounded w-fit">
                            <CheckCircle className="w-3 h-3" /> Borrowed
                          </span>
                        ) : (
                          <span className="capitalize">{item.status}</span>
                        )}
                      </td>
                      <td className="py-4 pr-4">
                        {item.borrowDate
                          ? new Date(item.borrowDate).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="py-4 pr-4">
                        {item.dueDate
                          ? new Date(item.dueDate).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="py-4 pr-4">
                        {item.status === "pending-return" && (
                          <button
                            className={`px-3 py-2 rounded bg-green-600 text-white text-xs font-semibold hover:bg-green-700 transition disabled:opacity-60`}
                            disabled={approvingId === item._id}
                            onClick={() => approveReturn(item._id)}
                          >
                            {approvingId === item._id
                              ? "Approving..."
                              : "Approve Return"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-4 text-center text-gray-500">
                      No borrowed books found.
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
