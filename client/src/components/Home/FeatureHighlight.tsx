// components/Home/FeatureHighlight.tsx
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { ImageAssets } from "../../assets/assets";

const FeatureHighlight = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
      }, // cubic-bezier for easeInOut
    },
  };

  return (
    <section
      ref={ref}
      className="relative flex items-center min-h-[60vh] py-20 px-6 bg-fixed bg-center bg-cover"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${ImageAssets.featuredHighlightBgImg1}), linear-gradient(to right, rgba(224, 209, 168, 0.95), rgba(224, 168, 98, 0.95))`,
      }}
    >
      <div className="container mx-auto max-w-[1200px] flex flex-col lg:flex-row items-center gap-12">
        {/* <motion.div
          className="lg:w-1/2 flex justify-start"
          initial="hidden"
          animate={controls}
          variants={fadeUpVariant}
        >
          <img
            src={ImageAssets.libImgOne}
            loading="lazy"
            alt="BookRack search feature"
            className="w-full max-w-lg rounded-xl shadow-lg"
          />
        </motion.div> */}
        <motion.div
          className="lg:w-full space-y-6"
          initial="hidden"
          animate={controls}
          variants={fadeUpVariant}
        >
          <div className="flex items-center gap-3">
            <Search className="w-8 h-8 text-sec" />
            <h2 className="text-4xl font-bold font-exo text-white">
              Find Books in Seconds
            </h2>
          </div>
          <p className="text-lg text-white">
            BookRack’s powerful search and filter tools let users discover their
            next read effortlessly, whether by genre, author, or keyword.
          </p>
          <Link
            to="/register"
            className="group inline-flex items-center gap-2 bg-sec text-white px-6 py-3 rounded-md hover:bg-pri transition transform hover:shadow-lg"
            aria-label="Try BookRack’s search"
          >
            <span>Try the Search Now</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureHighlight;
