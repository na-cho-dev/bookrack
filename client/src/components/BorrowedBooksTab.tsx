import { BookOpen, User2, CalendarCheck } from "lucide-react";

const BorrowedBooksTab = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="py-14 px-14 space-y-8 w-full">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Borrowed Books</h1>
            <p className="text-sm text-gray-500">
              Track all currently borrowed books by users.
            </p>
          </div>
        </div>

        {/* Borrowed Books Table */}
        <div className="bg-[#fffcf8] rounded-xl shadow border p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Borrowed List
            </h2>
            <input
              type="text"
              placeholder="Search borrowed books..."
              className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-sec"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="py-2 pr-4">Book</th>
                  <th className="py-2 pr-4">Borrowed By</th>
                  <th className="py-2 pr-4">Borrowed On</th>
                  <th className="py-2 pr-4">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {/* Replace with real data */}
                <tr className="border-b text-gray-700">
                  <td className="">
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      Atomic Habits
                    </span>
                  </td>
                  <td className="py-2 pr-4 flex items-center gap-2">
                    <span className="flex items-center gap-2">
                      <User2 className="w-4 h-4 text-gray-400" />
                      Ada Nwankwo
                    </span>
                  </td>
                  <td className="py-2 pr-4">
                    <CalendarCheck className="w-4 h-4 inline mr-1 text-gray-400" />
                    2025-06-01
                  </td>
                  <td className="py-2 pr-4">
                    <CalendarCheck className="w-4 h-4 inline mr-1 text-gray-400" />
                    2025-06-01
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} className="text-center text-gray-400 py-4">
                    More borrowed books will appear here...
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

export default BorrowedBooksTab;
