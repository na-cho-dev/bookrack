import { BookOpen, CheckCircle, Clock, Library } from "lucide-react";

const Features = () => {
  return (
    <section className="flex items-center min-h-[70vh] px-6 bg-gradient-to-tr from-[#fff3dd] via-[#fff3dd] to-[#fcd590]">
      <div className="container mx-auto max-w-[1200px] text-center">
        <h2 className="text-4xl font-bold font-exo mb-4">How BookRack Works</h2>
        <p className="text-lg text-gray-600 mb-12">
          Get started in just a few easy steps
        </p>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              title: "Search Books",
              icon: <BookOpen className="w-10 h-10 text-sec mb-4 mx-auto" />,
              desc: "Browse and filter books by title, author, or genre.",
            },
            {
              title: "Borrow Easily",
              icon: <Library className="w-10 h-10 text-sec mb-4 mx-auto" />,
              desc: "Reserve or borrow books online with one click.",
            },
            {
              title: "Track Due Dates",
              icon: <Clock className="w-10 h-10 text-sec mb-4 mx-auto" />,
              desc: "Receive alerts for due dates and upcoming returns.",
            },
            {
              title: "Return & Review",
              icon: <CheckCircle className="w-10 h-10 text-sec mb-4 mx-auto" />,
              desc: "Return books and leave a review for others.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#fff4df] rounded-lg p-6 shadow hover:shadow-md transition"
            >
              {item.icon}
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
