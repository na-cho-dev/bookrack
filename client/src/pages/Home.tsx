import About from "../components/Home/About";
import CTA from "../components/Home/CTA";
import FAQ from "../components/Home/FAQ";
import FeatureHighlight from "../components/Home/FeatureHighlight";
import Features from "../components/Home/Features";
import Footer from "../components/Home/Footer";
import Hero from "../components/Home/Hero";
import QuoteSection from "../components/Home/QuoteSection";
// import HowItWorks from "../components/Home/HowItWorks";
import Stats from "../components/Home/Stats";
import Testimonials from "../components/Home/Testimonial";
// import VisionSection from "../components/Home/VisionSection";
import WhyChooseUs from "../components/Home/WhyChooseUs";

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      {/* <HowItWorks /> */}
      <About />
      {/* <VisionSection /> */}
      <Testimonials />
      <QuoteSection />
      <WhyChooseUs />
      <Stats />
      <FeatureHighlight />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
};

export default Home;
