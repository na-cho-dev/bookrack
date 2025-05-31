import { Link } from "react-router-dom";
import { FaTwitter, FaFacebookF, FaGithub, FaEnvelope } from "react-icons/fa";
import { ImageAssets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="px-6 py-12 bg-sec">
      <div className="container mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
        {/* Logo & Intro */}
        <div>
          <Link to={"/"} className="flex items-center gap-3">
            <img src={ImageAssets.logo} alt="" width={40} />
            <p className="text-2xl md:text-4xl font-extrabold font-exo text-tpri mb-2">
              Book<span className="text-white">Rack</span>
            </p>
          </Link>
          <p className="text-base">
            Simplifying library management for institutions and communities.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-base">
            <li>
              <Link to="/" className="">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="">
                About
              </Link>
            </li>
            <li>
              <Link to="/" className="">
                Features
              </Link>
            </li>
            <li>
              <Link to="/" className="">
                Get Started
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact / Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Connect</h3>
          <ul className="flex gap-10">
            <li>
              <a href="mailto:info@bookrack.com" aria-label="Email">
                <FaEnvelope className="w-5 h-5 md:w-6 md:h-6 text-tpr hover:scale-125 transition" />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5 md:w-6 md:h-6 text-tpr hover:scale-125 transition" />
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-5 h-5 md:w-6 md:h-6 text-tpr hover:scale-125 transition" />
              </a>
            </li>
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5 md:w-6 md:h-6 text-tpr hover:scale-125 transition" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-8 text-center text-sm text-white">
        &copy; {new Date().getFullYear()} BookRack. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
