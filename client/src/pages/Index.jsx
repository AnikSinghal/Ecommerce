import AnnouncementBar from "../components/AnnouncementBar";
import Header from "../components/Header";
import Hero from "../components/Hero";
import CategoryCarousel from "../components/CategoryCarousel";
import BestSellers from "../components/BestSellers";
import Features from "../components/Features";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* <AnnouncementBar /> */}
      <Header />
      <main>
        <Hero />
        <CategoryCarousel />
        <BestSellers />
        <Features />
        <About />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
