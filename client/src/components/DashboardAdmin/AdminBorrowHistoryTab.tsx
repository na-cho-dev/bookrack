import { BookOpen, User } from "lucide-react";
import { useBorrowRequests } from "../../hooks/useBook";

const AdminBorrowHistoryTab = () => {
  const { data: history } = useBorrowRequests();

  return (
    <div className="py-14 px-14 w-full space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Borrow History</h1>
          <p className="text-sm text-gray-500">
            View borrow history of all users and books in the system.
          </p>
        </div>
      </div>

      <div className="bg-[#fffcf8] rounded-xl shadow border p-6">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="py-2 pr-4">Book</th>
              <th className="py-2 pr-4">User</th>
              <th className="py-2 pr-4">Borrowed</th>
              <th className="py-2 pr-4">Returned</th>
              <th className="py-2 pr-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {history?.length ? (
              history.map((item) => (
                <tr key={item._id} className="border-b text-gray-700">
                  <td className="py-4 pr-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    {item.book.title}
                  </td>
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      {item.user.name}
                    </div>
                  </td>
                  <td className="py-4 pr-4">
                    {item.borrowDate
                      ? new Date(item.borrowDate).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="py-4 pr-4">
                    {item.returnDate
                      ? new Date(item.returnDate).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="py-4 pr-4 capitalize">{item.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-gray-400 py-4">
                  No borrow history available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBorrowHistoryTab;
