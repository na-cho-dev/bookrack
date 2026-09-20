import { BookOpen, History } from "lucide-react";
import { useUserBorrowRequests } from "../../hooks/useBook";

const BorrowHistoryTab = () => {
  const { data: history } = useUserBorrowRequests();

  return (
    <div className="py-8 px-6 sm:py-14 sm:px-6 w-full max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1>Reading history</h1>
          <p className="text-sm text-gray-500">
            A complete record of your borrowing activity in this organization.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-tsec">
          <History size={17} />
          <span>{history?.length ?? 0} recorded loans</span>
        </div>
      </div>

      <div className="app-panel p-4 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold">Loan timeline</h2>
          <span className="text-xs text-gray-500">
            Most recent activity first
          </span>
        </div>
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
                    Your completed borrowing history will appear here.
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
