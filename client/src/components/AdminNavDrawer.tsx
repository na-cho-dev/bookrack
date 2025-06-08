import {
  BookOpen,
  CheckCircle,
  Clock,
  Archive,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  open: boolean;
  onToggle: () => void;
}

const AdminNavDrawer: React.FC<Props> = ({ open, onToggle }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      {/* Drawer */}
      <div
        className={`fixed top-22 left-0 z-40 w-72 h-[calc(100vh-4rem)] border-r shadow-md overflow-hidden transition-all duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-5">
          <h2 className="text-lg font-bold text-gray-800 p-5">Admin Menu</h2>
          <nav className="space-y-3">
            <Link
              to="/dashboard/admin/books"
              className={`flex items-center gap-2 font-extrabold hover:text-sec p-5 ${
                currentPath === "/dashboard/admin/books"
                  ? "bg-pri text-white"
                  : "text-sec"
              }`}
            >
              <BookOpen className="w-5" />
              Books
            </Link>
            <Link
              to="/dashboard/admin/available"
              className={`flex items-center gap-2 font-extrabold hover:text-sec p-5 ${
                currentPath === "/dashboard/admin/available"
                  ? "bg-pri text-white"
                  : "text-sec"
              }`}
            >
              <CheckCircle className="w-5" />
              Available Books
            </Link>
            <Link
              to="/dashboard/admin/borrowed"
              className={`flex items-center gap-2 font-extrabold hover:text-sec p-5 ${
                currentPath === "/dashboard/admin/available"
                  ? "bg-pri text-white"
                  : "text-sec"
              }`}
            >
              <Archive className="w-5" />
              Borrowed Books
            </Link>
            <Link
              to="/dashboard/admin/borrow-requests"
              className={`flex items-center gap-2 font-extrabold hover:text-sec p-5 ${
                currentPath === "/dashboard/admin/available"
                  ? "bg-pri text-white"
                  : "text-sec"
              }`}
            >
              <Clock className="w-5" />
              Borrow Requests
            </Link>
            <Link
              to="/dashboard/admin/users"
              className={`flex items-center gap-2 font-extrabold hover:text-sec p-5 ${
                currentPath === "/dashboard/admin/available"
                  ? "bg-pri text-white"
                  : "text-sec"
              }`}
            >
              <User className="w-5" />
              Users
            </Link>
          </nav>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        aria-label="Toggle Drawer"
        className={`fixed top-22 z-50 p-1 border rounded-r-md shadow text-sec hover:bg-gray-50 transition-all duration-300 ${
          open ? "left-72" : "left-0"
        }`}
      >
        {open ? (
          <ChevronLeft className="w-6 h-6" />
        ) : (
          <ChevronRight className="w-6 h-6" />
        )}
      </button>
    </>
  );
};

export default AdminNavDrawer;
