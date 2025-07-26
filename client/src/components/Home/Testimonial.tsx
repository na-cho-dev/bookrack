import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "../../assets/assets";

const Testimonials = () => {
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
    <section ref={ref} className="flex items-center min-h-[50vh] py-20 px-6">
      <div className="container mx-auto max-w-[1200px] text-center">
        <motion.h2
          className="text-4xl font-bold font-exo mb-4 text-tpri"
          initial="hidden"
          animate={controls}
          variants={fadeUpVariant}
        >
          What Our Users Say
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 mb-12"
          initial="hidden"
          animate={controls}
          variants={fadeUpVariant}
        >
          Hear from librarians, educators, and book lovers who trust BookRack.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-[#fff9ed] px-6 py-10 rounded-xl shadow-lg flex flex-col items-center"
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
              <Quote className="w-8 h-8 text-sec mb-4" />
              <p className="text-gray-700 mb-4">{testimonial.quote}</p>
              <div className="text-center">
                <p className="font-semibold text-tpri">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
