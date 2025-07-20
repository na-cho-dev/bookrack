import { BookOpen } from "lucide-react";
import { useAvailableBooks } from "../../hooks/useBook";

const MyBorrowedBooksTab = () => {
  const { data: borrowedBooks } = useAvailableBooks();

  return (
    <div className="py-14 px-14 w-full space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">My Borrowed Books</h1>

      <div className="bg-[#fffcf8] rounded-xl shadow border p-6">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="py-2 pr-4">Title</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Borrow Date</th>
              <th className="py-2 pr-4">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks?.length ? (
              borrowedBooks.map((item) => (
                <tr key={item._id} className="border-b text-gray-700">
                  <td className="py-4 pr-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    {item.title}
                  </td>
                  <td className="py-4 pr-4 capitalize">{item.author}</td>
                  <td className="py-4 pr-4">
                    {new Date(item.totalCopies).toLocaleDateString()}
                  </td>
                  <td className="py-4 pr-4">
                    {item.totalCopies
                      ? new Date(item.totalCopies).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-gray-400 py-4">
                  You haven’t borrowed any books yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBorrowedBooksTab;
