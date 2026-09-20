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
import { Menu } from "lucide-react";

const AdminDashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "dashboard";

  return (
    <main className="app-page">
      <div className="app-shell">
        {/* Drawer Toggle Button */}
        <AdminNavDrawer
          open={isDrawerOpen}
          onToggle={() => setIsDrawerOpen(!isDrawerOpen)}
          activeTab={activeTab}
          setSearchParams={setSearchParams}
        />

        <div className="app-content">
          <button
            className="md:hidden mb-5 p-2 border bg-white"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>
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
    </main>
  );
};

export default AdminDashboard;
