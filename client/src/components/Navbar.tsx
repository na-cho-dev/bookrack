import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { ImageAssets } from "../assets/assets";

const Navbar = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 w-full py-4 shadow z-50">
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex justify-between items-center px-4 py-3">
          <Link to={""} className="flex items-center gap-3">
            <img src={ImageAssets.logo} alt="" width={40} />
            <p className="font-extrabold text-3xl font-exo">
              Book<span className="text-sec">Rack</span>
            </p>
          </Link>
          <ul className="flex items-center">
            <li className="text-xl font-extrabold">
              <Link to={""} className="flex items-center gap-1">
                <LogIn className="w-6 text-sec" />
                <span>Login</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
