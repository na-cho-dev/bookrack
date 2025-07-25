import {
  BookOpen,
  CheckCircle,
  Clock,
  Archive,
  User,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Settings2,
  History,
} from "lucide-react";
import type { SetURLSearchParams } from "react-router-dom";

interface Props {
  open: boolean;
  onToggle: () => void;
  activeTab: string;
  setSearchParams: SetURLSearchParams;
}

const AdminNavDrawer: React.FC<Props> = ({
  open,
  onToggle,
  activeTab,
  setSearchParams,
}) => {
  const tabs = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "books", label: "Books", icon: BookOpen },
    { key: "available", label: "Available Books", icon: CheckCircle },
    { key: "borrowed", label: "Borrowed Books", icon: Archive },
    { key: "requests", label: "Borrow Requests", icon: Clock },
    { key: "history", label: "Borrow History", icon: History },
    { key: "users", label: "Users", icon: User },
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
        className={`
          bg-bg fixed left-0 z-40
          w-72
          top-24 h-[calc(100vh-7rem)]
          border-r shadow-md overflow-hidden transition-all duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          flex flex-col justify-between
        `}
        style={{ maxWidth: "100vw" }}
      >
        <nav className="mt-10 w-full">
          {tabs.map(({ key, label, icon: IconComponent }) => (
            <button
              key={key}
              onClick={() => {
                handleTabChange(key);
                onToggle();
              }}
              className={`flex justify-start items-center gap-5 w-full p-5 ${
                activeTab === key ? "bg-sec text-white" : "text-sec"
              }`}
            >
              {IconComponent && <IconComponent className="w-5" />}
              <span className="truncate">{label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom settings section */}
        <nav className="mb-4">
          <hr className="border-t" />
          {settingsTabs.map(({ key, label, icon: IconComponent }) => (
            <button
              key={key}
              onClick={() => {
                handleTabChange(key);
                onToggle();
              }}
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
        className={`fixed top-21 z-50 p-1 border rounded-r-md shadow text-sec hover:bg-gray-50 transition-all duration-300 ${
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
