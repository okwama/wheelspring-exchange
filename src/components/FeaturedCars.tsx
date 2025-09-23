import CarCard from "./CarCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Import car images
import luxurySedan from "@/assets/car-sedan-luxury.jpg";
import blackSUV from "@/assets/car-suv-black.jpg";
import sportsRed from "@/assets/car-sports-red.jpg";
import whiteTruck from "@/assets/car-truck-white.jpg";

const featuredCars = [
  {
    id: "1",
    make: "BMW",
    model: "5 Series",
    year: 2023,
    price: 54900,
    mileage: 12500,
    location: "Los Angeles, CA",
    image: luxurySedan,
    condition: "used" as const,
    fuelType: "Gasoline",
    transmission: "Automatic"
  },
  {
    id: "2",
    make: "Toyota",
    model: "RAV4",
    year: 2024,
    price: 38900,
    mileage: 5200,
    location: "Seattle, WA",
    image: blackSUV,
    condition: "new" as const,
    fuelType: "Hybrid",
    transmission: "CVT"
  },
  {
    id: "3",
    make: "Porsche",
    model: "911 Carrera",
    year: 2023,
    price: 118500,
    mileage: 8900,
    location: "Miami, FL",
    image: sportsRed,
    condition: "used" as const,
    fuelType: "Gasoline",
    transmission: "Manual"
  },
  {
    id: "4",
    make: "Ford",
    model: "F-150",
    year: 2024,
    price: 45900,
    mileage: 1200,
    location: "Austin, TX",
    image: whiteTruck,
    condition: "new" as const,
    fuelType: "Gasoline",
    transmission: "Automatic"
  }
];

const FeaturedCars = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-automotive-dark mb-4">
            Featured Vehicles
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium vehicles from trusted dealers and sellers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
          {featuredCars.map((car) => (
            <CarCard key={car.id} {...car} />
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-automotive-navy hover:bg-automotive-dark text-white px-8 py-3"
          >
            View All Cars
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;