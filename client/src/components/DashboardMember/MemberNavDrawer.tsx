import {
  BookOpen,
  Clock,
  HandHelping,
  History,
  LayoutDashboard,
  Settings2,
  X,
} from "lucide-react";
import type { SetURLSearchParams } from "react-router-dom";
interface Props {
  open: boolean;
  onToggle: () => void;
  activeTab: string;
  setSearchParams: SetURLSearchParams;
}
const MemberNavDrawer = ({
  open,
  onToggle,
  activeTab,
  setSearchParams,
}: Props) => {
  const tabs = [
    { key: "dashboard", label: "Overview", icon: LayoutDashboard },
    { key: "browse-books", label: "Discover books", icon: BookOpen },
    { key: "borrowed-books", label: "My borrowed books", icon: HandHelping },
    { key: "pending-requests", label: "Requests", icon: Clock },
    { key: "borrow-history", label: "Reading history", icon: History },
  ];
  const choose = (key: string) => {
    setSearchParams({ tab: key });
    if (window.innerWidth < 760) onToggle();
  };
  return (
    <aside className={`app-sidebar ${open ? "open" : ""}`}>
      <div className="side-heading flex justify-between items-center">
        MEMBER SPACE{" "}
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
export default MemberNavDrawer;
