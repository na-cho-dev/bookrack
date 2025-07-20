import { LayoutDashboard, LogIn, LogOut, PanelLeftOpen } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ImageAssets } from "../assets/assets";
import { useUserStore } from "../stores/useUserStore";
import { logoutUser } from "../api/auth.api";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import OrgSwitcherDrawer from "./OrgSwitcherDrawer";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useUserStore((s) => s.user);
  const currentMembership = useUserStore((s) => s.currentMembership);
  const setUser = useUserStore((s) => s.setUser);
  const setLoadingUser = useUserStore((s) => s.setLoadingUser);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    setUser(null);
    setLoadingUser(false);
    try {
      await logoutUser();
    } catch {}
    localStorage.removeItem("activeOrgId");
    toast.success("Logged out successfully");
    navigate("/login", { replace: true });
  };

  if (!user || !currentMembership) {
    return (
      <nav
        className={`fixed left-0 right-0 top-0 w-full py-4 shadow z-50 transition-colors ${
          isScrolled ? "bg-[#fff4df]/90 backdrop-blur" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto max-w-[1200px]">
          <div className="flex justify-between items-center px-4 py-3">
            <Link to={"/"} className="flex items-center gap-3">
              <img
                src={ImageAssets.logo}
                alt=""
                className="w-8 md:w-10 lg:w-12"
              />{" "}
              <p className="font-extrabold text-2xl md:text-3xl font-exo text-tpri">
                Book<span className="text-sec">Rack</span>
              </p>
            </Link>
            <ul className="flex items-center">
              {!user ? (
                // User not logged in
                <li className="flex gap-5 text-sm md:text-base font-bold">
                  {currentPath === "/login" ? (
                    <Link to={"/register"} className="flex items-center gap-1">
                      <LogIn className="w-6 text-sec" />
                      <span>Register</span>
                    </Link>
                  ) : (
                    <Link to={"/login"} className="flex items-center gap-1">
                      <LogIn className="w-6 text-sec" />
                      <span>Login</span>
                    </Link>
                  )}
                  <Link
                    to={"/register"}
                    className="group bg-sec text-white px-4 py-3 rounded-md hover:bg-pri transition flex items-center gap-2 transform hover:shadow-lg"
                  >
                    <p>Get Started</p>
                  </Link>
                </li>
              ) : (
                // User logged in
                <div className="flex justify-center items-center gap-5">
                  {currentPath === "/select-org" ? (
                    ""
                  ) : (
                    <li>
                      <Link
                        to="/dashboard/admin"
                        className="flex items-center justify-center gap-1 text-sec font-bold"
                      >
                        <LayoutDashboard className="w-6" />
                        <span className="hidden md:inline">Dashboard</span>
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1 text-sec font-bold"
                    >
                      <LogOut className="w-6" />
                      <span className="hidden md:inline">Logout</span>
                    </button>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`fixed left-0 right-0 top-0 w-full py-4 shadow z-50 transition-colors ${
        isScrolled ? "bg-[#fff4df]/90 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex justify-between items-center px-4 py-3">
          <Link to={"/"} className="flex items-center gap-3">
            <img src={ImageAssets.logo} alt="" width={40} />
            <p className="font-extrabold text-3xl font-exo text-tpri">
              {currentPath === "/" ? (
                <p className="font-extrabold text-3xl font-exo text-tpri">
                  Book<span className="text-sec">Rack</span>
                </p>
              ) : (
                <p className="font-extrabold text-3xl font-exo text-tpri">
                  Book<span className="text-sec">Rack</span>
                </p>
                // currentMembership.organization.name ?? "Your Organization"
              )}
            </p>
          </Link>
          <ul className="flex items-center justify-center gap-7">
            <li className="text-base font-bold">
              <button
                onClick={() => setDrawerOpen(true)}
                className="p-2 rounded-md transition"
              >
                <PanelLeftOpen className="w-7 h-7 text-sec" />
              </button>
            </li>
            <OrgSwitcherDrawer
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              onLogout={handleLogout}
            />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
