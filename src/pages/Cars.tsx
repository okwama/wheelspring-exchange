import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import carSedan from "@/assets/car-sedan-luxury.jpg";
import carSports from "@/assets/car-sports-red.jpg";
import carSUV from "@/assets/car-suv-black.jpg";
import carTruck from "@/assets/car-truck-white.jpg";

const Cars = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const allCars = [
    {
      id: "1",
      image: carSedan,
      make: "BMW",
      model: "3 Series",
      year: 2023,
      price: 45999,
      mileage: 12000,
      location: "New York, NY",
      condition: "used" as const,
      fuelType: "Gasoline",
      transmission: "Automatic",
    },
    {
      id: "2",
      image: carSports,
      make: "Porsche",
      model: "911",
      year: 2022,
      price: 125900,
      mileage: 8500,
      location: "Los Angeles, CA",
      condition: "used" as const,
      fuelType: "Gasoline",
      transmission: "Manual",
    },
    {
      id: "3",
      image: carSUV,
      make: "Mercedes",
      model: "GLE",
      year: 2023,
      price: 67500,
      mileage: 15200,
      location: "Miami, FL",
      condition: "used" as const,
      fuelType: "Gasoline",
      transmission: "Automatic",
    },
    {
      id: "4",
      image: carTruck,
      make: "Ford",
      model: "F-150",
      year: 2023,
      price: 52800,
      mileage: 9800,
      location: "Dallas, TX",
      condition: "used" as const,
      fuelType: "Gasoline",
      transmission: "Automatic",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-automotive-navy mb-4">Find Your Perfect Car</h1>
          <p className="text-muted-foreground text-lg">Browse our extensive collection of quality vehicles</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-lg p-6 mb-8 shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Make" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bmw">BMW</SelectItem>
                <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                <SelectItem value="porsche">Porsche</SelectItem>
                <SelectItem value="ford">Ford</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-30k">$0 - $30,000</SelectItem>
                <SelectItem value="30k-60k">$30,000 - $60,000</SelectItem>
                <SelectItem value="60k-100k">$60,000 - $100,000</SelectItem>
                <SelectItem value="100k+">$100,000+</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">{allCars.length} cars found</p>
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allCars.map((car) => (
            <CarCard key={car.id} {...car} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cars;