import {
  BookOpen,
  CheckCircle,
  Clock,
  Archive,
  User,
  LayoutDashboard,
  Settings2,
  History,
  X,
} from "lucide-react";
import type { SetURLSearchParams } from "react-router-dom";
interface Props {
  open: boolean;
  onToggle: () => void;
  activeTab: string;
  setSearchParams: SetURLSearchParams;
}
const AdminNavDrawer = ({
  open,
  onToggle,
  activeTab,
  setSearchParams,
}: Props) => {
  const tabs = [
    { key: "dashboard", label: "Overview", icon: LayoutDashboard },
    { key: "books", label: "Collection", icon: BookOpen },
    { key: "available", label: "Available now", icon: CheckCircle },
    { key: "borrowed", label: "On loan", icon: Archive },
    { key: "requests", label: "Borrow requests", icon: Clock },
    { key: "history", label: "Loan history", icon: History },
    { key: "users", label: "Members", icon: User },
  ];
  const choose = (key: string) => {
    setSearchParams({ tab: key });
    if (window.innerWidth < 760) onToggle();
  };
  return (
    <aside className={`app-sidebar ${open ? "open" : ""}`}>
      <div className="side-heading flex justify-between items-center">
        LIBRARY ADMIN{" "}
        <button
          className="md:hidden"
          onClick={onToggle}
          aria-label="Close navigation"
        >
          <X size={16} />
        </button>
      </div>
      <nav>
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => choose(key)}
            className={`side-item ${activeTab === key ? "active" : ""}`}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </nav>
      <div className="side-spacer" />
      <nav>
        <button
          onClick={() => choose("settings")}
          className={`side-item ${activeTab === "settings" ? "active" : ""}`}
        >
          <Settings2 size={17} />
          Settings
        </button>
      </nav>
    </aside>
  );
};
export default AdminNavDrawer;
