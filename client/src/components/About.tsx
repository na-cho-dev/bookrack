import { ImageAssets } from "../assets/assets";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const About = () => {
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
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section ref={ref} className="flex items-center min-h-[50vh] py-20 px-6">
      <div className="container mx-auto max-w-[1200px] flex flex-col lg:flex-row items-center gap-12">
        {/* Text content */}
        <motion.div
          className="lg:w-1/2 space-y-6"
          initial="hidden"
          animate={controls}
          variants={fadeUpVariant}
        >
          <h2 className="text-4xl font-bold font-exo text-tpri">
            About BookRack
          </h2>
          <p className="text-lg text-gray-700">
            BookRack was founded with a simple mission: to empower communities
            and institutions to effortlessly manage and enjoy their library
            collections.
          </p>
          <p className="text-gray-700">
            With an easy-to-use platform, robust features, and dedicated
            support, we help you keep your library organized, accessible, and
            vibrant.
          </p>
          <p className="text-gray-700">
            Our team is passionate about fostering a love for reading and
            learning by providing tools that simplify library management.
            Whether you run a small community library or a large institution,
            BookRack adapts to your unique needs.
          </p>
          <p className="text-gray-700">
            We believe in technology that connects people to knowledge
            effortlessly and in building lasting relationships with our users
            through continuous innovation and support.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          className="lg:w-1/2 flex justify-end"
          initial="hidden"
          animate={controls}
          variants={fadeUpVariant}
        >
          <img
            src={ImageAssets.libImgFour}
            loading="eager"
            alt="About BookRack illustration"
            className="w-full max-w-2xl rounded-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
