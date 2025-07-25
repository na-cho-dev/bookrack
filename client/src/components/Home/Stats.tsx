import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { stats } from "../../assets/assets";

const Stats = () => {
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
    <section ref={ref} className="flex items-center min-h-[40vh] py-16 px-6">
      <div className="container mx-auto max-w-[1200px] text-center">
        <motion.h2
          className="text-4xl font-bold font-exo mb-4 text-tpri"
          initial="hidden"
          animate={controls}
          variants={fadeUpVariant}
        >
          BookRack by the Numbers
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 mb-12"
          initial="hidden"
          animate={controls}
          variants={fadeUpVariant}
        >
          Discover the impact of BookRack in communities and institutions.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
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
              <stat.icon className="w-12 h-12 text-sec mb-4" />
              <p className="text-3xl font-bold text-tpri">{stat.value}</p>
              <p className="text-lg text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
