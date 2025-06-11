import { BookOpen, Plus } from "lucide-react";

const BooksTab = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="py-14 px-14 space-y-8 w-full">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Books Management
            </h1>
            <p className="text-sm text-gray-500">
              Manage all books in your organization.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-sec text-white px-4 py-2 rounded-md shadow hover:bg-opacity-90 text-sm">
            <Plus className="w-4 h-4" />
            Add Book
          </button>
        </div>

        {/* Table Card */}
        <div className="bg-[#fffcf8] rounded-xl shadow border p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">All Books</h2>
            {/* Optional search/filter placeholder */}
            <input
              type="text"
              placeholder="Search books..."
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
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Replace with real data */}
                <tr className="border-b text-gray-700">
                  <td className="py-2 pr-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    The Great Gatsby
                  </td>
                  <td className="py-2 pr-4">F. Scott Fitzgerald</td>
                  <td className="py-2 pr-4">Fiction</td>
                  <td className="py-2 pr-4">
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">
                      Available
                    </span>
                  </td>
                  <td className="py-2 pr-4">
                    <button className="text-sm text-sec hover:underline">
                      Edit
                    </button>
                  </td>
                </tr>

                <tr className="border-b text-gray-700">
                  <td className="py-2 pr-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    1984
                  </td>
                  <td className="py-2 pr-4">George Orwell</td>
                  <td className="py-2 pr-4">Dystopian</td>
                  <td className="py-2 pr-4">
                    <span className="bg-yellow-100 text-yellow-700 text-xs font-medium px-2 py-1 rounded">
                      Borrowed
                    </span>
                  </td>
                  <td className="py-2 pr-4">
                    <button className="text-sm text-sec hover:underline">
                      Edit
                    </button>
                  </td>
                </tr>

                <tr>
                  <td colSpan={5} className="text-center text-gray-400 py-4">
                    More books will appear here...
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

export default BooksTab;
