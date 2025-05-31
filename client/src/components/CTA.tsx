import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="bg-gradient-to-bl from-[#fff3dd] via-[#fff3dd] to-[#fcd590] px-6 py-20">
      <div className="container mx-auto max-w-[1200px] text-center space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold font-exo text-gray-800"
        >
          Ready to Organize Your Library?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-lg text-gray-700 max-w-2xl mx-auto"
        >
          Join 1,000+ users already using BookRack to streamline their library
          management. It’s free and easy to get started.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link
            to={"/register"}
            className="group bg-sec text-white px-6 py-3 rounded-md hover:bg-pri transition inline-flex items-center gap-2 transform hover:shadow-lg"
          >
            <p>Get Started Now</p>
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
