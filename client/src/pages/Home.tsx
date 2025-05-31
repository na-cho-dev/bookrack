import About from "../components/About";
import CTA from "../components/CTA";
import FAQ from "../components/FAQ";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import WhyChooseUs from "../components/WhyChooseUs";

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
