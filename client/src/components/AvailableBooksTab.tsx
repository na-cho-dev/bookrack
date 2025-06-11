import { BookOpen, Eye } from "lucide-react";

const AvailableBooksTab = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="py-14 px-14 space-y-8 w-full">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Available Books
            </h1>
            <p className="text-sm text-gray-500">
              View and manage books that are currently available.
            </p>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-[#fffcf8] rounded-xl shadow border p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">In Stock</h2>
            <input
              type="text"
              placeholder="Search available books..."
              className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-sec"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="py-2 pr-4">Title</th>
                  <th className="py-2 pr-4">Author</th>
                  <th className="py-2 pr-4">Category</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Replace with real data */}
                <tr className="border-b text-gray-700">
                  <td className="py-2 pr-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    The Alchemist
                  </td>
                  <td className="py-2 pr-4">Paulo Coelho</td>
                  <td className="py-2 pr-4">Philosophical</td>
                  <td className="py-2 pr-4">
                    <button className="flex items-center gap-1 text-sec text-sm hover:underline">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </tr>

                <tr className="border-b text-gray-700">
                  <td className="py-2 pr-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    Becoming
                  </td>
                  <td className="py-2 pr-4">Michelle Obama</td>
                  <td className="py-2 pr-4">Memoir</td>
                  <td className="py-2 pr-4">
                    <button className="flex items-center gap-1 text-sec text-sm hover:underline">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </tr>

                <tr>
                  <td colSpan={4} className="text-center text-gray-400 py-4">
                    More available books will appear here...
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

export default AvailableBooksTab;
