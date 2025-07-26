import { BookOpen } from "lucide-react";
import { useUserBorrowRequests } from "../../hooks/useBook";

const BorrowHistoryTab = () => {
  const { data: history } = useUserBorrowRequests();

  return (
    <div className="py-8 px-6 sm:py-14 sm:px-6 w-full max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Borrow History</h1>

      <div className="bg-[#fffcf8] rounded-xl shadow border p-4 sm:p-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[28rem] text-sm text-left table-fixed">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="py-2 pr-4 w-1/3">Book</th>
                <th className="py-2 pr-4 w-1/4">Borrowed</th>
                <th className="py-2 pr-4 w-1/4">Returned</th>
                <th className="py-2 pr-4 w-1/6">Status</th>
              </tr>
            </thead>
            <tbody>
              {history?.length ? (
                history.map((item) => (
                  <tr key={item._id} className="border-b text-gray-700">
                    <td className="py-4 pr-4 flex items-center gap-2 truncate max-w-[10rem]">
                      <BookOpen className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{item.book.title}</span>
                    </td>
                    <td className="py-4 pr-4 truncate max-w-[8rem]">
                      {item.borrowDate
                        ? new Date(item.borrowDate).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="py-4 pr-4 truncate max-w-[8rem]">
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
    </div>
  );
};

export default BorrowHistoryTab;
