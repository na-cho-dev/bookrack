import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import MemberDashboardTab from "../components/DashboardMember/MemberDashboardTab";
import BrowseBooksTab from "../components/DashboardMember/BrowseBooksTab";
import MemberNavDrawer from "../components/DashboardMember/MemberNavDrawer";
import MyBorrowedBooksTab from "../components/DashboardMember/MyBorrowedBooksTab";
import PendingRequestsTab from "../components/DashboardMember/PendingRequestsTab";
import BorrowHistoryTab from "../components/DashboardMember/BorrowHistoryTab";
import SettingsTab from "../components/SettingsTab";

const MemberDashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "dashboard";

  return (
    <div className="flex items-start justify-center px-4 mt-[6.5rem] container mx-auto max-w-[1200px]">
      {/* Drawer Toggle Button */}
      <MemberNavDrawer
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
          {activeTab === "dashboard" && <MemberDashboardTab />}
          {activeTab === "browse-books" && <BrowseBooksTab />}
          {activeTab === "borrowed-books" && <MyBorrowedBooksTab />}
          {activeTab === "pending-requests" && <PendingRequestsTab />}
          {activeTab === "borrow-history" && <BorrowHistoryTab />}
          {activeTab === "settings" && <SettingsTab />}
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
