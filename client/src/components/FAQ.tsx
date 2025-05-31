import { AnimatePresence, motion } from "framer-motion";
import { faqs } from "../assets/assets";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-[900px]">
        <h2 className="text-4xl text-tpri font-bold font-exo text-center mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-sec rounded-lg shadow p-6 cursor-pointer"
              onClick={() => toggle(i)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-tpri">
                  {faq.question}
                </h3>
                <span className="text-white font-bold text-sm">
                  {openIndex === i ? (
                    <Minus className="text-sm" />
                  ) : (
                    <Plus className="text-sm" />
                  )}
                </span>
              </div>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="answer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.1, ease: "easeIn" }}
                    className="text-white mt-3 text-lg leading-relaxed text-left overflow-hidden"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
