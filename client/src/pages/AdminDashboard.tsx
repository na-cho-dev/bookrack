import { useState } from "react";
import AdminNavDrawer from "../components/Admin/AdminNavDrawer";
import AdminDashboardTab from "../components/Admin/AdminDashboardTab";
import { useSearchParams } from "react-router-dom";
import BooksTab from "../components/BooksTab";
import AvailableBooksTab from "../components/AvailableBooksTab";
import BorrowedBooksTab from "../components/BorrowedBooksTab";
import BorrowRequestsTab from "../components/BorrowRequestTab";
import UsersTab from "../components/UserTab";

const AdminDashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "dashboard";

  return (
    <div className="flex items-start justify-center px-4 mt-[6.5rem] container mx-auto max-w-[1200px]">
      {/* Drawer Toggle Button */}
      <AdminNavDrawer
        open={isDrawerOpen}
        onToggle={() => setIsDrawerOpen(!isDrawerOpen)}
        activeTab={activeTab}
        setSearchParams={setSearchParams}
      />

      <div
        className={`transition-all duration-300 w-screen ${
          isDrawerOpen ? "ml-72" : "ml-0"
        }`}
      >
        <div>
          {activeTab === "dashboard" && <AdminDashboardTab />}
          {activeTab === "books" && <BooksTab />}
          {activeTab === "available" && <AvailableBooksTab />}
          {activeTab === "borrowed" && <BorrowedBooksTab />}
          {activeTab === "requests" && <BorrowRequestsTab />}
          {activeTab === "users" && <UsersTab />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
