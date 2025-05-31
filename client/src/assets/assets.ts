import logo from "./undraw_books_wxzz.svg";
import bookshelf from "./undraw_bookshelves_vhu6.svg";
import blob_home from "./blob_home.svg";
import libImgOne from "./about_img1.jpg";
import libImgTwo from "./about_img2.jpg";
import libImgThree from "./about_img3.jpg";
import libImgFour from "./about_img4.webp";
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