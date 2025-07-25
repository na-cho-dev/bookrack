import logo from "./undraw_books_wxzz.svg";
import bookshelf from "./undraw_bookshelves_vhu6.svg";
import blob_home from "./blob_home.svg";
import libImgOne from "./about_img1.jpg";
import libImgTwo from "./about_img2.jpg";
import libImgThree from "./about_img3.jpg";
import libImgFour from "./about_img4.webp";
import quoteImg1 from "./woman-8568693_1280.jpg";
import featuredHighlightBgImg1 from "./spacejoy-9M66C_w_ToM-unsplash.jpg";
import visionImg1 from "./books-2253569_1280.jpg";
import {
  ThumbsUp,
  ShieldCheck,
  Sparkles,
  Users,
  BookOpen,
  Library,
  Clock,
  CheckCircle,
  type LucideProps,
} from "lucide-react";

export const ImageAssets = {
  logo,
  bookshelf,
  blob_home,
  libImgOne,
  libImgTwo,
  libImgThree,
  libImgFour,
  quoteImg1,
  featuredHighlightBgImg1,
  visionImg1,
};

export const features: Array<{
  title: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  desc: string;
}> = [
  {
    title: "Search Books",
    icon: BookOpen as typeof BookOpen,
    desc: "Browse and filter books by title, author, or genre.",
  },
  {
    title: "Borrow Easily",
    icon: Library as typeof Library,
    desc: "Reserve or borrow books online with one click.",
  },
  {
    title: "Track Due Dates",
    icon: Clock as typeof Clock,
    desc: "Receive alerts for due dates and upcoming returns.",
  },
  {
    title: "Return & Review",
    icon: CheckCircle as typeof CheckCircle,
    desc: "Return books and leave a review for others.",
  },
];

export const reasons: Array<{
  title: string;
  icon: typeof BookOpen | typeof Library | typeof Clock | typeof CheckCircle;
  desc: string;
}> = [
  {
    title: "User-Friendly Design",
    icon: ThumbsUp as typeof ThumbsUp,
    desc: "Designed with simplicity in mind so anyone can navigate with ease.",
  },
  {
    title: "Secure & Reliable",
    icon: ShieldCheck as typeof ShieldCheck,
    desc: "Your data is safe with us, backed by modern security standards.",
  },
  {
    title: "Customizable Features",
    icon: Sparkles as typeof Sparkles,
    desc: "Tailor BookRack to fit your unique library structure and rules.",
  },
  {
    title: "Dedicated Support",
    icon: Users as typeof Users,
    desc: "We're always here to help you succeed with responsive assistance.",
  },
];

export const faqs = [
  {
    question: "How do I register my library on BookRack?",
    answer:
      "Simply click on the 'Get Started' button on the homepage and follow the registration steps to set up your library.",
  },
  {
    question: "Is BookRack free to use?",
    answer:
      "BookRack offers both free and premium plans to suit different needs. The free plan includes essential features, while premium plans unlock advanced tools.",
  },
  {
    question: "Can I track borrowed books and returns?",
    answer:
      "Yes! BookRack provides a robust borrowing system to track borrowed books, due dates, and returns.",
  },
  {
    question: "Is my library data secure?",
    answer:
      "Absolutely. We prioritize your data security with encrypted storage and regular backups.",
  },
];

export const testimonials = [
  {
    quote:
      "BookRack transformed our community library! Managing books and tracking borrows is now a breeze.",
    author: "Jane Doe, Community Librarian",
    role: "Small Town Library",
  },
  {
    quote:
      "The search and filter tools are fantastic. Our students can find books quickly and easily.",
    author: "John Smith, School Administrator",
    role: "High School Library",
  },
  {
    quote:
      "I love how intuitive BookRack is. It’s perfect for our book club’s shared collection.",
    author: "Emily Brown, Book Club Organizer",
    role: "Local Book Club",
  },
];

export const stats = [
  { icon: BookOpen, value: "10,000+", label: "Books Tracked" },
  { icon: Library, value: "500+", label: "Libraries Served" },
  { icon: Users, value: "1,000+", label: "Active Users" },
];

export const steps = [
  {
    title: "Sign Up",
    desc: "Create an account for your library or community in minutes.",
    icon: "📝",
  },
  {
    title: "Add Books",
    desc: "Easily catalog your collection with our intuitive interface.",
    icon: "📚",
  },
  {
    title: "Manage Borrows",
    desc: "Track borrowing and returns with automated notifications.",
    icon: "🔄",
  },
  {
    title: "Engage Readers",
    desc: "Use search and filter tools to help users find their next read.",
    icon: "🔍",
  },
];