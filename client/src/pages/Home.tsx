import About from "../components/Home/About";
import CTA from "../components/Home/CTA";
import FAQ from "../components/Home/FAQ";
import Features from "../components/Home/Features";
import Footer from "../components/Home/Footer";
import Hero from "../components/Home/Hero";
import WhyChooseUs from "../components/Home/WhyChooseUs";

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <About />
      <WhyChooseUs />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
};

export default Home;
