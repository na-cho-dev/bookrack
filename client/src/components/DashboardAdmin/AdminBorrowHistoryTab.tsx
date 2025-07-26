import { BookOpen, User } from "lucide-react";
import { useBorrowRequests } from "../../hooks/useBook";

const AdminBorrowHistoryTab = () => {
  const { data: history } = useBorrowRequests();

  return (
    <div className="flex justify-center items-center">
      <div className="py-8 px-6 sm:py-14 sm:px-14 space-y-8 w-full max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Borrow History</h1>
            <p className="text-sm text-gray-500">
              View borrow history of all users and books in the system.
            </p>
          </div>
        </div>

        <div className="bg-[#fffcf8] rounded-xl shadow border p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <h2 className="text-lg font-semibold text-gray-800">History</h2>
            {/* Optionally add a search input here */}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] text-sm text-left table-fixed">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="py-2 pr-4 w-1/4">Book</th>
                  <th className="py-2 pr-4 w-1/5">User</th>
                  <th className="py-2 pr-4 w-1/6">Borrowed</th>
                  <th className="py-2 pr-4 w-1/6">Returned</th>
                  <th className="py-2 pr-4 w-1/6">Status</th>
                </tr>
              </thead>
              <tbody>
                {history?.length ? (
                  history.map((item) => (
                    <tr key={item._id} className="border-b text-gray-700">
                      <td className="py-4 pr-4 flex items-center gap-2 truncate max-w-[10rem] text-sm leading-none">
                        <BookOpen className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{item.book.title}</span>
                      </td>
                      <td className="py-4 pr-4 truncate max-w-[8rem] text-sm leading-none">
                        <div className="flex items-center gap-2">
                          <User className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          <span className="truncate">{item.user.name}</span>
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
                    <td colSpan={5} className="text-center text-gray-400 py-4">
                      No borrow history available.
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

export default AdminBorrowHistoryTab;
