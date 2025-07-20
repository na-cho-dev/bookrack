import { motion } from "framer-motion";

type InfoCardProps = {
  icon: React.ElementType;
  title: string;
  desc: string;
  index?: number;
  className?: string;
};

const InfoCard = ({
  icon: Icon,
  title,
  desc,
  index = 0,
  className = "",
}: InfoCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    viewport={{ once: true }}
    className={`flex flex-col justify-center items-center bg-[#fcd590] rounded-lg px-6 py-10 shadow hover:shadow-md transition ${className}`}
  >
    <p className="bg-sec rounded-full mb-4 p-3">
      <Icon className="w-10 h-10 text-white " />
    </p>
    <h3 className="text-sec text-xl font-semibold mb-2">{title}</h3>
    <p className="text-black text-sm">{desc}</p>
  </motion.div>
);

export default InfoCard;
