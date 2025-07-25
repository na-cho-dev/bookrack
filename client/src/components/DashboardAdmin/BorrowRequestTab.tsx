import { User, BookOpen, Clock3 } from "lucide-react";
import {
  useApproveBorrowRequest,
  useBorrowRequests,
} from "../../hooks/useBook";

const BorrowRequestsTab = () => {
  const { data: borrowRequests } = useBorrowRequests("pending");
  const approveMutation = useApproveBorrowRequest();

  return (
    <div className="flex justify-center items-center">
      <div className="py-8 px-6 sm:py-14 sm:px-14 space-y-8 w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Borrow Requests
            </h1>
            <p className="text-sm text-gray-500">
              Manage pending borrow requests from users.
            </p>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-[#fffcf8] rounded-xl shadow border p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Pending Requests
            </h2>
            <input
              type="text"
              placeholder="Search requests..."
              className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-sec w-full sm:w-auto"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] text-sm text-left table-fixed">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="py-2 pr-4 w-1/4">User</th>
                  <th className="py-2 pr-4 w-1/4">Book</th>
                  <th className="py-2 pr-4 w-1/4">Requested At</th>
                  <th className="py-2 pr-4 w-1/6">Action</th>
                </tr>
              </thead>
              <tbody>
                {borrowRequests && borrowRequests.length > 0 ? (
                  borrowRequests.map((book) => (
                    <tr key={book._id} className="border-b text-gray-700">
                      <td className="py-4 pr-4 truncate max-w-[10rem]">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="truncate">{book.user.name}</span>
                        </div>
                      </td>
                      <td className="py-4 pr-4 truncate max-w-[10rem]">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-gray-400" />
                          <span className="truncate">{book.book.title}</span>
                        </div>
                      </td>
                      <td className="py-4 pr-4 truncate max-w-[10rem]">
                        <div className="flex items-center gap-2">
                          <Clock3 className="w-4 h-4 text-gray-400" />
                          <span className="truncate">
                            {new Date(book.requestedAt).toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 pr-4 space-x-2">
                        <button
                          className="px-3 py-1 text-xs rounded-md bg-green-100 text-green-700 hover:bg-green-200"
                          onClick={() => approveMutation.mutate(book._id)}
                        >
                          Approve
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-gray-400">
                      No Current Borrow Request
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

export default BorrowRequestsTab;
