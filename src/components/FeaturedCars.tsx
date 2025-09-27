import { useState, useEffect } from "react";
import CarCard from "./CarCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import carsService, { Car } from "@/services/carsService";

const FeaturedCars = () => {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFeaturedCars();
  }, []);

  const loadFeaturedCars = async () => {
    try {
      setLoading(true);
      const cars = await carsService.getFeaturedCars(4);
      setFeaturedCars(cars);
    } catch (err) {
      console.error('Error loading featured cars:', err);
      setError('Failed to load featured cars');
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="py-16 lg:py-24 bg-gray-50 gold-accent-line">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-automotive-dark mb-4 gold-text-gradient">
            Featured Vehicles
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium vehicles from trusted dealers and sellers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-card rounded-lg p-4 shadow-sm border animate-pulse">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))
          ) : error ? (
            <div className="col-span-full text-center text-red-600">
              {error}
            </div>
          ) : (
            featuredCars.map((car) => (
              <CarCard 
                key={car.id} 
                id={car.id.toString()}
                make={car.brand}
                model={car.model}
                variant={car.model}
                year={car.year}
                price={car.price}
                mileage={car.mileage || 0}
                location="Nairobi, Kenya"
                image={car.images && car.images.length > 0 ? car.images[0] : '/images/placeholder-car.jpg'}
                condition={car.carCondition === 'certified' ? 'new' : car.carCondition}
                fuelType="Petrol"
                transmission="Automatic"
                stockType={car.stockType}
                importStatus={car.importStatus}
                currency={car.currency}
                isFavorite={car.isFavorite || false}
                onFavoriteToggle={(productId: number, isFavorite: boolean) => {
                  // Update the car's favorite status in the local state
                  setFeaturedCars(prevCars => 
                    prevCars.map(c => 
                      c.id === productId ? { ...c, isFavorite } : c
                    )
                  );
                }}
              />
            ))
          )}
        </div>

        <div className="text-center">
          <Link to="/cars">
            <Button 
              size="lg" 
              className="bg-automotive-navy hover:bg-automotive-dark text-white px-8 py-3"
            >
              View All Cars
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;