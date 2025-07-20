import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  HandHelping,
  History,
  LayoutDashboard,
  Settings2,
} from "lucide-react";
import type { SetURLSearchParams } from "react-router-dom";

interface Props {
  open: boolean;
  onToggle: () => void;
  activeTab: string;
  setSearchParams: SetURLSearchParams;
}

const MemberNavDrawer: React.FC<Props> = ({
  open,
  onToggle,
  activeTab,
  setSearchParams,
}) => {
  const tabs = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "browse-books", label: "Books", icon: BookOpen },
    { key: "borrowed-books", label: "Borrowed Books", icon: HandHelping },
    { key: "pending-requests", label: "Pending Requests", icon: Clock },
    { key: "borrow-history", label: "Borrow History", icon: History },
  ];

  const settingsTabs = [
    { key: "settings", label: "Settings", icon: Settings2 },
  ];

  const handleTabChange = (key: string) => {
    setSearchParams({ tab: key });
  };

  return (
    <>
      {/* Drawer */}
      <div
        className={`fixed top-28 left-0 z-40 w-72 h-[calc(100vh-7rem)] border-r shadow-md overflow-hidden transition-all duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } flex flex-col justify-between`}
      >
        <nav className="mt-10 w-full">
          {tabs.map(({ key, label, icon: IconComponent }) => (
            <button
              key={key}
              onClick={() => handleTabChange(key)}
              className={`flex justify-start items-center gap-5 w-full p-5 ${
                activeTab === key ? "bg-pri text-white" : "text-sec"
              }`}
            >
              {IconComponent && <IconComponent className="w-5" />}
              {label}
            </button>
          ))}
        </nav>

        {/* Bottom settings section */}
        <nav className="mb-4">
          <hr className="border-t" />
          {settingsTabs.map(({ key, label, icon: IconComponent }) => (
            <button
              key={key}
              onClick={() => handleTabChange(key)}
              className={`flex items-center gap-5 w-full p-5 ${
                activeTab === key ? "bg-sec text-white" : "text-sec"
              }`}
            >
              <IconComponent className="w-5" />
              {label}
            </button>
          ))}
        </nav>
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

export default MemberNavDrawer;
