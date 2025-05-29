import { Link } from "react-router-dom";
import { ImageAssets } from "../assets/assets";
import {
  ArrowRight,
  CheckCircle,
  BookOpen,
  Library,
  Clock,
  ArrowDownFromLine,
} from "lucide-react";

const Home = () => {
  return (
    <section
      className="flex items-center min-h-screen px-6 bg-gradient-to-br from-[#ffc053] via-[#fcd68e] to-[#ffc053]"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, #ffc053 0%, #fcd68e 20%, #ffdfb7 70%, #ffc053 100%)",
      }}
    >
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left side: Intro Text + Featured Highlights */}
          <div className="xl:w-1/2 space-y-8 flex flex-col items-start justify-center">
            <h1 className="text-5xl md:text-[4em] font-extrabold font-exo bg-gradient-to-r from-[#d97706] via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Welcome to <span className="">BookRack!</span>
            </h1>

            <p className="text-xl text-tsec">
              Your personal library organizer. Find, manage, and enjoy your
              favorite books with ease.
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
            <div className="flex gap-8 text-tsec text-base">
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
              to={""}
              className="bg-sec text-white px-6 py-3 rounded-md hover:bg-pri transition flex items-center gap-2 transform hover:scale-105 hover:shadow-lg"
            >
              <p>Get Started</p>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Right side: Illustration */}
          <div className="relative w-1/2 xl:flex justify-end hidden">
            {/* Decorative Blob */}
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
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce text-sec">
          <ArrowDownFromLine className="w-6 h-6" />
        </div>
      </div>
    </section>
  );
};

export default Home;
