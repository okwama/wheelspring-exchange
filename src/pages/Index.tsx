import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrandFilter from "@/components/BrandFilter";
import FeaturedCars from "@/components/FeaturedCars";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <BrandFilter />
      <FeaturedCars />
      <Footer />
    </div>
  );
};

export default Index;
