import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

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
  return (
    <Transition appear show={isOpen && !!book} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg relative">
            <Dialog.Title className="text-xl font-semibold text-gray-800 mb-4">
              Book Details
            </Dialog.Title>
            {book && (
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
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BookViewModal;
