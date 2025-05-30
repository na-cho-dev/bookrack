import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="bg-[#fff3dd] text-center py-20 px-6 min-h-[30vh]">
      <div className="container mx-auto max-w-[900px]">
        <h2 className="text-4xl font-bold font-exo mb-4">
          Ready to simplify your library?
        </h2>
        <p className="text-lg mb-8">
          Join hundreds of institutions using BookRack to manage and modernize
          their book systems.
        </p>
        <Link
          to="/register"
          className="bg-pri text-white font-semibold px-6 py-3 rounded-md hover:bg-sec transition"
        >
          Get Started for Free
        </Link>
      </div>
    </section>
  );
};

export default CTA;
