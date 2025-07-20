// components/BookModal.tsx
import { X } from "lucide-react";
import { useState, useEffect } from "react";
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {mode === "edit" ? "Edit Book" : "Add New Book"}
        </h2>

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
                  field.name.includes("Year") || field.name.includes("Copies")
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

          <button
            type="submit"
            className="bg-sec text-white px-4 py-2 rounded-md shadow hover:bg-opacity-90 text-sm"
          >
            {mode === "edit" ? "Update Book" : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookModal;
