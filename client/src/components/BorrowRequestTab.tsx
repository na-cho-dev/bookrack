import { User, BookOpen, Clock3 } from "lucide-react";

const BorrowRequestsTab = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="py-14 px-14 space-y-8 w-full">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Borrow Requests
            </h1>
            <p className="text-sm text-gray-500">
              Manage pending borrow requests from users.
            </p>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-[#fffcf8] rounded-xl shadow border p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Pending Requests
            </h2>
            <input
              type="text"
              placeholder="Search requests..."
              className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-sec"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="py-2 pr-4">User</th>
                  <th className="py-2 pr-4">Book</th>
                  <th className="py-2 pr-4">Requested At</th>
                  <th className="py-2 pr-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Replace with dynamic data */}
                <tr className="border-b text-gray-700">
                  <td className="">
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      Jane Doe
                    </span>
                  </td>
                  <td className="">
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      The Pragmatic Programmer
                    </span>
                  </td>
                  <td className="py-2 pr-4">
                    <Clock3 className="w-4 h-4 inline text-gray-400 mr-1" />
                    2025-06-07
                  </td>
                  <td className="py-2 pr-4 flex gap-2">
                    <button className="px-3 py-1 text-xs rounded-md bg-green-100 text-green-700 hover:bg-green-200">
                      Approve
                    </button>
                    <button className="px-3 py-1 text-xs rounded-md bg-red-100 text-red-700 hover:bg-red-200">
                      Reject
                    </button>
                  </td>
                </tr>

                <tr>
                  <td colSpan={4} className="text-center text-gray-400 py-4">
                    No more requests at this time.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowRequestsTab;
