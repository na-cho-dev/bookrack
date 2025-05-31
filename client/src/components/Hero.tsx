import { Link } from "react-router-dom";
// import { ImageAssets } from "../assets/assets";
import {
  ArrowRight,
  CheckCircle,
  BookOpen,
  Library,
  Clock,
  ArrowDownFromLine,
} from "lucide-react";

const Hero = () => {
  return (
    <section className="flex items-center min-h-screen px-3 bg-gradient-to-br from-[#fff3dd] via-[#fff3dd] to-[#fcd590]">
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex flex-col items-center justify-between">
          {/* Left side: Intro Text + Featured Highlights */}
          <div className="space-y-9 lg:space-y-12 flex flex-col items-center justify-center">
            <h1 className="text-3xl md:text-8xl font-extrabold font-exo bg-gradient-to-r from-[#d97706] via-orange-500 to-yellow-500 bg-clip-text text-transparent text-center">
              Your Library, Organized. Welcome to BookRack
            </h1>

            <p className="text-xl text-tsec w-full lg:w-[70%] text-center">
              BookRack helps institutions and communities easily organize,
              track, and access their library collections.
            </p>

            {/* Featured Highlights with icons */}
            <div className="space-y-2 text-base">
              <div className="flex items-center gap-2 text-tsec">
                <CheckCircle className="text-sec w-5 h-5" />
                <p>Track borrowed and returned books</p>
              </div>
              <div className="flex items-center gap-2 text-tsec">
                <CheckCircle className="text-sec w-5 h-5" />
                <p>Organize collections by genre or tags</p>
              </div>
              <div className="flex items-center gap-2 text-tsec">
                <CheckCircle className="text-sec w-5 h-5" />
                <p>Powerful search and filter tools</p>
              </div>
            </div>

            {/* App stat/tagline */}
            <p className="text-tsec pt-2 text-base">
              📚 Trusted by over <strong>1,000</strong> readers and counting!
            </p>
            <div className="hidden md:flex gap-8 text-black text-base">
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-sec" />
                <span>Thousands of Books</span>
              </div>
              <div className="flex items-center gap-2">
                <Library className="w-6 h-6 text-sec" />
                <span>Organized Shelves</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-6 h-6 text-sec" />
                <span>Easy Tracking</span>
              </div>
            </div>

            <Link
              to={"/register"}
              className="group bg-sec text-white px-6 py-3 rounded-md hover:bg-pri transition flex items-center gap-2 transform hover:shadow-lg"
            >
              <p>Get Started</p>
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-2" />
            </Link>
          </div>

          {/* Right side: Illustration */}
          {/* <div className="relative w-1/2 xl:flex justify-end hidden">
            <img
              src={ImageAssets.blob_home}
              className="absolute -top-48 left-20"
              alt="decorative blob"
            />
            <img
              src={ImageAssets.bookshelf}
              alt="Bookshelf illustration"
              className="w-full max-w-md drop-shadow-md"
            />
          </div> */}

          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce text-sec">
            <ArrowDownFromLine className="w-6 h-6" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
