import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { steps } from "../../assets/assets";

const HowItWorks = () => {
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
      className="flex items-center min-h-[50vh] py-20 px-6 bg-gradient-to-tr from-[#fff3dd] via-[#fff3dd] to-[#fcd590]"
    >
      <div className="container mx-auto max-w-[1200px] text-center">
        <motion.h2
          className="text-4xl font-bold font-exo mb-4 text-tpri"
          initial="hidden"
          animate={controls}
          variants={fadeUpVariant}
        >
          Get Started with BookRack
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 mb-12"
          initial="hidden"
          animate={controls}
          variants={fadeUpVariant}
        >
          Follow these simple steps to organize and manage your library.
        </motion.p>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center"
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: index * 0.2 },
                },
              }}
            >
              <span className="text-4xl mb-4">{step.icon}</span>
              <h3 className="text-xl font-semibold text-tpri mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12"
          initial="hidden"
          animate={controls}
          variants={fadeUpVariant}
        >
          <Link
            to="/register"
            className="group bg-sec text-white px-6 py-3 rounded-md hover:bg-pri transition flex items-center gap-2 mx-auto"
          >
            <p>Start Organizing Now</p>
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
