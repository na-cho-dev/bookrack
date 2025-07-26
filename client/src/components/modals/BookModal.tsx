import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import type { AddBookPayload } from "../../types/book.type";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddBookPayload, mode: "create" | "edit") => void;
  initialData?: AddBookPayload & { _id?: string };
  mode?: "create" | "edit";
};

const BookModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode = "create",
}: Props) => {
  const [form, setForm] = useState<AddBookPayload>({
    title: "",
    author: "",
    isbn: "",
    publishedYear: 0,
    totalCopies: 0,
    availableCopies: 0,
    genre: "",
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm(initialData);
    } else if (mode === "create") {
      setForm({
        title: "",
        author: "",
        isbn: "",
        publishedYear: 0,
        totalCopies: 0,
        availableCopies: 0,
        genre: "",
      });
    }
  }, [initialData, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(
      {
        ...form,
        publishedYear: Number(form.publishedYear),
        totalCopies: Number(form.totalCopies),
        availableCopies: Number(form.availableCopies),
      },
      mode
    );
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
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
            <Dialog.Title className="text-xl font-semibold mb-4 text-gray-800">
              {mode === "edit" ? "Edit Book" : "Add New Book"}
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Title", name: "title" },
                { label: "Author", name: "author" },
                { label: "ISBN", name: "isbn" },
                { label: "Published Year", name: "publishedYear" },
                { label: "Total Copies", name: "totalCopies" },
                { label: "Available Copies", name: "availableCopies" },
                { label: "Genre", name: "genre" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="text-sm text-gray-600">{field.label}</label>
                  <input
                    type={
                      field.name.includes("Year") ||
                      field.name.includes("Copies")
                        ? "number"
                        : "text"
                    }
                    name={field.name}
                    value={form[field.name as keyof AddBookPayload]}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 mt-1 text-sm focus:ring-sec focus:outline-none"
                    required
                  />
                </div>
              ))}

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-sec text-white px-4 py-2 rounded-md shadow hover:bg-opacity-90 text-sm"
                >
                  {mode === "edit" ? "Update Book" : "Add Book"}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BookModal;
