import { useState } from "react";
import AdminNavDrawer from "../components/DashboardAdmin/AdminNavDrawer";
import AdminDashboardTab from "../components/DashboardAdmin/AdminDashboardTab";
import { useSearchParams } from "react-router-dom";
import BooksTab from "../components/DashboardAdmin/BooksTab";
import AvailableBooksTab from "../components/DashboardAdmin/AvailableBooksTab";
import BorrowedBooksTab from "../components/DashboardAdmin/BorrowedBooksTab";
import BorrowRequestsTab from "../components/DashboardAdmin/BorrowRequestTab";
import UsersTab from "../components/DashboardAdmin/UserTab";
import SettingsTab from "../components/SettingsTab";
import AdminBorrowHistoryTab from "../components/DashboardAdmin/AdminBorrowHistoryTab";

const AdminDashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
          isDrawerOpen ? "md:ml-72" : "ml-0"
        }`}
      >
        <div>
          {activeTab === "dashboard" && <AdminDashboardTab />}
          {activeTab === "books" && <BooksTab />}
          {activeTab === "available" && <AvailableBooksTab />}
          {activeTab === "borrowed" && <BorrowedBooksTab />}
          {activeTab === "requests" && <BorrowRequestsTab />}
          {activeTab === "history" && <AdminBorrowHistoryTab />}
          {activeTab === "users" && <UsersTab />}
          {activeTab === "settings" && <SettingsTab />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
