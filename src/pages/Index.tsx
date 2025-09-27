import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrandFilter from "@/components/BrandFilter";
import FeaturedCars from "@/components/FeaturedCars";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Gold Standard Cars | Premium Cars, Imports & Financing</title>
        <meta name="description" content="Browse premium cars, get import assistance, and explore financing options at Gold Standard Cars." />
        <link rel="canonical" href={`${window.location.origin}/`} />
      </Helmet>
      <Header />
      <Hero />
      <BrandFilter />
      <FeaturedCars />
      <Footer />
    </div>
  );
};

export default Index;
