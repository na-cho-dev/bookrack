import { LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ImageAssets } from "../assets/assets";
import { useUserStore } from "../stores/useUserStore";
import { logoutUser } from "../api/auth.api";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useUserStore((s) => s.user);
  const membership = useUserStore((s) => s.currentMembership);
  const memberships = useUserStore((s) => s.memberships ?? []);
  const setCurrentMembership = useUserStore((s) => s.setCurrentMembership);
  const setUser = useUserStore((s) => s.setUser);
  const setLoadingUser = useUserStore((s) => s.setLoadingUser);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  const logout = async () => {
    setUser(null);
    setLoadingUser(false);
    try {
      await logoutUser();
    } catch {
      /* Local logout still completes if the request fails. */
    }
    localStorage.removeItem("activeOrgId");
    toast.success("Logged out successfully");
    navigate("/login", { replace: true });
  };
  const dashboard =
    membership?.role === "admin" ? "/dashboard/admin" : "/dashboard/member";
  const switchOrganization = (id: string) => {
    const nextMembership = memberships.find(
      (item) => item.organization._id === id,
    );
    if (!nextMembership) return;
    setCurrentMembership(nextMembership);
    setOpen(false);
    navigate(
      nextMembership.role === "admin"
        ? "/dashboard/admin"
        : "/dashboard/member",
    );
  };
  if (location.pathname === "/login" || location.pathname === "/register")
    return null;
  return (
    <nav className={`site-nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <img src={ImageAssets.logo} alt="" />
          <span>BookRack</span>
        </Link>
        <div className="nav-actions">
          {!user ? (
            <>
              <Link className="nav-login" to="/login">
                Sign in
              </Link>
              <Link className="nav-cta" to="/register">
                Create account
              </Link>
            </>
          ) : (
            <>
              <Link
                className="nav-dashboard"
                to={membership ? dashboard : "/select-org"}
              >
                <LayoutDashboard size={17} />
                <span className="hidden sm:inline">Workspace</span>
              </Link>
              <button
                aria-label="Open account menu"
                aria-expanded={open}
                className="nav-menu"
                onClick={() => setOpen(!open)}
              >
                {open ? <X size={19} /> : <Menu size={19} />}
              </button>
            </>
          )}
        </div>
      </div>
      {open && (
        <div className="nav-drawer">
          <Link
            onClick={() => setOpen(false)}
            to={membership ? dashboard : "/select-org"}
          >
            <LayoutDashboard size={17} />{" "}
            {membership ? "Open workspace" : "Choose organization"}
          </Link>
          {memberships.length > 0 && (
            <div className="org-menu-list">
              <p>SWITCH ORGANIZATION</p>
              {memberships.map((item) => (
                <button
                  key={item._id}
                  onClick={() => switchOrganization(item.organization._id)}
                  className={
                    item.organization._id === membership?.organization._id
                      ? "active-org"
                      : ""
                  }
                >
                  <span>{item.organization.name}</span>
                  <small>{item.role}</small>
                </button>
              ))}
            </div>
          )}
          <button onClick={logout}>
            <LogOut size={17} /> Sign out
          </button>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
