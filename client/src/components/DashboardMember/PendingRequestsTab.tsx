import { BookOpen, Clock, Loader, X } from "lucide-react";
import {
  useCancelBorrowRequest,
  useUserBorrowRequests,
} from "../../hooks/useBook";
import { useState } from "react";

const PendingRequestsTab = () => {
  const { data: pendingRequests } = useUserBorrowRequests("pending");
  const cancelBorrowRequest = useCancelBorrowRequest();
  const [cancelRequestId, setCAncelRequestId] = useState<string | null>(null);

  const handleCancel = (bookId: string) => {
    setCAncelRequestId(bookId);
    cancelBorrowRequest.mutate(bookId, {
      onSettled: () => setCAncelRequestId(null),
    });
  };

  return (
    <div className="py-8 px-6 sm:py-14 sm:px-6 w-full max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Pending Requests</h1>
      <div className="bg-[#fffcf8] rounded-xl shadow border p-4 sm:p-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[28rem] text-sm text-left table-fixed">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="py-2 pr-4 w-1/3">Book</th>
                <th className="py-2 pr-4 w-1/4">Requested At</th>
                <th className="py-2 pr-4 w-1/4">Status</th>
                <th className="py-2 pr-4 w-1/6"></th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests?.length ? (
                pendingRequests.map((req) => (
                  <tr key={req._id} className="border-b text-gray-700">
                    <td className="py-4 pr-4 flex items-center gap-2 truncate max-w-[10rem]">
                      <BookOpen className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      {req.book?.title}
                    </td>
                    <td className="py-4 pr-4 truncate max-w-[8rem]">
                      {req.requestedAt
                        ? new Date(req.requestedAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="py-4 pr-4 capitalize">
                      <span className="flex items-center gap-1 text-yellow-700 text-xs font-medium bg-yellow-100 px-2 py-1 rounded w-fit">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        {req.status}
                      </span>
                    </td>
                    <td className="py-4 pr-4">
                      <button
                        className="text-xs text-red-600 hover:underline flex items-center gap-1"
                        onClick={() => handleCancel(req._id)}
                        disabled={
                          cancelBorrowRequest.isPending &&
                          cancelRequestId === req._id
                        }
                      >
                        {cancelBorrowRequest.isPending &&
                        cancelRequestId === req._id ? (
                          <div className="flex items-center justify-center gap-1">
                            <Loader className="w-3 h-3 animate-spin" />{" "}
                            <p>Cancel</p>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-1">
                            <X className="w-4 h-4" />
                            <p>Cancel</p>
                          </div>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center text-gray-400 py-4">
                    No requests found.
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

export default PendingRequestsTab;
