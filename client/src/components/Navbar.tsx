import { LayoutDashboard, LogIn, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ImageAssets } from "../assets/assets";
import { useUserStore } from "../stores/useUserStore";
import { logoutUser } from "../api/auth";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const Navbar = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const setLoadingUser = useUserStore((state) => state.setLoadingUser);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    setUser(null);
    setLoadingUser(false);
    logoutUser();
    toast.success("logged out successfully");
    navigate("/login");
  };

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
            <p className="font-extrabold text-3xl font-exo">
              Book<span className="text-sec">Rack</span>
            </p>
          </Link>
          <ul className="flex items-center">
            {!user ? (
              // User not logged in
              <li className="text-base font-bold">
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
              </li>
            ) : (
              // User logged in
              <div className="flex justify-center items-center gap-5">
                <li>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-1 text-sec font-bold"
                  >
                    <LayoutDashboard className="w-6" />
                    <span className="hidden md:inline">Dashboard</span>
                  </Link>
                </li>
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
};

export default Navbar;
