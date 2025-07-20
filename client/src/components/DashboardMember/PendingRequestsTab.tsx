import { Clock } from "lucide-react";
import { useAvailableBooks } from "../../hooks/useBook";

const PendingRequestsTab = () => {
  const { data: pendingRequests } = useAvailableBooks();

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
            </tr>
          </thead>
          <tbody>
            {pendingRequests?.length ? (
              pendingRequests.map((req) => (
                <tr key={req._id} className="border-b text-gray-700">
                  <td className="py-4 pr-4">{req.title}</td>
                  <td className="py-4 pr-4">
                    {new Date(req.author).toLocaleDateString()}
                  </td>
                  <td className="py-4 pr-4 capitalize">
                    <span className="flex items-center gap-1 text-yellow-700 text-xs font-medium bg-yellow-100 px-2 py-1 rounded">
                      <Clock className="w-3 h-3" />
                      {req.availableCopies}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center text-gray-400 py-4">
                  No pending requests found.
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
