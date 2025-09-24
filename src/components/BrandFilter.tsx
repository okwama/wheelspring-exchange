import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";

const carBrands = [
  { name: "Toyota", logo: "🚗" },
  { name: "BMW", logo: "🚗" },
  { name: "Mercedes", logo: "🚗" },
  { name: "Audi", logo: "🚗" },
  { name: "Honda", logo: "🚗" },
  { name: "Ford", logo: "🚗" },
  { name: "Volkswagen", logo: "🚗" },
  { name: "Nissan", logo: "🚗" },
  { name: "Porsche", logo: "🚗" },
  { name: "Lexus", logo: "🚗" },
  { name: "Hyundai", logo: "🚗" },
  { name: "Mazda", logo: "🚗" },
];

const BrandFilter = () => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Browse by Brand
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find your perfect car from our extensive selection of trusted brands
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {carBrands.map((brand) => (
            <Button
              key={brand.name}
              variant={selectedBrand === brand.name ? "default" : "outline"}
              className="h-20 flex flex-col items-center justify-center space-y-2 hover:scale-105 transition-transform"
              onClick={() => setSelectedBrand(
                selectedBrand === brand.name ? null : brand.name
              )}
            >
              <Car className="h-6 w-6" />
              <span className="text-sm font-medium">{brand.name}</span>
            </Button>
          ))}
        </div>

        {selectedBrand && (
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Showing vehicles for: <span className="font-semibold text-foreground">{selectedBrand}</span>
            </p>
            <Button 
              variant="ghost" 
              onClick={() => setSelectedBrand(null)}
              className="mt-2"
            >
              Clear Filter
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BrandFilter;