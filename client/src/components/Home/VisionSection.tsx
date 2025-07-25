// components/Home/VisionSection.tsx
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { ImageAssets } from "../../assets/assets";
// import { ImageAssets } from "../../assets/assets";

const VisionSection = () => {
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
        backgroundImage: `url(${ImageAssets.visionImg1}), linear-gradient(to right, rgba(255, 243, 221, 0.8), rgba(100, 100, 100, 0.9))`,
      }}
    >
      <div className="container mx-auto max-w-[1200px] text-center">
        <motion.div
          className="space-y-6"
          initial="hidden"
          animate={controls}
          variants={fadeUpVariant}
        >
          <div className="flex items-center justify-center gap-3">
            <BookOpen className="w-8 h-8 text-white" />
            <h2 className="text-4xl md:text-5xl font-bold font-exo text-white">
              Our Vision: Connect Through Reading
            </h2>
          </div>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            At BookRack, we envision a world where every library, big or small,
            thrives as a hub of knowledge and community. Our platform empowers
            you to organize, share, and celebrate the joy of reading with
            seamless technology.
          </p>
          <Link
            to="/register"
            className="group inline-flex items-center gap-2 bg-sec text-white px-6 py-3 rounded-md hover:bg-pri transition transform hover:shadow-lg"
            aria-label="Join BookRack"
          >
            <span>Join the Reading Revolution</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;
