import { CheckCircle, Archive, Clock } from "lucide-react";
import { useUserStore } from "../../stores/useUserStore";
import { useAvailableBooks, useUserBorrowRequests } from "../../hooks/useBook";
import { Link } from "react-router-dom";

const MemberDashboardTab = () => {
  const user = useUserStore((state) => state.user);
  const currentMembership = useUserStore((s) => s.currentMembership);

  const { data: availableBooks } = useAvailableBooks();
  const { data: myBorrowedBooks } = useUserBorrowRequests("borrowed");
  const { data: pendingRequests } = useUserBorrowRequests("pending");

  const stats = {
    availableBooks: availableBooks?.length ?? 0,
    myBorrowedBooks: myBorrowedBooks?.length ?? 0,
    pendingRequests: pendingRequests?.length ?? 0,
  };

  return (
    <div className="flex justify-center items-center">
      <div className="py-14 px-14 space-y-8 w-full">
        {/* Welcome Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back,{" "}
            <span className="text-sec">{user?.name ?? "Member"}</span>
          </h1>
          <p className="text-gray-500 text-sm">
            Organization: {currentMembership?.organization.name ?? "Loading..."}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#fffcf8] p-5 rounded-xl shadow border flex gap-4 items-center">
            <CheckCircle className="text-green-500 w-8 h-8" />
            <div>
              <p className="text-sm text-gray-500">Available Books</p>
              <p className="text-xl font-bold">{stats.availableBooks}</p>
            </div>
          </div>

          <div className="bg-[#fffcf8] p-5 rounded-xl shadow border flex gap-4 items-center">
            <Archive className="text-yellow-600 w-8 h-8" />
            <div>
              <p className="text-sm text-gray-500">My Borrowed Books</p>
              <p className="text-xl font-bold">{stats.myBorrowedBooks}</p>
            </div>
          </div>

          <div className="bg-[#fffcf8] p-5 rounded-xl shadow border flex gap-4 items-center">
            <Clock className="text-red-500 w-8 h-8" />
            <div>
              <p className="text-sm text-gray-500">My Pending Requests</p>
              <p className="text-xl font-bold">{stats.pendingRequests}</p>
            </div>
          </div>
        </div>

        {/* Borrowed Books Table */}
        <div className="bg-[#fffcf8] rounded-xl shadow border p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              My Borrowed Books
            </h2>
            <Link
              to="/dashboard/member?tab=borrowed-books"
              className="text-sm text-sec hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="py-2 pr-4">Title</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Borrow Date</th>
                </tr>
              </thead>
              <tbody>
                {myBorrowedBooks && myBorrowedBooks.length > 0 ? (
                  myBorrowedBooks.map((book) => (
                    <tr key={book._id} className="border-b text-gray-700">
                      <td className="py-4 pr-4">{book.book?.title ?? "N/A"}</td>
                      <td className="py-4 pr-4">
                        <span
                          className={`px-2 py-1 text-xs rounded font-medium ${
                            book.status === "borrowed"
                              ? "bg-green-100 text-green-700"
                              : book.status === "returned"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {book.status}
                        </span>
                      </td>
                      <td className="py-4 pr-4">
                        {book.borrowDate
                          ? new Date(book.borrowDate).toLocaleString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-4 text-center text-gray-400">
                      No borrowed books yet
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

export default MemberDashboardTab;
