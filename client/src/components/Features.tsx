import { features } from "../assets/assets";
import InfoCard from "./InfoCard";

const Features = () => {
  return (
    <section
      id="feature"
      className="flex items-center min-h-[50vh] py-20 px-6 bg-gradient-to-tr from-[#fff3dd] via-[#fff3dd] to-[#fcd590]"
    >
      <div className="container mx-auto max-w-[1200px] text-center">
        <h2 className="text-4xl font-bold font-exo mb-4 text-tpri">
          How BookRack Works
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Get started in just a few easy steps
        </p>

        <div className="grid md:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <InfoCard
              icon={item.icon}
              title={item.title}
              desc={item.desc}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
