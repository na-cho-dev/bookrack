// components/BookViewModal.tsx
import { X } from "lucide-react";

type BookData = {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  publishedYear: number;
  totalCopies: number;
  availableCopies: number;
};

const BookViewModal = ({
  isOpen,
  onClose,
  book,
}: {
  isOpen: boolean;
  onClose: () => void;
  book: BookData | null;
}) => {
  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative m-5">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Book Details
        </h2>
        <ul className="text-sm text-gray-700 space-y-5">
          <li>
            <strong>Title:</strong> {book.title}
          </li>
          <li>
            <strong>Author:</strong> {book.author}
          </li>
          <li>
            <strong>Genre:</strong> {book.genre}
          </li>
          <li>
            <strong>ISBN:</strong> {book.isbn}
          </li>
          <li>
            <strong>Published Year:</strong> {book.publishedYear}
          </li>
          <li>
            <strong>Total Copies:</strong> {book.totalCopies}
          </li>
          <li>
            <strong>Available Copies:</strong> {book.availableCopies}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BookViewModal;
