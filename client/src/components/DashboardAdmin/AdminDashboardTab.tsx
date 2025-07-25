import { BookOpen, CheckCircle, Clock, Archive, User } from "lucide-react";
import { useUserStore } from "../../stores/useUserStore";
import {
  useAllBooks,
  useAvailableBooks,
  useBorrowRequests,
} from "../../hooks/useBook";
import { Link } from "react-router-dom";

const AdminDashboardTab = () => {
  const user = useUserStore((state) => state.user);
  const currentMembership = useUserStore((s) => s.currentMembership);

  const { data: allBooks } = useAllBooks();
  const { data: availableBooks } = useAvailableBooks();
  const { data: borrowedBooks } = useBorrowRequests("borrowed");
  const { data: pendingRequests } = useBorrowRequests("pending");

  const stats = {
    totalBooks: allBooks?.length ?? 0,
    availableBooks: availableBooks?.length ?? 0,
    borrowedBooks: borrowedBooks?.length ?? 0,
    pendingRequests: pendingRequests?.length ?? 0,
  };

  return (
    <div className="flex justify-center items-center">
      <div className="py-14 px-6 space-y-8 w-full">
        {/* Welcome Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back,{" "}
            <span className="text-sec">{user?.name ?? "Admin"}</span>
          </h1>
          <p className="text-gray-500 text-sm">
            Organization: {currentMembership?.organization.name ?? "Loading..."}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#fffcf8] p-5 rounded-xl shadow border flex gap-4 items-center">
            <BookOpen className="text-sec w-8 h-8" />
            <div>
              <p className="text-sm text-gray-500">Total Books</p>
              <p className="text-xl font-bold">{stats.totalBooks}</p>
            </div>
          </div>
          <div className="bg-[#fffcf8] p-5 rounded-xl shadow border flex gap-4 items-center">
            <CheckCircle className="text-green-500 w-8 h-8" />
            <div>
              <p className="text-sm text-gray-500">Available</p>
              <p className="text-xl font-bold">{stats.availableBooks}</p>
            </div>
          </div>
          <div className="bg-[#fffcf8] p-5 rounded-xl shadow border flex gap-4 items-center">
            <Archive className="text-yellow-600 w-8 h-8" />
            <div>
              <p className="text-sm text-gray-500">Borrowed</p>
              <p className="text-xl font-bold">{stats.borrowedBooks}</p>
            </div>
          </div>
          <div className="bg-[#fffcf8] p-5 rounded-xl shadow border flex gap-4 items-center">
            <Clock className="text-red-500 w-8 h-8" />
            <div>
              <p className="text-sm text-gray-500">Pending Requests</p>
              <p className="text-xl font-bold">{stats.pendingRequests}</p>
            </div>
          </div>
        </div>

        {/* Recent Borrow Requests */}
        <div className="bg-[#fffcf8] rounded-xl shadow border p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Borrow Requests
            </h2>
            <Link
              to="/dashboard/admin?tab=requests"
              className="text-sm text-sec hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] text-sm text-left table-fixed">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="py-2 pr-4 w-1/4">User</th>
                  <th className="py-2 pr-4 w-1/4">Book</th>
                  <th className="py-2 pr-4 w-1/6">Status</th>
                  <th className="py-2 pr-4 w-1/4">Requested At</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests && pendingRequests.length > 0 ? (
                  pendingRequests.map((req) => (
                    <tr key={req._id} className="border-b text-gray-700">
                      <td className="py-4 pr-4 flex items-center gap-2 truncate max-w-[10rem]">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="truncate">
                          {req.user.name ?? "Unknown"}
                        </span>
                      </td>
                      <td className="py-4 pr-4 truncate max-w-[10rem]">
                        {req.book?.title ?? "Unknown"}
                      </td>
                      <td className="py-4 pr-4">
                        <span
                          className={`px-2 py-1 text-xs rounded font-medium ${
                            req.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : req.status === "borrowed"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="py-4 pr-4 truncate max-w-[8rem]">
                        {new Date(req.requestedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-gray-400">
                      No recent requests
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

export default AdminDashboardTab;
