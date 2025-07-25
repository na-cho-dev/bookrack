import { Clock, X } from "lucide-react";
import {
  useCancelBorrowRequest,
  useUserBorrowRequests,
} from "../../hooks/useBook";

const PendingRequestsTab = () => {
  const { data: pendingRequests } = useUserBorrowRequests("pending");
  const cancelBorrowRequest = useCancelBorrowRequest();

  return (
    <div className="py-14 px-14 w-full space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Pending Requests</h1>
      <div className="bg-[#fffcf8] rounded-xl shadow border p-6">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="py-2 pr-4">Book</th>
              <th className="py-2 pr-4">Requested At</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4"></th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests?.length ? (
              pendingRequests.map((req) => (
                <tr key={req._id} className="border-b text-gray-700">
                  <td className="py-4 pr-4">{req.book?.title}</td>
                  <td className="py-4 pr-4">
                    {req.requestedAt
                      ? new Date(req.requestedAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="py-4 pr-4 capitalize">
                    <span className="flex items-center gap-1 text-yellow-700 text-xs font-medium bg-yellow-100 px-2 py-1 rounded w-fit">
                      <Clock className="w-3 h-3" />
                      {req.status}
                    </span>
                  </td>
                  <td className="py-4 pr-4">
                    <button
                      className="text-xs text-red-600 hover:underline flex items-center gap-1"
                      onClick={() => cancelBorrowRequest.mutate(req._id)}
                      disabled={cancelBorrowRequest.isPending}
                    >
                      <X className="w-4 h-4" />
                      Cancel
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
  );
};

export default PendingRequestsTab;
