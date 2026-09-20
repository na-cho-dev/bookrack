import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import MemberDashboardTab from "../components/DashboardMember/MemberDashboardTab";
import BrowseBooksTab from "../components/DashboardMember/BrowseBooksTab";
import MemberNavDrawer from "../components/DashboardMember/MemberNavDrawer";
import MyBorrowedBooksTab from "../components/DashboardMember/MyBorrowedBooksTab";
import PendingRequestsTab from "../components/DashboardMember/PendingRequestsTab";
import BorrowHistoryTab from "../components/DashboardMember/BorrowHistoryTab";
import SettingsTab from "../components/SettingsTab";
import { Menu } from "lucide-react";

const MemberDashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "dashboard";

  return (
    <main className="app-page">
      <div className="app-shell">
        {/* Drawer Toggle Button */}
        <MemberNavDrawer
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
            {activeTab === "dashboard" && <MemberDashboardTab />}
            {activeTab === "browse-books" && <BrowseBooksTab />}
            {activeTab === "borrowed-books" && <MyBorrowedBooksTab />}
            {activeTab === "pending-requests" && <PendingRequestsTab />}
            {activeTab === "borrow-history" && <BorrowHistoryTab />}
            {activeTab === "settings" && <SettingsTab />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MemberDashboard;
