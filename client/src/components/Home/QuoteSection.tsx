// components/Home/QuoteSection.tsx
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { ImageAssets } from "../../assets/assets";

const QuoteSection = () => {
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
      className="relative flex items-center min-h-[50vh] py-20 px-6 bg-fixed bg-center bg-cover"
      style={{
        backgroundImage: `url(${ImageAssets.quoteImg1}), linear-gradient(to right, rgba(31, 41, 55, 0.7), rgba(75, 85, 99, 0.7))`,
      }}
    >
      <div className="container mx-auto max-w-[1200px] text-center">
        <motion.div
          className="space-y-6"
          initial="hidden"
          animate={controls}
          variants={fadeUpVariant}
        >
          <p className="text-2xl md:text-4xl italic text-white max-w-3xl mx-auto">
            “A library is a hospital for the mind, and BookRack is its
            heartbeat.”
          </p>
          <p className="text-lg text-gray-200">— Anonymous Librarian</p>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteSection;
