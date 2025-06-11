import { useState } from "react";
import { BookOpen, CheckCircle, Clock, Archive, User } from "lucide-react";
import { useUserStore } from "../../stores/useUserStore";

interface Stats {
  totalBooks: number;
  availableBooks: number;
  borrowedBooks: number;
  pendingRequests: number;
}

interface BorrowRequest {
  _id: string;
  bookTitle: string;
  userName: string;
  status: "pending" | "approved" | "rejected";
  requestedAt: string;
}

const AdminDashboardTab = () => {
  const user = useUserStore((state) => state.user);
  const currentMembership = useUserStore((s) => s.currentMembership);

  const [stats, setStats] = useState<Stats>({
    totalBooks: 0,
    availableBooks: 0,
    borrowedBooks: 0,
    pendingRequests: 0,
  });

  const [borrowRequests, setBorrowRequests] = useState<BorrowRequest[]>([]);

  return (
    <div className="flex justify-center items-center">
      <div className="py-14 px-14 space-y-8 w-full">
        {/* Welcome Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back,{" "}
            <span className="text-sec">{user?.name ?? "Admin"}</span>
          </h1>
          <p className="text-gray-500 text-sm">
            Organization: {currentMembership?.organization.name}
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
          <div className="bg-[#fffcf8]  p-5 rounded-xl shadow border flex gap-4 items-center">
            <CheckCircle className="text-green-500 w-8 h-8" />
            <div>
              <p className="text-sm text-gray-500">Available</p>
              <p className="text-xl font-bold">{stats.availableBooks}</p>
            </div>
          </div>
          <div className="bg-[#fffcf8]  p-5 rounded-xl shadow border flex gap-4 items-center">
            <Archive className="text-yellow-600 w-8 h-8" />
            <div>
              <p className="text-sm text-gray-500">Borrowed</p>
              <p className="text-xl font-bold">{stats.borrowedBooks}</p>
            </div>
          </div>
          <div className="bg-[#fffcf8]  p-5 rounded-xl shadow border flex gap-4 items-center">
            <Clock className="text-red-500 w-8 h-8" />
            <div>
              <p className="text-sm text-gray-500">Pending Requests</p>
              <p className="text-xl font-bold">{stats.pendingRequests}</p>
            </div>
          </div>
        </div>

        {/* Recent Borrow Requests */}
        <div className="bg-[#fffcf8]  rounded-xl shadow border p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Borrow Requests
            </h2>
            <a
              href="/admin/borrow-requests"
              className="text-sm text-sec hover:underline"
            >
              View all
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="py-2 pr-4">User</th>
                  <th className="py-2 pr-4">Book</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Requested At</th>
                </tr>
              </thead>
              <tbody>
                {borrowRequests.length > 0 ? (
                  borrowRequests.map((req) => (
                    <tr key={req._id} className="border-b text-gray-700">
                      <td className="py-2 pr-4 flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        {req.userName}
                      </td>
                      <td className="py-2 pr-4">{req.bookTitle}</td>
                      <td className="py-2 pr-4">
                        <span
                          className={`px-2 py-1 text-xs rounded font-medium ${
                            req.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : req.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="py-2 pr-4">
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
