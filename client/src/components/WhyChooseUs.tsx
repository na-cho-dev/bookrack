import { reasons } from "../assets/assets";
import InfoCard from "./InfoCard";

const WhyChooseUs = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-[1200px] text-center">
        <h2 className="text-4xl font-bold font-exo mb-4 text-tpri">
          Why Choose BookRack
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Powerful tools, seamless experience — all in one platform.
        </p>

        <div className="grid md:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <InfoCard
              icon={reason.icon}
              title={reason.title}
              desc={reason.desc}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
